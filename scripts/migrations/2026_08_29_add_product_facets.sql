-- =============================================================================
-- Adds the columns the dynamic product-listing + filter system needs.
--
-- Run this against the KAYAPALAT database (the one KAYAPALAT_DB_NAME points
-- at), not the main nterior.in database:
--
--   mysql -u <user> -p <KAYAPALAT_DB_NAME> < scripts/migrations/2026_08_29_add_product_facets.sql
--
-- Safe to run more than once — every ALTER is guarded by an existence check.
-- Nothing here touches existing columns or existing rows; every new column
-- is NULLable, so current products keep working exactly as they do today
-- and simply show up with those filters empty until you fill them in.
-- =============================================================================

-- ---------------------------------------------------------------------------
-- 1. Core filter columns.
--
-- `category` and `product_type` already exist on product_details and are
-- reused as-is. These four are new:
--   brand       e.g. "CenturyPly", "Greenply", "Asian Paints", "Havells"
--   size        e.g. "8 ft x 4 ft", "2 ft x 2 ft", "1 Litre"
--   thickness   e.g. "18mm" — store it exactly as it should appear in the URL
--   grade       e.g. "MR", "BWR", "BWP"
--
-- Leave a column NULL for any category it doesn't apply to (e.g. paints
-- have no "thickness") — the API only shows a filter group when at least
-- one product actually has a value for it.
-- ---------------------------------------------------------------------------

SET @db := DATABASE();

SET @sql := (
  SELECT IF(
    COUNT(*) = 0,
    'ALTER TABLE product_details ADD COLUMN brand VARCHAR(120) NULL AFTER category',
    'SELECT ''brand column already exists'''
  )
  FROM information_schema.COLUMNS
  WHERE TABLE_SCHEMA = @db AND TABLE_NAME = 'product_details' AND COLUMN_NAME = 'brand'
);
PREPARE stmt FROM @sql; EXECUTE stmt; DEALLOCATE PREPARE stmt;

SET @sql := (
  SELECT IF(
    COUNT(*) = 0,
    'ALTER TABLE product_details ADD COLUMN size VARCHAR(60) NULL AFTER brand',
    'SELECT ''size column already exists'''
  )
  FROM information_schema.COLUMNS
  WHERE TABLE_SCHEMA = @db AND TABLE_NAME = 'product_details' AND COLUMN_NAME = 'size'
);
PREPARE stmt FROM @sql; EXECUTE stmt; DEALLOCATE PREPARE stmt;

SET @sql := (
  SELECT IF(
    COUNT(*) = 0,
    'ALTER TABLE product_details ADD COLUMN thickness VARCHAR(30) NULL AFTER size',
    'SELECT ''thickness column already exists'''
  )
  FROM information_schema.COLUMNS
  WHERE TABLE_SCHEMA = @db AND TABLE_NAME = 'product_details' AND COLUMN_NAME = 'thickness'
);
PREPARE stmt FROM @sql; EXECUTE stmt; DEALLOCATE PREPARE stmt;

SET @sql := (
  SELECT IF(
    COUNT(*) = 0,
    'ALTER TABLE product_details ADD COLUMN grade VARCHAR(30) NULL AFTER thickness',
    'SELECT ''grade column already exists'''
  )
  FROM information_schema.COLUMNS
  WHERE TABLE_SCHEMA = @db AND TABLE_NAME = 'product_details' AND COLUMN_NAME = 'grade'
);
PREPARE stmt FROM @sql; EXECUTE stmt; DEALLOCATE PREPARE stmt;

-- ---------------------------------------------------------------------------
-- 2. `attributes` — a JSON catch-all for anything category-specific that
-- doesn't deserve its own column (Finish, Coverage, Voltage, Warranty,
-- Colour, Material, etc). The listing UI renders whatever keys are present
-- as small tags on the product card — nothing about a specific category is
-- ever hardcoded in the frontend, so a brand-new category (e.g. "Kitchen
-- Sinks") works the moment you insert rows for it.
-- ---------------------------------------------------------------------------

SET @sql := (
  SELECT IF(
    COUNT(*) = 0,
    'ALTER TABLE product_details ADD COLUMN attributes JSON NULL AFTER grade',
    'SELECT ''attributes column already exists'''
  )
  FROM information_schema.COLUMNS
  WHERE TABLE_SCHEMA = @db AND TABLE_NAME = 'product_details' AND COLUMN_NAME = 'attributes'
);
PREPARE stmt FROM @sql; EXECUTE stmt; DEALLOCATE PREPARE stmt;

-- ---------------------------------------------------------------------------
-- 3. Indexes — every column the API filters, facets, or sorts on gets one,
-- so filtering/faceting/sorting stays fast whether the table has dozens or
-- tens of thousands of rows.
-- ---------------------------------------------------------------------------

SET @sql := (
  SELECT IF(
    COUNT(*) = 0,
    'CREATE INDEX idx_product_details_brand ON product_details (brand)',
    'SELECT ''idx_product_details_brand already exists'''
  )
  FROM information_schema.STATISTICS
  WHERE TABLE_SCHEMA = @db AND TABLE_NAME = 'product_details' AND INDEX_NAME = 'idx_product_details_brand'
);
PREPARE stmt FROM @sql; EXECUTE stmt; DEALLOCATE PREPARE stmt;

SET @sql := (
  SELECT IF(
    COUNT(*) = 0,
    'CREATE INDEX idx_product_details_size ON product_details (size)',
    'SELECT ''idx_product_details_size already exists'''
  )
  FROM information_schema.STATISTICS
  WHERE TABLE_SCHEMA = @db AND TABLE_NAME = 'product_details' AND INDEX_NAME = 'idx_product_details_size'
);
PREPARE stmt FROM @sql; EXECUTE stmt; DEALLOCATE PREPARE stmt;

SET @sql := (
  SELECT IF(
    COUNT(*) = 0,
    'CREATE INDEX idx_product_details_thickness ON product_details (thickness)',
    'SELECT ''idx_product_details_thickness already exists'''
  )
  FROM information_schema.STATISTICS
  WHERE TABLE_SCHEMA = @db AND TABLE_NAME = 'product_details' AND INDEX_NAME = 'idx_product_details_thickness'
);
PREPARE stmt FROM @sql; EXECUTE stmt; DEALLOCATE PREPARE stmt;

SET @sql := (
  SELECT IF(
    COUNT(*) = 0,
    'CREATE INDEX idx_product_details_grade ON product_details (grade)',
    'SELECT ''idx_product_details_grade already exists'''
  )
  FROM information_schema.STATISTICS
  WHERE TABLE_SCHEMA = @db AND TABLE_NAME = 'product_details' AND INDEX_NAME = 'idx_product_details_grade'
);
PREPARE stmt FROM @sql; EXECUTE stmt; DEALLOCATE PREPARE stmt;

SET @sql := (
  SELECT IF(
    COUNT(*) = 0,
    'CREATE INDEX idx_product_details_category_price ON product_details (category, sell_mrp)',
    'SELECT ''idx_product_details_category_price already exists'''
  )
  FROM information_schema.STATISTICS
  WHERE TABLE_SCHEMA = @db AND TABLE_NAME = 'product_details' AND INDEX_NAME = 'idx_product_details_category_price'
);
PREPARE stmt FROM @sql; EXECUTE stmt; DEALLOCATE PREPARE stmt;

-- ---------------------------------------------------------------------------
-- Done. Existing products keep working immediately (every listing/API route
-- already only ever selects columns it knows about). To make filters show
-- real options, backfill these columns for your existing rows, e.g.:
--
--   UPDATE product_details
--   SET brand = 'CenturyPly', size = '8 ft x 4 ft', thickness = '18mm', grade = 'MR'
--   WHERE product_id = 123;
--
-- or, for anything that doesn't need its own column:
--
--   UPDATE product_details
--   SET attributes = JSON_OBJECT('Core', 'Hardwood', 'Warranty', '5 years')
--   WHERE product_id = 123;
-- ---------------------------------------------------------------------------

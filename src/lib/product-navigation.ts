/**
 * The full product category taxonomy — groups, their columns, and each
 * column's leaf items — extracted verbatim from the mega menu in
 * `src/app/products/components/Navbar.tsx` so there is exactly one source
 * of truth for it. Navbar.tsx imports this instead of defining its own
 * copy; anything else that needs to know the real category hierarchy
 * (breadcrumbs, the subcategory switcher, etc.) should import from here
 * too, rather than re-typing category names by hand.
 *
 * If you edit the menu structure, edit it here — Navbar.tsx picks up the
 * change automatically.
 */

export type NavCategoryColumn = {
    title: string;
    items: string[];
};

export type NavCategoryGroup = {
    name: string;
    columns: NavCategoryColumn[];
};

/* =========================================================
   CATEGORY DATA
========================================================= */

export const NAV_CATEGORIES: NavCategoryGroup[] = [
    {
        name: "Tiles",
        columns: [
            {
                title: "Vitrified Tiles",
                items: [
                    "Vitrified Floor Tile",
                    "Parking Tile",
                    "Elevation Tile",
                ],
            },
            {
                title: "Ceramic Tiles",
                items: [
                    "Ceramic Wall Tile",
                    "Ceramic Floor Tile",
                    "Ceramic Parking Tile",
                    "Ceramic Elevation Tile",
                ],
            },
            {
                title: "Laminate Flooring",
                items: ["Laminate Flooring"],
            },
        ],
    },

    {
        name: "Electricals",
        columns: [
            {
                title: "Wires & Cables",
                items: [
                    "Low Tension Wire",
                    "Coaxial TV Cable",
                    "CCTV Cable",
                ],
            },
            {
                title: "Switches & Sockets",
                items: [
                    "Fan Regulator",
                    "Switch Board Plate",
                    "Lamp Holder",
                    "Electrical Socket",
                    "Communication Socket",
                    "Blank Plate Cover",
                    "Switch",
                    "Combined Box",
                    "Modular Surface Box",
                    "Celiling Rose",
                    "Plug Top",
                    "LED Indicator",
                ],
            },
            {
                title: "Batteries & Torch",
                items: [
                    "Battery",
                    "Torch",
                ],
            },
            {
                title: "Circuit Breakers",
                items: [
                    "MCB",
                    "RCCB",
                    "ACCL",
                    "Isolator",
                ],
            },
            {
                title: "Distributin Boards",
                items: [
                    "Distribution Board",
                ],
            },
            {
                title: "Conduit, Boxes & Fitting",
                items: [
                    "Conduit Fitting",
                    "Conduit Pipe",
                    "Conduit Solvent Cement",
                    "Celeng Fan Box",
                    "Concealed Box",
                ],
            },
            {
                title: "Electrical Tools & Accessories",
                items: [
                    "Accessory",
                    "Door Bell",
                    "Multi Plug Adaptor",
                    "Spike Guard",
                ],
            },
            {
                title: "Power Generation & Transformers",
                items: [
                    "Inverter Battery",
                    "Inverter",
                    "Stabilizer",
                    "Inverter Trolly",
                ],
            },
            {
                title: "Water Heaters & Geysers",
                items: [
                    "Instant Geyser",
                    "Storage Geyser",
                    "Spare Parts",
                ],
            },
        ],
    },

    {
        name: "Power & Hand Tools",
        columns: [
            {
                title: "Power Tools",
                items: [
                    "Angle Grinder",
                    "Impact Drill",
                    "Rotary Drill",
                    "Hammer Drill",
                    "Power Tool Kit",
                    "Tile Cutter",
                    "Chop Saw",
                    "Circular Saw",
                    "Sander",
                    "Jig Saw",
                    "Router",
                    "Planner",
                    "Trimmer",
                    "Heat Gun",
                    "Air Blower",
                    "Vacuum Cleaner",
                    "Power Pressure Washer",
                    "Drill Driver",
                    "Electric Screwdriver",
                    "Glue Gun",
                    "Electric Mixer",
                    "Polisher",
                    "Demolition Hammer",
                    "Mitre Saw",
                    "Welding Machine",
                    "Chain Saw",
                    "Tyre Inflator",
                ],
            },
            {
                title: "Hand Tools",
                items: [
                    "Spanners & Wrench",
                    "Pliers & Pincer",
                    "Screwdriver",
                    "Hand Tool Set",
                    "Hammer",
                    "Socket & Socket Set",
                    "Measuring & Layout Tool",
                    "Chisel",
                    "Cutting Tool",
                    "Hand Saw",
                    "Clamps & Vice",
                    "Allen Key",
                    "Tools Storage & Organizers",
                    "Hand Plane",
                    "MultiTools & Accessory",
                    "Scissor",
                    "Soldering Equipement",
                    "Microfiber Cloth",
                    "Electrical Test Meter",
                ],
            },
            {
                title: "Power Tools Accessories",
                items: [
                    "Drill Bit",
                    "Saw Blade",
                    "Cutting Disc",
                    "Grinding Disc",
                    "Coated Abrasive",
                    "Flap Disc",
                    "Router Bit Set",
                    "Planer Blade",
                    "Glue Stick",
                    "Welding Accessory",
                ],
            },
            {
                title: "Garden Tools",
                items: [
                    "Hand Pruner",
                    "Sprayer",
                    "Hedge Shear",
                    "Hand Trowel",
                    "Garden Glove",
                    "Loppers",
                    "Watering Hoses & Accessory",
                    "Hoe",
                    "Watering Can",
                    "Cultivating Tool",
                    "Weeder",
                    "Sprinkler",
                    "Flower pots & planters",
                    "Fertilizers & pesticides",
                    "Artificial Plants",
                ],
            },
            {
                title: "Safety Equipment",
                items: [
                    "Head Protection",
                    "Protective Eyewear",
                    "Safety Vest",
                    "Safety Shoe",
                    "Glove",
                ],
            },
            {
                title: "Household Cleaning",
                items: [
                    "Cleaning Tools",
                    "Cleaner",
                    "Polish",
                    "Dustbins",
                ],
            },
            {
                title: "Ladders & Laundry",
                items: [
                    "Step Laundry",
                    "Cloth Dryers",
                    "Ironing Boards",
                ],
            },
            {
                title: "Kitchenware",
                items: [
                    "Pressure Cookers",
                    "Patila and Pans",
                    "Kadhai",
                    "Mixing Bowl",
                    "Basket",
                    "Container",
                    "Jar",
                    "Bottle",
                    "Lunch Box",
                    "Casserole",
                    "Floor Mats",
                    "Kitchen Tools",
                ],
            },
        ],
    },

    {
        name: "Plywood & Laminates",
        columns: [
            {
                title: "Plywood & Blockboard",
                items: [
                    "Plywood",
                    "Blockboards",
                ],
            },
            {
                title: "Engineered Board",
                items: [
                    "MDF Board",
                    "HDHMR HDF Board",
                ],
            },
            {
                title: "Laminates",
                items: [
                    "Liner Laminates",
                    "Decorative Laminates",
                    "Acrylic Laminates",
                ],
            },
            {
                title: "Adhesives",
                items: [
                    "All Purpose Glue",
                    "Woodwork Adhesives",
                ],
            },
        ],
    },

    {
        name: "Hardware",
        columns: [
            {
                title: "Cabinet Hardware",
                items: [
                    "Drawer Channel",
                    "Cabinet Handle",
                    "Drawer Lock",
                    "Cabinet Knob",
                ],
            },
            {
                title: "Door Hardware",
                items: [
                    "Door Lock",
                    "Door Hinge",
                    "Tower Bolt",
                    "Door Closer",
                    "Cylindrical Lock",
                    "Door Handle",
                    "Door Accessory",
                    "Knobs & Tubular Lock",
                    "Door Stopper",
                    "Door Aldrop/Latch",
                ],
            },
            {
                title: "Kitchen Hardware",
                items: [
                    "Kitchen Accessory",
                ],
            },
            {
                title: "Glass Fittings & Hardware",
                items: [
                    "Glass Accessory",
                ],
            },
            {
                title: "Other Hardware",
                items: [
                    "Basket",
                    "Gate Hook",
                    "Magnetic Catcher",
                    "Modular Accessory",
                ],
            },
            {
                title: "Curtain Hardware",
                items: [
                    "Curtain Finial",
                ],
            },
            {
                title: "Safes",
                items: [
                    "Digital Safe",
                    "Keyed Safe Box",
                ],
            },
        ],
    },

    {
        name: "Paints",
        columns: [
            {
                title: "Interior Paints",
                items: [
                    "Interior Distemper - Color",
                    "Interior Emulsion - Color",
                    "Interior Emulsion - Base",
                ],
            },
            {
                title: "Exterior Paints",
                items: [
                    "Exterior Emulsion - Color",
                    "Exterior Emulsion - Base",
                ],
            },
            {
                title: "Metal Paints",
                items: [
                    "Enamel - Color",
                    "Enamel - Base",
                ],
            },
            {
                title: "Sealants",
                items: [
                    "Interior Sealant",
                ],
            },
            {
                title: "Undercoats",
                items: [
                    "Putty",
                    "White Cement",
                    "Filler",
                    "Wall Primer",
                    "Metal Primer",
                    "Wood Primer",
                ],
            },
            {
                title: "Waterproofing",
                items: [
                    "General Purpose",
                    "Waterproofing",
                    "Wall Waterproofing",
                    "Roof Waterproofing",
                    "Floor Waterproofing",
                ],
            },
            {
                title: "Wood Coatings",
                items: [
                    "Varnish",
                    "Melamine Coating",
                    "Polyurethane (PU) Coating",
                ],
            },
            {
                title: "Other Paints",
                items: [
                    "Spray Paint",
                ],
            },
            {
                title: "Colorants",
                items: [
                    "Universal Stainer",
                ],
            },
            {
                title: "Applicators",
                items: [
                    "Roller",
                    "Brush",
                ],
            },
            {
                title: "Paint Tools",
                items: [
                    "Knife",
                    "Extension Pole",
                    "Other Tools",
                ],
            },
            {
                title: "Tapes",
                items: [
                    "Masking Tape",
                ],
            },
        ],
    },

    {
        name: "Lighting & Fans",
        columns: [
            {
                title: "Light Bulbs",
                items: [
                    "LED Bulb",
                    "LED Batten",
                    "LED Night Bulb",
                ],
            },
            {
                title: "Ceiling Lights",
                items: [
                    "LED Panel Light",
                    "LED Downlighter",
                    "LED Spotlight",
                    "LED COB Light",
                ],
            },
            {
                title: "Fan",
                items: [
                    "Pedestal Fan",
                    "Table Fan",
                    "Wall Fan",
                    "Exhaust Fan",
                    "Ceiling Fan",
                ],
            },
            {
                title: "Outdoor Lighting",
                items: [
                    "LED Flood Light",
                    "LED Street Light",
                    "Wall Light",
                ],
            },
            {
                title: "Decorative Lights",
                items: [
                    "LED Strip Light",
                    "LED Rope Light",
                    "Pendant Light",
                    "Wall Light",
                    "LED Scale Light",
                ],
            },
            {
                title: "Lighting Accessories",
                items: [
                    "LED Strip Light Driver",
                ],
            },
        ],
    },

    {
        name: "Bathroom",
        columns: [
            {
                title: "Bath Faucets",
                items: [
                    "Wall Mixer",
                    "Diverter",
                    "Bath Spout",
                    "Bib Tap",
                    "Shower Head",
                    "Shower Arm",
                    "Hand Held Shower",
                    "Angle Valve",
                ],
            },
            {
                title: "Tiles Tools & Accessories",
                items: [
                    "Tile Adhesive",
                    "Tile Grout",
                    "Tile Tools",
                    "Tile Clean & Care",
                ],
            },
            {
                title: "Toilets",
                items: [
                    "One Piece Toilet",
                    "Two Piece Toilet",
                    "Toilet Seat Cover",
                    "Indian Toilet (IWC)",
                    "Flush Tank",
                    "Flush Plate",
                    "Health Faucet",
                    "Urinal Push Cock",
                ],
            },
            {
                title: "Wash Basins",
                items: [
                    "Wall hung Basin",
                    "Table Top Basin",
                    "Pesestal Basin",
                    "Pedestal",
                ],
            },
            {
                title: "Bath Accessories",
                items: [
                    "Storage Shelf",
                    "Towel Rail",
                    "Soap Holder",
                    "Soap Dispenser",
                    "Towel Ring",
                    "Toilet Paper Holder",
                    "Tumbler Holder",
                    "Bottle Trap",
                    "Waste Coupling",
                    "Floor Drain",
                    "Towel Rack",
                    "Wall Bracket",
                    "Hose Pipe",
                    "Robe Hook",
                    "Grab Bar",
                ],
            },
            {
                title: "Bath Mirrors",
                items: [
                    "Bath Mirror",
                ],
            },
            {
                title: "Bath Cabinets",
                items: [
                    "Medicine Cabinet",
                ],
            },
            {
                title: "Spares & Fittings",
                items: [
                    "Nozzel",
                    "Aerator",
                    "Cartridge",
                    "Flange",
                    "Ball Cock",
                ],
            },
            {
                title: "Basin Faucets",
                items: [
                    "Pillar Tap",
                    "Deck Mixer",
                ],
            },
        ],
    },

    {
        name: "Sofa and Dining",
        columns: [
            {
                title: "Living Room",
                items: [
                    "Sofas",
                    "Lounge Chairs",
                    "Coffee Tables",
                ],
            },
            {
                title: "Dining",
                items: [
                    "Dining Tables",
                    "Dining Chairs",
                    "Dining Sets",
                ],
            },
            {
                title: "Furniture",
                items: [
                    "Accent Chairs",
                    "Side Tables",
                    "Benches",
                ],
            },
        ],
    },

    {
        name: "Plumbing",
        columns: [
            {
                title: "Fittings",
                items: [
                    "Water Pipe Fitting",
                    "SWR Fitting",
                    "Agriculture Fitting",
                ],
            },
            {
                title: "Pumps",
                items: [
                    "Openwell Submersible Pump",
                    "Centrifugal Pump",
                    "Booster Pump",
                    "Pump Accessory",
                ],
            },
            {
                title: "Tanks",
                items: [
                    "Overhead Tank",
                    "Tank Accessory",
                ],
            },
            {
                title: "Tapes, Adhesives and Cleaners",
                items: [
                    "Solvent cement",
                    "Rust remover",
                    "Sealant",
                    "Drain cleaner",
                    "Tape",
                ],
            },
            {
                title: "Accessories",
                items: [
                    "Waste pipe",
                    "Connection pipe",
                    "Nipple",
                    "Flange",
                    "Rainwater Filter",
                    "Water Meter",
                    "Fastening & Clamp",
                    "Washing Machine Inlet Pipe",
                ],
            },
        ],
    },

    {
        name: "Kitchen",
        columns: [
            {
                title: "Kitchen Faucets",
                items: [
                    "Sink Tap",
                    "Deck Mixer",
                    "Wall Mixer",
                ],
            },
            {
                title: "Kitchen Sinks",
                items: [
                    "Single Bowl Sink",
                ],
            },
        ],
    },

    {
        name: "Appliances",
        columns: [
            {
                title: "Small Domestic Appliances",
                items: [
                    "Toaster",
                    "Sandwich Maker",
                    "Coffee Maker",
                    "Hand Blender",
                    "Mixer Grinder",
                    "Wet Grinder",
                    "Electric Kettle",
                    "Chopper",
                    "Air Fryer",
                    "Air Cooler",
                    "Rice Cooker",
                    "OTG (Oven Toaster Griller)",
                    "Iron Box",
                    "Personal Care",
                ],
            },
            {
                title: "Hobs & Chimney",
                items: [
                    "Chimney",
                    "Hob",
                    "Induction Cooktop",
                    "Gas Stove",
                ],
            },
            {
                title: "Large Domestic Appliances",
                items: [
                    "Air Conditioner",
                ],
            },
            {
                title: "Water Treatment",
                items: [
                    "RO Water Filter",
                ],
            },
        ],
    },
];

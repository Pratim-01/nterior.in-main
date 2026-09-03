import ProductListing from "../../../listing/ProductListing";
import { getColumnCategories, getFolderBreadcrumb } from "@/lib/category-taxonomy";

export default function BlockboardsPage() {
  return (
    <ProductListing
      category="Blockboards"
      title="Buy High-Quality Blockboards"
      description="Explore reliable blockboards for furniture, doors and interior construction."
      breadcrumb={getFolderBreadcrumb("plywood-blockboards")}
      categoryOptions={getColumnCategories("plywood-blockboards", "Blockboards")}
    />
  );
}
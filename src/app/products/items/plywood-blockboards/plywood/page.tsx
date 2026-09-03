import ProductListing from "../../../listing/ProductListing";
import { getColumnCategories, getFolderBreadcrumb } from "@/lib/category-taxonomy";

export default function PlywoodPage() {
  return (
    <ProductListing
      category="Plywood"
      title="Buy High-Quality Plywood"
      description="Explore durable plywood for furniture, kitchens, wardrobes and modern interior projects."
      breadcrumb={getFolderBreadcrumb("plywood-blockboards")}
      categoryOptions={getColumnCategories("plywood-blockboards", "Plywood")}
    />
  );
}
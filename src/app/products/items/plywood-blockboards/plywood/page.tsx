import ProductListing from "../../../listing/ProductListing";
import { getFolderBreadcrumb } from "@/lib/category-taxonomy";

export default function PlywoodPage() {
  return (
    <ProductListing
      category="Plywood"
      title="Buy High-Quality Plywood"
      description="Explore durable plywood for furniture, kitchens, wardrobes and modern interior projects."
      breadcrumb={getFolderBreadcrumb("plywood-blockboards")}
    />
  );
}
import Hero from "./components/Hero";
import TopCategories from "./components/TopCategories";
import ProductListing from "../../listing/ProductListing";
import { getColumnCategories, getFolderBreadcrumb } from "@/lib/category-taxonomy";

export default function PlywoodLaminatesPage() {
  return (
    <main className="min-h-screen bg-white">
      <Hero />
      <TopCategories />
      <ProductListing
        category="Plywood Laminates"
        breadcrumb={getFolderBreadcrumb("plywood-laminates")}
        categoryOptions={getColumnCategories("plywood-laminates", "Plywood Laminates")}
      />
    </main>
  );
}

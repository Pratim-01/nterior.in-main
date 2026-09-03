import Hero from "./components/Hero";
import TopCategories from "./components/TopCategories";
import ProductListing from "../../listing/ProductListing";
import { getColumnCategories, getFolderBreadcrumb } from "@/lib/category-taxonomy";

export default function SofaDiningPage() {
  return (
    <main className="min-h-screen bg-white">
      <Hero />
      <TopCategories />
      <ProductListing
        category="Sofa Dining"
        breadcrumb={getFolderBreadcrumb("sofa-dining")}
        categoryOptions={getColumnCategories("sofa-dining", "Sofa Dining")}
      />
    </main>
  );
}

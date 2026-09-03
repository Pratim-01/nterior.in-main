import Hero from "./components/Hero";
import TopCategories from "./components/TopCategories";
import ProductListing from "../../listing/ProductListing";
import { getColumnCategories, getFolderBreadcrumb } from "@/lib/category-taxonomy";

export default function HardwarePage() {
  return (
    <main className="min-h-screen bg-white">
      <Hero />
      <TopCategories />
      <ProductListing
        category="Hardware"
        breadcrumb={getFolderBreadcrumb("hardware")}
        categoryOptions={getColumnCategories("hardware", "Hardware")}
      />
    </main>
  );
}

import Hero from "./components/Hero";
import TopCategories from "./components/TopCategories";
import EbcoShowcase from "./components/EbcoShowcase";
import ProductListing from "../../listing/ProductListing";
import { getColumnCategories, getFolderBreadcrumb } from "@/lib/category-taxonomy";

export default function HardwarePage() {
  return (
    <main className="min-h-screen bg-white">
      <Hero />
      <TopCategories />
      <EbcoShowcase />
      <ProductListing
        category="Hardware"
        breadcrumb={getFolderBreadcrumb("hardware")}
        categoryOptions={getColumnCategories("hardware", "Hardware")}
      />
    </main>
  );
}

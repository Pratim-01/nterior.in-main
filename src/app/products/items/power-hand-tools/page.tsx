import Hero from "./components/Hero";
import TopCategories from "./components/TopCategories";
import ProductListing from "../../listing/ProductListing";
import { getFolderBreadcrumb } from "@/lib/category-taxonomy";

export default function PowerHandToolsPage() {
  return (
    <main className="min-h-screen bg-white">
      <Hero />
      <TopCategories />
      <ProductListing
        category="Power Hand Tools"
        breadcrumb={getFolderBreadcrumb("power-hand-tools")}
      />
    </main>
  );
}

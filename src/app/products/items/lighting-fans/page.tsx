import Hero from "./components/Hero";
import TopCategories from "./components/TopCategories";
// import ProductListing from "../../listing/ProductListing";
import { getColumnCategories, getFolderBreadcrumb } from "@/lib/category-taxonomy";

export default function LightingFansPage() {
  return (
    <main className="min-h-screen bg-white">
      <Hero />
      <TopCategories />
      {/* <ProductListing
        category="Lighting Fans"
        breadcrumb={getFolderBreadcrumb("lighting-fans")}
        categoryOptions={getColumnCategories("lighting-fans", "Lighting Fans")}
      /> */}
    </main>
  );
}

import Hero from "./components/Hero";
import TopCategories from "./components/TopCategories";
// import ProductListing from "../../listing/ProductListing";
import { getColumnCategories, getFolderBreadcrumb } from "@/lib/category-taxonomy";

export default function ElectricalsPage() {
  return (
    <main className="min-h-screen bg-white">
      <Hero />
      <TopCategories />
      {/* <ProductListing
        category="Electricals"
        breadcrumb={getFolderBreadcrumb("electricals")}
        categoryOptions={getColumnCategories("electricals", "Electricals")}
      /> */}
    </main>
  );
}

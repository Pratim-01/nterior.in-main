import Hero from "./components/Hero";
import TopCategories from "./components/TopCategories";
// import ProductListing from "../../listing/ProductListing";
import { getColumnCategories, getFolderBreadcrumb } from "@/lib/category-taxonomy";

export default function BathroomPage() {
  return (
    <main className="min-h-screen bg-white">
      <Hero />
      <TopCategories />
      {/* <ProductListing
        category="Bathroom"
        breadcrumb={getFolderBreadcrumb("bathroom")}
        categoryOptions={getColumnCategories("bathroom", "Bathroom")}
      /> */}
    </main>
  );
}

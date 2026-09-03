import Hero from "./components/Hero";
import TopCategories from "./components/TopCategories";
import ProductListing from "../../listing/ProductListing";
import { getColumnCategories, getFolderBreadcrumb } from "@/lib/category-taxonomy";

export default function TilesPage() {
  return (
    <main className="min-h-screen bg-white">
      <Hero />
      <TopCategories />
      <ProductListing
        category="Tiles"
        breadcrumb={getFolderBreadcrumb("tiles")}
        categoryOptions={getColumnCategories("tiles", "Tiles")}
      />
    </main>
  );
}

import Hero from "./components/Hero";
import TopCategories from "./components/TopCategories";
import ProductListing from "../../listing/ProductListing";
import { getColumnCategories, getFolderBreadcrumb } from "@/lib/category-taxonomy";

export default function KitchenPage() {
  return (
    <main className="min-h-screen bg-white">
      <Hero />
      <TopCategories />
      <ProductListing
        category="Kitchen"
        breadcrumb={getFolderBreadcrumb("kitchen")}
        categoryOptions={getColumnCategories("kitchen", "Kitchen")}
      />
    </main>
  );
}

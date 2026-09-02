import Hero from "./components/Hero";
import TopCategories from "./components/TopCategories";
import ProductListing from "../../listing/ProductListing";
import { getFolderBreadcrumb } from "@/lib/category-taxonomy";

export default function PaintsPage() {
  return (
    <main className="min-h-screen bg-white">
      <Hero />
      <TopCategories />
      <ProductListing
        category="Paints"
        breadcrumb={getFolderBreadcrumb("paints")}
      />
    </main>
  );
}

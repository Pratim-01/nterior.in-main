import Hero from "./components/Hero";
import TopCategories from "./components/TopCategories";
import ProductListing from "../../listing/ProductListing";

export default function SofaDiningPage() {
  return (
    <main className="min-h-screen bg-white">
      <Hero />
      <TopCategories />
      <ProductListing category="Sofa Dining" />
    </main>
  );
}

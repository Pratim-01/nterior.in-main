import Hero from "./components/Hero";
import TopCategories from "./components/TopCategories";
import ProductListing from "../../listing/ProductListing";

export default function PlumbingPage() {
  return (
    <main className="min-h-screen bg-white">
      <Hero />
      <TopCategories />
      <ProductListing category="Plumbing" />
    </main>
  );
}

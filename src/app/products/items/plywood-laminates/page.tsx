import Hero from "./components/Hero";
import TopCategories from "./components/TopCategories";
import FeaturedProducts from "./components/FeaturedProducts";

export default function PlywoodLaminatesPage() {
  return (
    <main className="min-h-screen bg-white">
      <Hero />
      <TopCategories />
      <FeaturedProducts />
    </main>
  );
}
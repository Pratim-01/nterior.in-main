import Hero from "./components/Hero";
import TopCategories from "./components/TopCategories";
import FeaturedProducts from "./components/FeaturedProducts";

export default function PlywoodLaminatesPage() {
  return (
    <main className="min-h-screen bg-white">
      <Hero />
      <TopCategories />

      <FeaturedProducts
        category="Plywood"
        title="Explore Our Range of Plywood"
        viewAllHref="/products/items/plywood-laminates/plywood"
        sectionClassName="bg-[#FFF5F5]"
      />

      <FeaturedProducts
        category="Laminates"
        title="Explore Our Range of Laminates"
        viewAllHref="/products/items/plywood-laminates/laminates"
        sectionClassName="bg-white"
      />
    </main>
  );
}

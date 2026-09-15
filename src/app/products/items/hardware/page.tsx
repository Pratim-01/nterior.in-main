import Hero from "./components/Hero";
import TopCategories from "./components/TopCategories";
import EbcoShowcase from "./components/EbcoShowcase";
import FeaturedProducts from "./components/FeaturedProducts";
// import ProductListing from "../../listing/ProductListing";
import { getColumnCategories, getFolderBreadcrumb } from "@/lib/category-taxonomy";

export default function HardwarePage() {
  return (
    <main className="min-h-screen bg-white">
      <Hero />
      <TopCategories />
      <EbcoShowcase />

      <FeaturedProducts
        category="Furniture Locks"
        title="Explore Our Range of Furniture Locks"
        viewAllHref="/products/items/hardware/furniture-locks"
        sectionClassName="bg-white"
      />

      <FeaturedProducts
        category="Retail Display System"
        title="Explore Our Range of Retail Display Systems"
        viewAllHref="/products/items/hardware/retail-display-system"
        sectionClassName="bg-[#FFF5F5]"
      />

      {/* <div id="all-hardware">
        <ProductListing
          category="Hardware"
          breadcrumb={getFolderBreadcrumb("hardware")}
          categoryOptions={getColumnCategories("hardware", "Hardware")}
        />
      </div> */}
    </main>
  );
}

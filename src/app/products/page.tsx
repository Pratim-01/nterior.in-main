// import Navbar from "./components/Navbar";
// import Hero from "./components/Hero";
// // import ExpressDelivery from "./components/ExpressDelivery";
// import Categories from "./components/BuildingMaterials";
// import EditorsPicks from "./components/Tiles";
// import PlywoodLaminates from "./components/PlywoodLaminates";
// import Paints from "./components/Paints";
// import TopBrands from "./components/TopBrands";
// import NewArrivals from "./components/NewArrivals";
// import Stores from "./components/Stores";
// import WhyShopWithUs from "./components/WhyShopWithUs";
// import ContactUs from "./components/ContactUs";
// import NoProductsFound from "./components/NoProductsFound";
// import FeaturedCollections from "./components/FeaturedCollections";
// import WhyChooseUs from "./components/WhyChooseUs";
// import InteriorServices from "./components/InteriorServices";
// import FeaturedProducts from "./components/FeaturedProducts";
// import Testimonials from "./components/Testimonials";
// import BrandLogos from "./components/BrandLogos";
// import CTA from "./components/CTA";
// import Footer from "./components/Footer";
// export default function ProductsPage() {
//   return (
//     <main className="bg-white overflow-x-hidden">
//       <Navbar />
//       <Hero />
//       {/* <ExpressDelivery /> */}
//       <Categories />
//       <EditorsPicks />
//       {/* <PlywoodLaminates /> */}
//       {/* <Paints /> */}
//       <TopBrands />
//       <NewArrivals />
//       <Stores />
//       <ContactUs />
//       <WhyShopWithUs />
//       {/* <FeaturedCollections /> */}
//       {/* <WhyChooseUs /> */}
//       {/* <InteriorServices /> */}
//       {/* <FeaturedProducts /> */}
//       {/* <Testimonials /> */}
//       {/* <BrandLogos /> */}
//       {/* <CTA /> */}
//       {/* <Footer /> */}
//     </main>
//   );
// }





import Hero from "./components/Hero";
import Categories from "./components/BuildingMaterials";
import EditorsPicks from "./components/Tiles";
import TopBrands from "./components/TopBrands";
import NewArrivals from "./components/NewArrivals";
import Stores from "./components/Stores";
import WhyShopWithUs from "./components/WhyShopWithUs";
import ContactUs from "./components/ContactUs";
import NoProductsFound from "./components/NoProductsFound";

type ProductsPageProps = {
  searchParams: Promise<{
    category?: string;
  }>;
};

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const params = await searchParams;

  const category = params.category;

  /*
   * Every real navbar leaf item (e.g. "Plywood", "LED Bulb", "Overhead
   * Tank") now links straight to its own `/products/items/<folder>/...`
   * listing page — see getLeafItemHref in lib/category-taxonomy.ts — which
   * has its own heading, sort, filters, and empty state. This
   * `/products?category=<name>` route only gets hit for a stray/unknown
   * category name that isn't in the navbar taxonomy at all, so it just
   * shows a plain "not found" message — no heading, sort, or filters to
   * show for a category that doesn't really exist.
   *
   * Navbar and the 108px top spacing are already
   * handled by products/layout.tsx.
   */
  if (category) {
    return (
      <main className="min-h-screen overflow-x-hidden bg-white">
        <NoProductsFound category={category} />
      </main>
    );
  }

  return (
    <main className="overflow-x-hidden bg-white">
      <Hero />

      <Categories />

      <EditorsPicks />

      <TopBrands />

      <NewArrivals />

      <Stores />

      <ContactUs />

      <WhyShopWithUs />

    </main>
  );
}
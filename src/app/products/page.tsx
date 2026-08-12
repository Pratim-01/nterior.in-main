import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
// import ExpressDelivery from "./components/ExpressDelivery";
import Categories from "./components/BuildingMaterials";
import EditorsPicks from "./components/Tiles";
import PlywoodLaminates from "./components/PlywoodLaminates";
import Paints from "./components/Paints";
import TopBrands from "./components/TopBrands";
import NewArrivals from "./components/NewArrivals";
import Stores from "./components/Stores";
import WhyShopWithUs from "./components/WhyShopWithUs";
import FeaturedCollections from "./components/FeaturedCollections";
import WhyChooseUs from "./components/WhyChooseUs";
import InteriorServices from "./components/InteriorServices";
import FeaturedProducts from "./components/FeaturedProducts";
import Testimonials from "./components/Testimonials";
import BrandLogos from "./components/BrandLogos";
import CTA from "./components/CTA";
import Footer from "./components/Footer";
export default function ProductsPage() {
  return (
    <main className="bg-white overflow-x-hidden">
      <Navbar />
      <Hero />
      {/* <ExpressDelivery /> */}
      <Categories />
      <EditorsPicks />
      {/* <PlywoodLaminates /> */}
      {/* <Paints /> */}
      <TopBrands />
      <NewArrivals />
      <Stores />
      <WhyShopWithUs />
      {/* <FeaturedCollections /> */}
      {/* <WhyChooseUs /> */}
      {/* <InteriorServices /> */}
      {/* <FeaturedProducts /> */}
      {/* <Testimonials /> */}
      {/* <BrandLogos /> */}
      {/* <CTA /> */}
      {/* <Footer /> */}
    </main>
  );
}
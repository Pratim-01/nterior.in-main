import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Categories from "./components/Categories";
import EditorsPicks from "./components/EditorsPicks";
import TopBrands from "./components/TopBrands";
import NewArrivals from "./components/NewArrivals";
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
      <Categories />
      <EditorsPicks />
      <TopBrands />
      <NewArrivals />
      <FeaturedCollections />
      <WhyChooseUs />
      <InteriorServices />
      <FeaturedProducts />
      <Testimonials />
      <BrandLogos />
      <CTA />
      <Footer />
    </main>
  );
}
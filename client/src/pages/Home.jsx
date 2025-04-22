import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import FeaturesSection from "../components/FeatureSection";

export default function Home() {
  return (
    <div className="max-w-[1240px] mx-auto" >
      <Header />
      <HeroSection />
      <FeaturesSection />
    </div>
  );
}

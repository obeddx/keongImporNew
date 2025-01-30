import HeroSection from "@/components/HeroSection";
// import FeaturesSection from "@/components/FeaturesSection";
import TestimonialSlider from "@/components/TestimonialSlider"; // Import TestimonialSlider
import KeunggulanSection from "@/components/KeunggulanSection";

// import TestimonialsSection from "@/components/TestimonialsSection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      {/* <FeaturesSection /> */}
      <KeunggulanSection/>
      <TestimonialSlider />
      {/* <TestimonialsSection /> */}
    </main>
  );
}

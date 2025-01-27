import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import TestimonialSlider from "@/components/TestimonialSlider"; // Import TestimonialSlider

// import TestimonialsSection from "@/components/TestimonialsSection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <FeaturesSection />
      <TestimonialSlider />
      {/* <TestimonialsSection /> */}
    </main>
  );
}

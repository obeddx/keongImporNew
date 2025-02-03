import HeroSection from "@/components/HeroSection";
import KeunggulanSection from "@/components/KeunggulanSection";
import TestimonialSlider from "@/components/TestimonialSlider";


export default function Home() {
  return (
    <main className="overflow-hidden">
      <HeroSection />
      <KeunggulanSection />
      <TestimonialSlider />
    </main>
  );
}

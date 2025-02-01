import HeroSection from "@/components/HeroSection";
import KeunggulanSection from "@/components/KeunggulanSection";
import TestimonialSlider from "@/components/TestimonialSlider";

// import { useEffect } from 'react';
// import '../styles/globals.css';

export default function Home() {
  return (
    <main className="overflow-hidden">
      <HeroSection />
      <KeunggulanSection />
      <TestimonialSlider />
    </main>
  );
}

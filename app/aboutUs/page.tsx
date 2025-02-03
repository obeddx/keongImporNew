"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import { motion } from "framer-motion";
import { client } from "../lib/sanityClient"; 
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import KeunggulanSection from "@/components/KeunggulanSection";
import { useTheme } from '@/components/ThemeContext';

type AboutData = {
  history: { children: { text: string }[] }[];
  visionMission: { visi: { children: { text: string }[] }[]; misi: { children: { text: string }[] }[] };
  advantages: string[];
  images: { alt: string; url: string }[];
};

const AboutUsPage: React.FC = () => {
  const [aboutData, setAboutData] = useState<AboutData | null>(null);
  const { isDarkMode, toggleTheme } = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: AboutData = await client.fetch(`
          *[_type == "aboutUs"][0]{
            history,
            visionMission{
              visi,
              misi
            },
            advantages,
            images[]{alt, "url": asset->url}
          }
        `);
        setAboutData(data);
      } catch (error) {
        console.error("Error fetching About Us data:", error);
      }
    };
    fetchData();
  }, []);

  if (!aboutData) {
    return (
      <div className="text-center py-20">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className={`py-20 relative overflow-hidden ${isDarkMode ? "bg-gray-900 text-white" : "bg-white text-black"}`}>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold py-5 mt-16 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
          About Us
        </h1>
        <p className={`mt-4 text-lg ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
          Learn more about PT. KEONG SUMBER MAKMUR
        </p>
      </motion.div>

      <div className="max-w-6xl mx-auto px-4">
        <section className="mb-16">
          <h2 className={`text-3xl font-semibold mb-4 ${isDarkMode ? "text-green-400" : "text-green-600"}`}>Sejarah Perusahaan</h2>
          {aboutData.history?.map((block, index) => (
            <p key={index} className={`leading-relaxed text-justify mb-4 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
              {block.children?.map((child) => child.text).join(" ")}
            </p>
          ))}
        </section>

        <section className={`mb-16 p-6 rounded-lg shadow-lg ${isDarkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-black"}`}>
          <h2 className={`text-3xl font-semibold mb-4 ${isDarkMode ? "text-blue-400" : "text-blue-600"}`}>Visi dan Misi</h2>
          <div>
            <h3 className={`text-2xl font-semibold mb-2 ${isDarkMode ? "text-green-400" : "text-green-700"}`}>Visi</h3>
            {aboutData.visionMission?.visi?.map((block, index) => (
              <p key={index} className={`leading-relaxed text-justify mb-4 ${isDarkMode ? "text-gray-300" : "text-gray-800"}`}>
                {block.children?.map((child) => child.text).join(" ")}
              </p>
            ))}

            <h3 className={`text-2xl font-semibold mb-2 ${isDarkMode ? "text-blue-400" : "text-blue-700"}`}>Misi</h3>
            <ul className={`list-disc list-inside space-y-2 ${isDarkMode ? "text-gray-300" : "text-gray-800"}`}>
              {aboutData.visionMission?.misi?.map((block, index) => (
                <li key={index}>{block.children?.map((child) => child.text).join(" ")}</li>
              ))}
            </ul>
          </div>
        </section>
      </div>

      <Swiper modules={[Navigation, Pagination, Autoplay]} navigation pagination={{ clickable: true }} autoplay={{ delay: 3000, disableOnInteraction: false }}>
        {aboutData.images?.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-[500px] flex items-center justify-center">
              <Image src={image.url} alt={image.alt} fill className="object-contain" priority />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div><KeunggulanSection /></div>

      <button
        onClick={toggleTheme}
        className="fixed bottom-4 right-4 px-4 py-2 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-lg"
      >
        Toggle Theme
      </button>
    </div>
  );
};

export default AboutUsPage;
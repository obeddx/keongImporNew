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
import { client } from "../lib/sanityClient"; // Sanity Client
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaAward, FaIndustry, FaGlobe } from "react-icons/fa";
import KeunggulanSection from "@/components/KeunggulanSection";

type AboutData = {
  history: { children: { text: string }[] }[];
  visionMission: {
    visi: { children: { text: string }[] }[];
    misi: { children: { text: string }[] }[];
  };
  advantages: string[];
  images: { alt: string; url: string }[];
};

const AboutUsPage: React.FC = () => {
  const [aboutData, setAboutData] = useState<AboutData | null>(null);

  useEffect(() => {
    // Fetch data dari Sanity
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
      <div className="text-white text-center py-20">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="py-20 bg-gradient-to-r from-gray-900 via-gray-800 to-black text-white relative overflow-hidden">
      {/* Header Section */}
      <motion.div 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold py-5 mt-5 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
          About Us
        </h1>
        <p className="mt-4 text-gray-300 text-lg">Learn more about PT. KEONG SUMBER MAKMUR</p>
      </motion.div>

      <div className="max-w-6xl mx-auto px-4">
        {/* Sejarah Perusahaan */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-4 text-green-400">Sejarah Perusahaan</h2>
          {aboutData.history?.map((block, index) => (
            <p key={index} className="text-gray-300 leading-relaxed text-justify mb-4">
              {block.children?.map((child) => child.text).join(" ")}
            </p>
          ))}
        </section>

        {/* Visi & Misi */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-4 text-blue-400">Visi dan Misi</h2>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300">
            <h3 className="text-2xl font-semibold mb-2 text-green-400">Visi</h3>
            {aboutData.visionMission?.visi?.map((block, index) => (
              <p key={index} className="text-gray-300 leading-relaxed text-justify mb-4">
                {block.children?.map((child) => child.text).join(" ")}
              </p>
            ))}

            <h3 className="text-2xl font-semibold mb-2 text-blue-400">Misi</h3>
            <ul className="list-disc list-inside text-gray-300 leading-relaxed text-justify space-y-2">
              {aboutData.visionMission?.misi?.map((block, index) => (
                <li key={index}>{block.children?.map((child) => child.text).join(" ")}</li>
              ))}
            </ul>
          </div>
        </section>
      </div>

      {/* Swiper Section */}
      <Swiper modules={[Navigation, Pagination, Autoplay]} navigation pagination={{ clickable: true }} autoplay={{ delay: 3000, disableOnInteraction: false }}>
        {aboutData.images?.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-[500px] flex items-center justify-center">
              <Image src={image.url} alt={image.alt} fill className="object-contain" priority />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="max-w-6xl mx-auto px-4 mt-16">
        <KeunggulanSection />
      </div>

      <div className="max-w-6xl mx-auto px-4 mt-16 text-center">
              <h2 className="text-3xl font-semibold mb-6 text-blue-400">Kontak Kami</h2>
              <div className="space-y-4">
                {[{ icon: FaMapMarkerAlt, label: "Alamat", text: "Semarang, Indonesia" },
                  { icon: FaEnvelope, label: "Email", text: "keongsumbermakmur@aol.com", link: "mailto:keongsumbermakmur@aol.com" },
                  { icon: FaPhoneAlt, label: "Telepon", text: "+628123279332", link: "tel:+628123279332" }]
                  .map((contact, index) => (
                    <p key={index} className="text-gray-300 flex items-center justify-center gap-2">
                      <contact.icon className="text-green-400" />
                      <strong>{contact.label}:</strong>
                      {contact.link ? <a href={contact.link} className="text-blue-500 hover:text-blue-700">{contact.text}</a> : contact.text}
                    </p>
                ))}
              </div>
              <div className="mt-6">
                <a href="https://maps.app.goo.gl/AtV4JVCSH9JGiwQB8" target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-lg hover:opacity-90 transition">
                  Lihat kami di Google Maps
                </a>
              </div>
            </div>
    </div>
    
  );
};

export default AboutUsPage;

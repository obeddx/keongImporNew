"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { client } from "../app/lib/sanityClient";
import { Star, Lightbulb, Leaf } from "lucide-react";
import { useTheme } from "@/components/ThemeContext"; // Import context tema

// Mapping ikon yang tersedia
const iconMapping: Record<string, React.ComponentType<{ className?: string }>> = {
  Star: Star,
  Lightbulb: Lightbulb,
  Leaf: Leaf,
};

interface Advantage {
  title: string;
  description: string;
  icon: keyof typeof iconMapping; // Hanya menerima nilai yang ada di iconMapping
  imageUrl: string;
}

const KeunggulanSection = () => {
  const [advantages, setAdvantages] = useState<Advantage[]>([]);
  const { isDarkMode } = useTheme(); // Mendapatkan status mode gelap

  useEffect(() => {
    const fetchAdvantages = async () => {
      try {
        const data: Advantage[] = await client.fetch(`
          *[_type == "keunggulan"] {
            title,
            description,
            icon,
            "imageUrl": image.asset->url
          }
        `);
        setAdvantages(data);
      } catch (error) {
        console.error("Error fetching advantages data:", error);
      }
    };
    fetchAdvantages();
  }, []);

  return (
    <section
      className={`relative py-16 mb-10 overflow-hidden ${
        isDarkMode
          ? "bg-gradient-to-r from-gray-900 via-gray-800 to-black text-white"
          : "bg-gradient-to-r from-white via-gray-50 to-gray-100 text-black"
      }`}
    >
      {/* Background Blur Effect */}
      <div className="absolute inset-0 bg-[url('/background-pattern.svg')] opacity-10"></div>

      <div className="relative max-w-6xl mx-auto px-6">
        <h2
          className={`text-3xl font-bold text-center mb-8 bg-clip-text ${
            isDarkMode
              ? "text-transparent bg-gradient-to-r from-green-400 to-blue-500"
              : "text-gray-700"
          }`}
        >
          Keunggulan Kami
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {advantages.map((advantage, index) => {
            const IconComponent = iconMapping[advantage.icon] || Star; // ✅ Fix TypeScript issue
            return (
              <div
                key={index}
                className={`group p-6 rounded-2xl shadow-lg transition duration-300 transform hover:scale-105 relative overflow-hidden ${
                  isDarkMode
                    ? "bg-gray-800 hover:bg-gray-700"
                    : "bg-white hover:bg-gray-100"
                }`}
              >
                {/* Glow effect */}
                <div
                  className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition duration-500 ${
                    isDarkMode
                      ? "bg-gradient-to-r from-green-400 to-blue-500"
                      : "bg-gray-300"
                  } blur-3xl`}
                ></div>

                <div className="flex items-center mb-4">
                  <IconComponent
                    className={`w-8 h-8 ${
                      isDarkMode
                        ? "text-green-400 group-hover:text-blue-400"
                        : "text-blue-600 group-hover:text-green-500"
                    } transition duration-300`}
                  />
                  <h3 className="text-xl font-semibold ml-3">{advantage.title}</h3>
                </div>
                <p
                  className={`${
                    isDarkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {advantage.description}
                </p>

                {/* Floating image effect */}
                <div className="absolute -bottom-6 -right-6 w-32 h-32 opacity-20 transform rotate-12 group-hover:opacity-100 group-hover:scale-110 transition duration-500">
                  <Image
                    src={advantage.imageUrl}
                    alt={advantage.title}
                    width={800}
                    height={800}
                    className="rounded-lg shadow-lg"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default KeunggulanSection;

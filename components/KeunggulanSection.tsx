"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { client } from "../app/lib/sanityClient";
import { Star, Lightbulb, Leaf } from "lucide-react";

const iconMapping = {
  Star: Star,
  Lightbulb: Lightbulb,
  Leaf: Leaf,
};

const KeunggulanSection = () => {
  const [advantages, setAdvantages] = useState([]);

  useEffect(() => {
    const fetchAdvantages = async () => {
      try {
        const data = await client.fetch(`
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
    <section className="relative py-16 mb-10 bg-gradient-to-r from-gray-900 via-gray-800 to-black text-white overflow-hidden">
      {/* Background Blur Effect */}
      <div className="absolute inset-0 bg-[url('/background-pattern.svg')] opacity-10"></div>

      <div className="relative max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
          Keunggulan Kami
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {advantages.map((advantage, index) => {
            const IconComponent = iconMapping[advantage.icon] || Star;
            return (
              <div
                key={index}
                className="group bg-gray-800 p-6 rounded-2xl shadow-lg transition duration-300 transform hover:scale-105 relative overflow-hidden"
              >
                {/* Glow effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition duration-500 bg-gradient-to-r from-green-400 to-blue-500 blur-3xl"></div>

                <div className="flex items-center mb-4">
                  <IconComponent className="w-8 h-8 text-green-400 group-hover:text-blue-400 transition duration-300" />
                  <h3 className="text-xl font-semibold ml-3">{advantage.title}</h3>
                </div>
                <p className="text-gray-300">{advantage.description}</p>

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

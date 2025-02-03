"use client";

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import { client } from "../app/lib/sanityClient";
import { useTheme } from "@/components/ThemeContext";

interface Testimonial {
  text: string;
  client: string;
  country: string;
}

const TestimonialSlider: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await client.fetch<Testimonial[]>(
          '*[_type == "testimonial"]{text, client, country}'
        );
        setTestimonials(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();

    const subscription = client
      .listen('*[_type == "testimonial"]{text, client, country}')
      .subscribe(() => {
        fetchData();
      });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <div
      className={`-mt-10 py-16 relative ${
        isDarkMode
          ? "bg-gradient-to-r from-gray-900 via-gray-800 to-black text-white"
          : "bg-gradient-to-r from-purple-100 via-indigo-50 to-purple-100 text-black"
      }`}
    >
      <h2 className="text-4xl font-extrabold text-center mb-12 tracking-wider">
        Apa Kata Klien Kami
      </h2>

      {testimonials.length > 0 ? (
        <Swiper
          spaceBetween={30}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 4000 }}
          modules={[Navigation, Pagination, Autoplay]}
          navigation={true}
          pagination={{ clickable: true }}
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <div
                className={`testimonial-slide max-w-xl mx-auto text-center p-8 rounded-2xl shadow-2xl transform transition duration-300 hover:scale-105 ${
                  isDarkMode
                    ? "bg-gray-800 text-white border-gray-700"
                    : "bg-white text-black border-gray-300"
                } border`}
              >
                <p className="text-xl italic">{testimonial.text}</p>
                <h3 className="mt-6 font-bold text-lg">- {testimonial.client}</h3>
                <p className="text-sm opacity-70">{testimonial.country}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p className="text-center">Loading testimonials...</p>
      )}
    </div>
  );
};

export default TestimonialSlider;

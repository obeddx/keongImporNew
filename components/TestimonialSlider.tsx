'use client';

import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import { client } from '../app/lib/sanityClient';

interface Testimonial {
  text: string;
  client: string;
  country: string;
}

const TestimonialSlider: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

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
      className="testimonial-slider-container py-20 bg-gradient-to-r from-purple-900 via-indigo-700 to-purple-900 relative"
      style={{ minHeight: '500px' }}
    >
      <h2 className="text-4xl font-extrabold text-center mb-12 text-white tracking-wider">
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
              <div className="testimonial-slide max-w-xl mx-auto text-center p-8 bg-white rounded-2xl shadow-2xl transform transition duration-300 hover:scale-105">
                <p className="text-xl italic text-gray-700">{testimonial.text}</p>
                <h3 className="mt-6 font-bold text-gray-900 text-lg">
                  - {testimonial.client}
                </h3>
                <p className="text-sm text-gray-500">{testimonial.country}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p className="text-center text-white">Loading testimonials...</p>
      )}
    </div>
  );
};

export default TestimonialSlider;

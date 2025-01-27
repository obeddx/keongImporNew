'use client'; // Menandakan bahwa ini adalah Client Component

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { Navigation } from 'swiper/modules';

const TestimonialSlider = () => {
  const testimonials = [
    {
      text: '"Pelayanan sangat cepat dan profesional! Saya sangat puas dengan hasil kerja tim."',
      client: 'Nama Klien 1',
      country: 'Indonesia',
    },
    {
      text: '"Produk yang ditawarkan berkualitas tinggi dan memberikan solusi nyata bagi bisnis saya."',
      client: 'Nama Klien 2',
      country: 'Malaysia',
    },
    {
      text: '"Layanan yang luar biasa! Mereka memahami kebutuhan saya dengan sangat baik."',
      client: 'Nama Klien 3',
      country: 'Singapura',
    },
  ];

  return (
    <div className="testimonial-slider-container py-20 bg-gradient-to-r from-purple-900 via-indigo-700 to-purple-900 relative" style={{ minHeight: '500px' }}>
      <h2 className="text-4xl font-extrabold text-center mb-12 text-white tracking-wider">Apa Kata Klien Kami</h2>
      <Swiper
        spaceBetween={30}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 4000,
        }}
        modules={[Navigation, Pagination]}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        pagination={{
          clickable: true,
        }}
      >
        {testimonials.map((testimonial, index) => (
          <SwiperSlide key={index}>
            <div className="testimonial-slide max-w-xl mx-auto text-center p-8 bg-white rounded-2xl shadow-2xl transform transition duration-300 hover:scale-105">
              <p className="text-xl italic text-gray-700">{testimonial.text}</p>
              <h3 className="mt-6 font-bold text-gray-900 text-lg">- {testimonial.client}</h3>
              <p className="text-sm text-gray-500">{testimonial.country}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="swiper-button-next bg-white text-gray-800 rounded-full shadow-lg"></div>
      <div className="swiper-button-prev bg-white text-gray-800 rounded-full shadow-lg"></div>
    </div>
  );
};

export default TestimonialSlider;
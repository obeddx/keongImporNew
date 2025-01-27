// components/Testimoni.js
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';

export default function Testimoni() {
  return (
    <section id="testimoni" className="py-16 bg-gray-50">
      <h2 className="text-3xl font-bold text-center mb-8">Apa Kata Klien Kami</h2>
      <Swiper spaceBetween={50} slidesPerView={1} navigation={true}>
        <SwiperSlide>
          <div className="text-center">
            <p className="italic">"Produk keong escargot yang luar biasa, kualitas terbaik yang pernah saya coba!"</p>
            <p className="font-semibold mt-2">John Doe, USA</p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="text-center">
            <p className="italic">"Pelayanan cepat dan profesional. Sangat direkomendasikan!"</p>
            <p className="font-semibold mt-2">Jane Smith, UK</p>
          </div>
        </SwiperSlide>
      </Swiper>
    </section>
  );
}

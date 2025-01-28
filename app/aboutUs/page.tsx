"use client";
import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaAward, FaIndustry, FaGlobe } from "react-icons/fa";
import KeunggulanSection from "@/components/KeunggulanSection";
import { motion } from "framer-motion";

const AboutUsPage = () => {
  return (
    <div className="py-20 bg-gradient-to-r from-gray-900 via-gray-800 to-black text-white relative overflow-hidden">
      {/* Floating Elements */}
      <div className="absolute top-10 left-10 w-16 h-16 bg-blue-500 opacity-30 rounded-full animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-24 h-24 bg-green-400 opacity-20 rounded-full animate-bounce"></div>
      
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
        <p className="mt-4 text-gray-300 text-lg">Learn more about PT. KEONG SUMBER MAKMUR</p> <br/>
        <div className="max-w-6xl mx-auto px-4"> 
        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-4 text-green-400">Sejarah Perusahaan</h2> <br/>
          <p className="text-gray-300 leading-relaxed text-justify mb-4">
            PT. KEONG SUMBER MAKMUR adalah perusahaan yang telah berdiri sejak tahun 1988 dan bergerak di bidang perikanan dengan spesialisasi dalam produksi daging bekicot beku (Frozen Snail Meat) serta daging bekicot kaleng (Achatina Snail Meat). Sejak awal berdirinya, perusahaan ini didirikan dengan visi untuk menjadi salah satu pelopor dalam industri pengolahan produk perikanan yang berkualitas tinggi dan berkelanjutan, dengan mengedepankan inovasi serta proses pengolahan yang memenuhi standar internasional.
          </p>
          <p className="text-gray-300 leading-relaxed text-justify">
            Dengan lebih dari tiga dekade pengalaman, PT. KEONG SUMBER MAKMUR telah mengembangkan reputasi sebagai salah satu produsen terkemuka dalam industri pengolahan daging bekicot di Indonesia. Perusahaan ini berkomitmen untuk menghadirkan produk yang tidak hanya berkualitas tinggi tetapi juga aman untuk dikonsumsi, dengan menerapkan proses produksi yang higienis dan memenuhi standar keamanan pangan internasional.
          </p>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-4 text-blue-400">Visi dan Misi</h2>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300">
            <h3 className="text-2xl font-semibold mb-2 text-green-400">Visi</h3>
            <p className="text-gray-300 leading-relaxed text-justify mb-4">
              Menjadi perusahaan terkemuka dan terpercaya dalam industri pengolahan hasil perikanan, khususnya daging bekicot, yang dikenal secara global karena kualitas produk yang unggul, inovasi berkelanjutan, dan penerapan standar keberlanjutan yang tinggi.
            </p>

            <h3 className="text-2xl font-semibold mb-2 text-blue-400">Misi</h3>
            <ul className="list-disc list-inside text-gray-300 leading-relaxed text-justify space-y-2">
              <li>Menghasilkan produk daging bekicot berkualitas tinggi yang memenuhi standar nasional dan internasional.</li>
              <li>Melakukan inovasi terus-menerus dalam proses pengolahan produk perikanan.</li>
              <li>Berkomitmen pada praktik bisnis yang ramah lingkungan dan berkelanjutan.</li>
              <li>Menyediakan lingkungan kerja yang aman dan kondusif bagi seluruh karyawan.</li>
              <li>Membina hubungan kerja sama yang erat dan saling menguntungkan dengan mitra bisnis.</li>
              <li>Meningkatkan kesadaran masyarakat terhadap manfaat produk daging bekicot.</li>
            </ul>
          </div>
        </section>
        </div>
      </motion.div>

      {/* Info Cards */}
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4 mb-16">
        {[{ icon: FaAward, title: "Prestasi", text: "Lebih dari 30 tahun pengalaman dalam industri pengolahan hasil perikanan." },
          { icon: FaIndustry, title: "Fasilitas", text: "Menggunakan teknologi modern dan standar internasional dalam produksi." },
          { icon: FaGlobe, title: "Ekspor Global", text: "Produk kami telah diekspor ke berbagai negara di dunia." }]
          .map((item, index) => (
            <motion.div key={index} whileHover={{ scale: 1.05 }} className="p-6 bg-gray-800 rounded-lg text-center shadow-lg">
              <item.icon className="text-5xl mx-auto mb-4 text-green-400" />
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-300">{item.text}</p>
            </motion.div>
        ))}
      </div>

      {/* Swiper Section */}
      
              <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                navigation
                pagination={{ clickable: true }}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                }}
              >
                
        <SwiperSlide>
        <div className="relative w-full h-[500px] flex items-center justify-center">
          <Image
            src="/swiperaboutUs1.jpg"
            alt="Slide 1"
            fill
            className="object-contain" // Mengatur ukuran gambar agar tidak terpotong
            priority // Opsional untuk gambar penting
          />
        </div>
      </SwiperSlide>
        <SwiperSlide>
        <div className="relative w-full h-[500px] flex items-center justify-center">
          <Image
            src="/swiperaboutUs4.jpg"
            alt="Slide 2"
            fill
            className="object-contain" // Mengatur ukuran gambar agar tidak terpotong
            priority // Opsional untuk gambar penting
          />
        </div>
      </SwiperSlide>
        <SwiperSlide>
        <div className="relative w-full h-[500px] flex items-center justify-center">
          <Image
            src="/swiperaboutUs3.jpg"
            alt="Slide 3"
            fill
            className="object-contain" // Mengatur ukuran gambar agar tidak terpotong
            priority // Opsional untuk gambar penting
          />
        </div>
      </SwiperSlide>
      
      </Swiper>
      
      {/* Keunggulan Section */}
      <div className="max-w-6xl mx-auto px-4 mt-16">
        <KeunggulanSection />
      </div>
      
      {/* Contact Section */}
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

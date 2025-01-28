"use client";
import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Pagination } from 'swiper/modules';
import { Navigation } from 'swiper/modules';
import { Autoplay } from 'swiper/modules';
import KeunggulanSection from "@/components/KeunggulanSection";


const AboutUsPage = () => {
  return (
    <div className="py-20 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold py-5 mt-5">About Us</h1>
        <p className="mt-4 text-gray-300 text-lg">
          Learn more about PT. KEONG SUMBER MAKMUR
        </p>
      </div>

      {/* Company History, Vision-Mission, and Advantages */}
      <div className="max-w-6xl mx-auto px-4">
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-2">Sejarah Perusahaan</h2>
          <p className="text-gray-300 leading-relaxed text-justify mb-4">
            PT. KEONG SUMBER MAKMUR adalah perusahaan yang telah berdiri sejak tahun 1988 dan bergerak di 
            bidang perikanan dengan spesialisasi dalam produksi daging bekicot beku (Frozen Snail Meat) serta 
            daging bekicot kaleng (Achatina Snail Meat). Sejak awal berdirinya, perusahaan ini didirikan dengan 
            visi untuk menjadi salah satu pelopor dalam industri pengolahan produk perikanan yang berkualitas 
            tinggi dan berkelanjutan, dengan mengedepankan inovasi serta proses pengolahan yang memenuhi standar 
            internasional. 
          </p>

          <p className="text-gray-300 leading-relaxed text-justify">
            Dengan lebih dari tiga dekade pengalaman, PT. KEONG SUMBER MAKMUR telah mengembangkan 
            reputasi sebagai salah satu produsen terkemuka dalam industri pengolahan daging bekicot di Indonesia. 
            Perusahaan ini berkomitmen untuk menghadirkan produk yang tidak hanya berkualitas tinggi tetapi juga 
            aman untuk dikonsumsi, dengan menerapkan proses produksi yang higienis dan memenuhi standar keamanan 
            pangan internasional.
          </p>

        </section>

        {/* <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-4">Visi & Misi</h2>
          <ul className="list-disc list-inside text-gray-300 space-y-2">
            <li>
              <strong>Visi:</strong> Menjadi perusahaan terkemuka dalam produk
              keong yang diakui secara global.
            </li>
            <li>
              <strong>Misi:</strong>
              <ul className="list-inside list-decimal pl-6">
                <li>Menawarkan produk berkualitas tinggi yang memenuhi standar internasional.</li>
                <li>Memberdayakan masyarakat lokal melalui lapangan kerja dan pelatihan.</li>
                <li>Meningkatkan keberlanjutan dengan praktik ramah lingkungan.</li>
              </ul>
            </li>
          </ul>
        </section> */}
        <section className="mb-16">
      <h2 className="text-2xl font-semibold mb-4">Visi dan Misi</h2>

      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        {/* Visi */}
        <h3 className="text-xl font-semibold mb-2">Visi</h3>
        <p className="text-gray-300 leading-relaxed text-justify mb-4">
          Menjadi perusahaan terkemuka dan terpercaya dalam industri pengolahan hasil perikanan, khususnya daging bekicot, yang dikenal secara global karena kualitas produk yang unggul, inovasi berkelanjutan, dan penerapan standar keberlanjutan yang tinggi. PT. KEONG SUMBER MAKMUR berkomitmen untuk memberikan kontribusi nyata dalam mendukung pengembangan industri perikanan nasional dan internasional dengan produk-produk yang aman, berkualitas tinggi, serta ramah lingkungan.
        </p>

        {/* Misi */}
        <h3 className="text-xl font-semibold mb-2">Misi</h3>
        <ul className="list-disc list-inside text-gray-300 leading-relaxed text-justify space-y-2">
          <li>
            Menghasilkan produk daging bekicot berkualitas tinggi yang memenuhi standar nasional dan internasional dengan memastikan proses produksi yang higienis, aman, dan efisien.
          </li>
          <li>
            Melakukan inovasi terus-menerus dalam proses pengolahan produk perikanan untuk menghadirkan produk yang sesuai dengan kebutuhan pasar serta berdaya saing tinggi.
          </li>
          <li>
            Berkomitmen pada praktik bisnis yang ramah lingkungan dan berkelanjutan dengan meminimalkan dampak lingkungan dalam setiap tahapan proses produksi.
          </li>
          <li>
            Menyediakan lingkungan kerja yang aman, sehat, dan kondusif bagi seluruh karyawan, serta mendorong pengembangan keterampilan dan pengetahuan mereka untuk mendukung pertumbuhan perusahaan.
          </li>
          <li>
            Membina hubungan kerja sama yang erat dan saling menguntungkan dengan mitra bisnis, pelanggan, serta masyarakat sekitar untuk mendukung perkembangan industri perikanan secara berkelanjutan.
          </li>
          <li>
            Meningkatkan kesadaran masyarakat terhadap manfaat produk daging bekicot serta memperkenalkan produk-produk berkualitas tinggi dari Indonesia ke pasar global.
          </li>
        </ul>
      </div>
    </section>


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



        <div>
            <KeunggulanSection></KeunggulanSection>
          </div>

        </div>

      {/* Contact Information */}
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl font-semibold mb-4">Kontak Kami</h2>
        <p className="text-gray-300 mb-2">
          <strong>Alamat:</strong> Semarang : Jl Terboyo Industri gang 5 no G 35 Trimulyo, Genuk, Kota Semarang
        </p>

        <p className="text-gray-300 mb-2">
          <strong>Email:</strong>{" "}
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=keongsumbermakmur@aol.com&su=Subjek%20Email&body=Isi%20Pesan"
            className="text-blue-500 hover:text-blue-700"
            target="_blank"
            rel="noopener noreferrer"
          >
            keongsumbermakmur@aol.com
          </a>
        </p>

        <p className="text-gray-300 mb-2">
          <strong>Telepon:</strong>{" "}
          <a
            href="https://wa.me/628123279332"
            className="text-blue-500 hover:text-blue-700"
            target="_blank"
            rel="noopener noreferrer"
          >
            +628123279332
          </a>
        </p>

        <div className="mt-4">
          <a
            href="https://maps.app.goo.gl/AtV4JVCSH9JGiwQB8"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Lihat kami di Google Maps
          </a>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;

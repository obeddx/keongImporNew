"use client";

import React from "react";
import { useSearchParams } from "next/navigation";

const ContactPage = () => {
  const searchParams = useSearchParams();
  const subject = searchParams.get("subject") || "Hubungi untuk Penawaran";

  return (
    <div className="py-20 px-6 md:px-10 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 min-h-screen text-white">
      <div className="max-w-4xl mx-auto bg-gray-800 rounded-lg shadow-xl p-8">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-6">
          {subject}
        </h1>
        <p className="text-gray-300 text-lg mb-6 text-center">
          Selamat datang di halaman kontak kami. Kami adalah perusahaan yang
          menyediakan produk Frozen Snail Meat berkualitas tinggi untuk kebutuhan
          Anda. Produk kami diproses secara higienis dan dikemas menggunakan teknologi
          modern untuk menjaga kesegaran dan nilai gizinya.
        </p>
        <div className="text-gray-300 text-sm mb-6 space-y-2">
          <p><strong>Alamat Perusahaan:</strong> Jl. Seaside No. 12, Jakarta, Indonesia</p>
          <p><strong>Email:</strong> info@frozen-snail.com</p>
          <p><strong>Telepon:</strong> +62 812-3456-7890</p>
          <p><strong>Jam Operasional:</strong> Senin - Jumat, 09.00 - 17.00 WIB</p>
        </div>
        <form className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
              Nama Anda
            </label>
            <input
              id="name"
              type="text"
              className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Masukkan nama Anda"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
              Email Anda
            </label>
            <input
              id="email"
              type="email"
              className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Masukkan email Anda"
              required
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
              Pesan Anda
            </label>
            <textarea
              id="message"
              rows={5}
              className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Tulis pesan Anda di sini"
              required
            ></textarea>
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition"
            >
              Kirim Pesan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;

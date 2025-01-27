"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";

const ContactPage = () => {
  const searchParams = useSearchParams();
  const subject = searchParams.get("subject") || "Contact Us";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    country: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    name: false,
    email: false,
    company: false,
    country: false,
    message: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: false });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = {
      name: formData.name === "",
      email: formData.email === "",
      company: formData.company === "",
      country: formData.country === "",
      message: formData.message === "",
    };
    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some((error) => error);
    if (!hasErrors) {
      // Handle form submission
      console.log("Form submitted", formData);
    }
  };

  return (
    <div className="py-20 px-6 md:px-10 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 min-h-screen text-white">
      <div className="max-w-4xl mx-auto bg-gray-800 rounded-lg shadow-xl p-8">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-6">{subject}</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <p className="text-gray-300 text-lg mb-6 text-center">
            Selamat datang di halaman kontak kami. Kami adalah perusahaan yang menyediakan produk Frozen Snail Meat berkualitas tinggi untuk kebutuhan Anda. Produk kami diproses secara higienis dan dikemas menggunakan teknologi modern untuk
            menjaga kesegaran dan nilai gizinya.
          </p>
          <div className="text-gray-300 text-sm mb-6 space-y-2">
            <p>
              <strong>Alamat Perusahaan:</strong> Jl. Seaside No. 12, Jakarta, Indonesia
            </p>
            <p>
              <strong>Email:</strong> info@frozen-snail.com
            </p>
            <p>
              <strong>Telepon:</strong> +62 812-3456-7890
            </p>
            <p>
              <strong>Jam Operasional:</strong> Senin - Jumat, 09.00 - 17.00 WIB
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300">Nama</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} className={`mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white ${errors.name ? "border-red-500" : ""}`} />
            {errors.name && <p className="text-red-500 text-sm">Nama wajib diisi</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} className={`mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white ${errors.email ? "border-red-500" : ""}`} />
            {errors.email && <p className="text-red-500 text-sm">Email wajib diisi</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Perusahaan</label>
            <input type="text" name="company" value={formData.company} onChange={handleChange} className={`mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white ${errors.company ? "border-red-500" : ""}`} />
            {errors.company && <p className="text-red-500 text-sm">Perusahaan wajib diisi</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Negara</label>
            <input type="text" name="country" value={formData.country} onChange={handleChange} className={`mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white ${errors.country ? "border-red-500" : ""}`} />
            {errors.country && <p className="text-red-500 text-sm">Negara wajib diisi</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Pesan</label>
            <textarea name="message" value={formData.message} onChange={handleChange} className={`mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white ${errors.message ? "border-red-500" : ""}`} />
            {errors.message && <p className="text-red-500 text-sm">Pesan wajib diisi</p>}
          </div>
          <button type="submit" className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-md text-white font-medium">
            Kirim Pesan
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;

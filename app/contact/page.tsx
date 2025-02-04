"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { useTheme } from '@/components/ThemeContext'; // Menggunakan theme context dari folder components

const ContactPage = () => {
  const searchParams = useSearchParams();
  const subject = searchParams?.get("subject") || "Contact Us";
  const { isDarkMode } = useTheme(); // Mendapatkan status mode gelap dari context

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
    country: false,
    message: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: false });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {
      name: formData.name === "",
      email: formData.email === "",
      country: formData.country === "",
      message: formData.message === "",
    };
    setErrors(newErrors);
    
    if (!Object.values(newErrors).some(Boolean)) {
      alert("Pesan berhasil dikirim!");
      setFormData({ name: "", email: "", company: "", country: "", message: "" });
    }
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? "bg-gray-900 text-white" : "bg-white text-black"} flex items-center justify-center px-6 py-16 pt-32`}>
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className={`w-full max-w-3xl ${isDarkMode ? "bg-gray-800 text-white border-gray-700" : "bg-white text-black border-gray-400"} p-8 rounded-xl shadow-2xl border`}>
        
        <h1 className={`text-4xl font-bold text-center ${isDarkMode ? "text-white" : "text-black"} mb-6`}>{subject}</h1>
        <p className={`text-center mb-6 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>Kami siap membantu Anda! Silakan isi formulir di bawah.</p>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          {[ 
            { label: "Nama", name: "name" },
            { label: "Email", name: "email", type: "email" },
            { label: "Perusahaan", name: "company", required: false },
            { label: "Negara", name: "country" },
          ].map(({ label, name, type = "text", required = true }) => (
            <div key={name}>
              <label className={`block ${isDarkMode ? "text-gray-300" : "text-gray-700"} mb-1`}>{label}</label>
              <input 
                type={type} 
                name={name} 
                value={formData[name]} 
                onChange={handleChange} 
                className={`w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${isDarkMode ? "bg-gray-700 text-white border-gray-600" : "bg-white text-black border-gray-400"} ${errors[name] ? "border-red-500" : ""}`} 
                required={required} // Now using required properly
              />
              {errors[name] && <p className="text-red-500 text-sm">{label} wajib diisi</p>}
            </div>
          ))}

          <div>
            <label className={`block ${isDarkMode ? "text-gray-300" : "text-gray-700"} mb-1`}>Pesan</label>
            <textarea 
              name="message" 
              value={formData.message} 
              onChange={handleChange} 
              className={`w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${isDarkMode ? "bg-gray-700 text-white border-gray-600" : "bg-white text-black border-gray-400"} ${errors.message ? "border-red-500" : ""}`} 
            />
            {errors.message && <p className="text-red-500 text-sm">Pesan wajib diisi</p>}
          </div>
          
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-md text-white font-semibold transition">
            Kirim Pesan
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default ContactPage;

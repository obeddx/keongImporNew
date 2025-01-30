"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";

const ContactPage = () => {
  const searchParams = useSearchParams();
  const subject = searchParams?.get("subject") || "Contact Us";

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
    <div className="min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center px-6 py-16 pt-32"> {/* Tambahkan pt-32 */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-3xl bg-gray-800 p-8 rounded-xl shadow-2xl border border-gray-700">
        
        <h1 className="text-4xl font-bold text-center text-white mb-6">{subject}</h1>
        <p className="text-gray-400 text-center mb-6">Kami siap membantu Anda! Silakan isi formulir di bawah.</p>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          {[ 
            { label: "Nama", name: "name" },
            { label: "Email", name: "email", type: "email" },
            { label: "Perusahaan", name: "company", required: false },
            { label: "Negara", name: "country" },
          ].map(({ label, name, type = "text", required = true }) => (
            <div key={name}>
              <label className="block text-gray-300 mb-1">{label}</label>
              <input 
                type={type} 
                name={name} 
                value={formData[name]} 
                onChange={handleChange} 
                className={`w-full px-4 py-2 rounded-md bg-gray-700 border ${errors[name] ? "border-red-500" : "border-gray-600"} text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition`} 
              />
              {errors[name] && <p className="text-red-500 text-sm">{label} wajib diisi</p>}
            </div>
          ))}

          <div>
            <label className="block text-gray-300 mb-1">Pesan</label>
            <textarea 
              name="message" 
              value={formData.message} 
              onChange={handleChange} 
              className={`w-full px-4 py-2 rounded-md bg-gray-700 border ${errors.message ? "border-red-500" : "border-gray-600"} text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition`} 
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

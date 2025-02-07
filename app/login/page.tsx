"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "@/components/ThemeContext";

const LoginPage = () => {
  const router = useRouter();
  const { isDarkMode } = useTheme();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError("");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.username === "" || formData.password === "") {
      setError("Username dan password wajib diisi.");
      return;
    }

    // Simulate login logic
    sessionStorage.setItem("isAdmin", "true");

    // Trigger event agar Navbar.tsx langsung mendeteksi perubahan tanpa refresh
    window.dispatchEvent(new Event("storage"));

    alert("Login berhasil!");
    router.replace("/"); // Pastikan navbar langsung diperbarui tanpa reload
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"} flex items-center justify-center px-6 py-16`}>
      <form onSubmit={handleSubmit} className={`w-full max-w-md ${isDarkMode ? "bg-gray-800" : "bg-white"} p-8 rounded-lg shadow-md`}>
        <h1 className="text-2xl font-bold mb-6">Login</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="mb-4">
          <label className="block mb-2">Username</label>
          <input type="text" name="username" value={formData.username} onChange={handleChange} className="w-full px-4 py-2 border rounded bg-white text-black" required />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Password</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} className="w-full px-4 py-2 border rounded bg-white text-black" required />
        </div>
        <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Login
        </button>
        <p className="mt-4 text-sm">
          Belum punya akun?{" "}
          <a href="/register" className="text-blue-500 underline">
            Register di sini
          </a>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;

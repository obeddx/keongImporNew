"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "@/components/ThemeContext";

const RegisterPage = () => {
  const router = useRouter();
  const { isDarkMode } = useTheme();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (username.trim() === "" || password.trim() === "") {
      setError("Username dan password wajib diisi.");
      return;
    }

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Registrasi gagal!");

      setSuccess("Registrasi berhasil! Silakan login.");
      setTimeout(() => router.push("/login"), 2000);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Terjadi kesalahan yang tidak diketahui.");
      }
    }
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"} flex items-center justify-center px-6 py-16`}>
      <form onSubmit={handleSubmit} className={`w-full max-w-md ${isDarkMode ? "bg-gray-800" : "bg-white"} p-8 rounded-lg shadow-md`}>
        <h1 className="text-2xl font-bold mb-6">Registrasi</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}
        <div className="mb-4">
          <label className="block mb-2">Username</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full px-4 py-2 border rounded bg-white text-black" required />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-2 border rounded bg-white text-black" required />
        </div>
        <button type="submit" className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700">
          Daftar
        </button>
        <p className="mt-4 text-sm">
          Sudah punya akun?{" "}
          <a href="/login" className="text-blue-500 underline">
            Login di sini
          </a>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;

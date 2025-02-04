"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useContext, useState, useEffect } from "react";
import { ThemeContext } from "@/components/ThemeContext"; // Import ThemeContext


export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Mengambil toggleTheme dan theme dari ThemeContext
  const { toggleTheme, isDarkMode } = useContext(ThemeContext);

  useEffect(() => {
    // Mark the component as client-side after it mounts
    setIsClient(true);

    const adminStatus = localStorage.getItem("isAdmin");
    if (adminStatus === "true") {
      setIsAdmin(true);
    }

    // Load Google Translate after component is mounted
    loadGoogleTranslate();
  }, []);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/Products" },
    { label: "About Us", href: "/aboutUs" },
    { label: "Contact", href: "/contact" },
    { label: "Article", href: "/article" },
  ];

  const handleLogin = () => {
    setIsAdmin(true);
    localStorage.setItem("isAdmin", "true");
    alert("Login berhasil sebagai admin!");
  };

  const handleLogout = () => {
    setIsAdmin(false);
    localStorage.removeItem("isAdmin");
    alert("Anda telah logout.");
    router.push("/");
  };

  const resetTranslate = () => {
    const selectElement = document.querySelector(".goog-te-combo");
    if (selectElement) {
      selectElement.value = "en"; // Set ke bahasa default (tidak ada)
      selectElement.dispatchEvent(new Event("change")); // Trigger perubahan bahasa
    }
  };

  // Fungsi untuk load Google Translate dan sembunyikan banner
  const loadGoogleTranslate = () => {
    const script = document.createElement("script");
    script.src =
      "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.body.appendChild(script);

    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "id", // Set default page language (Indonesian)
          includedLanguages: "en,id,ko,zh-CN", // Include languages in English
          layout: window.google.translate.TranslateElement.InlineLayout.HORIZONTAL,
          autoDisplay: false, // Disable automatic dropdown display
          multilanguagePage: true,
          gaTrack: true,
        },
        "google_translate_element"
      );

      // Menghapus banner Google Translate
      const interval = setInterval(() => {
        const banner = document.querySelector(".goog-te-banner-frame");
        if (banner) {
          banner.style.display = "none"; // Sembunyikan banner
          clearInterval(interval); // Hentikan interval setelah banner disembunyikan
        }
      }, 100);
    };
  };

  if (!isClient) return null; // Prevent rendering on the server side

  return (
    <nav className="bg-gray-900 text-white fixed w-full top-0 left-0 z-50 shadow-lg pt-7">
      <div className="max-w-1xl mx-auto px-1 py-6 flex items-center justify-between px-5">
        <div className="text-2xl font-bold">
          <Link href="/" className="hover:text-blue-500 transition duration-300">
            PT. KEONG SUMBER MAKMUR
          </Link>
        </div>

        <div className="flex space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`relative px-3 py-2 transition duration-300 rounded-lg hover:bg-blue-600 hover:text-white ${
                pathname === item.href
                  ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md scale-105"
                  : "text-gray-300"
              }`}
            >
              {item.label}
              {pathname === item.href && (
                <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></span>
              )}
            </Link>
          ))}

{isAdmin && (
  <>
    <Link
      href="/send"
      className={`relative px-3 py-2 transition duration-300 rounded-lg hover:bg-blue-600 hover:text-white ${
        pathname === "/send"
          ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md scale-105"
          : "text-gray-300"
      }`}
    >
      Send Email
      {pathname === "/send" && (
        <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></span>
      )}
    </Link>

    <Link
      href="/analisa"
      className={`relative px-3 py-2 transition duration-300 rounded-lg hover:bg-green-600 hover:text-white ${
        pathname === "/analisa"
          ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md scale-105"
          : "text-gray-300"
      }`}
    >
      Analisa
      {pathname === "/analisa" && (
        <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-teal-400 rounded-full"></span>
      )}
    </Link>
  </>
)}

        </div>

        {/* Dropdown Translate */}
        <div id="google_translate_element" className="mr-6"></div>

        {/* Tombol Reset ke Bahasa Asli */}
        <button
          onClick={resetTranslate}
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-700 transition"
        >
          Bahasa Asli
        </button>

        {/* Tombol Login/Logout */}
        <button
          onClick={isAdmin ? handleLogout : handleLogin}
          className="ml-6 px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full hover:scale-105 transition-transform duration-300 shadow-md"
        >
          {isAdmin ? "Logout" : "Login"}
        </button>

        {/* Tombol Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="ml-6 px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-800 transition"
        >
          {isDarkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>
    </nav>
  );
}

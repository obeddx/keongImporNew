"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const adminStatus = localStorage.getItem("isAdmin");
    if (adminStatus === "true") {
      setIsAdmin(true);
    }

    // Load Google Translate setelah komponen dimuat
    loadGoogleTranslate();
  }, []);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/Products" },
    { label: "About Us", href: "/aboutUs" },
    { label: "Contact", href: "/contact" },
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
          pageLanguage: "id",
          layout: window.google.translate.TranslateElement.InlineLayout.HORIZONTAL,
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

  return (
    <nav className="bg-gray-900 text-white fixed w-full top-0 left-0 z-50 shadow-lg pt-7"> {/* Menambahkan mt-8 untuk margin atas */}
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

          {/* Link untuk Send Email hanya untuk admin */}
          {isAdmin && (
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
      </div>
    </nav>
  );
}

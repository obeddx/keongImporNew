"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useContext, useState, useEffect } from "react";
import { ThemeContext } from "@/components/ThemeContext";

// Deklarasi global untuk Google Translate API agar tidak dianggap 'any'
declare global {
  interface Window {
    google?: {
      translate?: {
        TranslateElement: new (options: object, containerId: string) => void;
      };
    };
    googleTranslateElementInit?: () => void;
  }
}

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { toggleTheme, isDarkMode } = useContext(ThemeContext);

  useEffect(() => {
    setIsClient(true);

    // Cek status admin saat pertama kali komponen dimuat
    const adminStatus = sessionStorage.getItem("isAdmin");
    setIsAdmin(adminStatus === "true");

    // Event listener untuk mendeteksi perubahan sessionStorage
    const handleStorageChange = () => {
      const updatedStatus = sessionStorage.getItem("isAdmin");
      setIsAdmin(updatedStatus === "true");
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/Products" },
    { label: "About Us", href: "/aboutUs" },
    { label: "Contact", href: "/contact" },
    { label: "Article", href: "/article" },
  ];

  const handleLogout = () => {
    setIsAdmin(false);
    sessionStorage.removeItem("isAdmin"); // Pastikan sessionStorage dihapus
    localStorage.removeItem("isAdmin");

    alert("Anda telah logout.");

    router.replace("/"); // Paksa re-render agar status navbar langsung berubah
  };

  const resetTranslate = () => {
    const selectElement = document.querySelector<HTMLSelectElement>(".goog-te-combo");
    if (selectElement) {
      selectElement.value = "en";
      selectElement.dispatchEvent(new Event("change"));
    }
  };

  const loadGoogleTranslate = () => {
    if (typeof window !== "undefined" && !window.google) {
      const script = document.createElement("script");
      script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);

      window.googleTranslateElementInit = () => {
        if (window.google?.translate) {
          new window.google.translate.TranslateElement(
            {
              pageLanguage: "id",
              includedLanguages: "en,id,ko,zh-CN",
              layout: 1, // 1 untuk HORIZONTAL layout
              autoDisplay: false,
              multilanguagePage: true,
              gaTrack: true,
            },
            "google_translate_element"
          );

          const interval = setInterval(() => {
            const banner = document.querySelector(".goog-te-banner-frame") as HTMLIFrameElement | null;
            if (banner) {
              banner.style.display = "none";
              clearInterval(interval);
            }
          }, 100);
        }
      };
    }
  };

  useEffect(() => {
    loadGoogleTranslate();
  }, []);

  if (!isClient) return null;

  return (
    <nav className="bg-gray-900 text-white fixed w-full top-0 left-0 z-50 shadow-lg pt-5">
      <div className="max-w-1xl mx-auto px-5 py-4 flex items-center justify-between">
        <div className="text-2xl font-bold">
          <Link href="/" className="hover:text-blue-500 transition duration-300">
            PT. KEONG SUMBER MAKMUR
          </Link>
        </div>

        {/* Tombol Hamburger */}
        <button className="md:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>

        <div className={`${menuOpen ? "block" : "hidden"} absolute md:static top-full left-0 w-full bg-gray-900 md:flex md:items-center space-y-2 md:space-y-0 md:space-x-6`}>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`relative block md:inline-block px-3 py-2 transition duration-300 rounded-lg hover:bg-blue-600 hover:text-white ${pathname === item.href ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md" : "text-gray-300"
                }`}
            >
              {item.label}
            </Link>
          ))}

          {isAdmin && (
            <>
              <Link
                href="/send"
                className={`relative block md:inline-block px-3 py-2 transition duration-300 rounded-lg hover:bg-blue-600 hover:text-white ${pathname === "/send" ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md" : "text-gray-300"
                  }`}
              >
                Send Email
              </Link>
              <Link
                href="/analisa"
                className={`relative block md:inline-block px-3 py-2 transition duration-300 rounded-lg hover:bg-blue-600 hover:text-white ${pathname === "/analisa" ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md" : "text-gray-300"
                  }`}
              >
                Analisa
              </Link>
            </>
          )}


          {/* Dropdown Translate */}
          <div id="google_translate_element" className="mr-6"></div>

          <button onClick={resetTranslate} className="block md:inline-block px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-700 transition">
            Bahasa Asli
          </button>

          <button
            onClick={isAdmin ? handleLogout : () => router.push("/login")}
            className="block md:inline-block px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full hover:scale-105 transition-transform duration-300 shadow-md"
          >
            {isAdmin ? "Logout" : "Login"}
          </button>

          <button onClick={toggleTheme} className="block md:inline-block px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-800 transition">
            {isDarkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>
      </div>
    </nav>
  );
}

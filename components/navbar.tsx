"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/Products" },
    { label: "About Us", href: "/aboutUs" },
    { label: "Contact", href: "/contact" },
  ];

  useEffect(() => {
    const adminStatus = localStorage.getItem("isAdmin");
    if (adminStatus === "true") {
      setIsAdmin(true);
    }
  }, []);

  const handleLogin = () => {
    setIsAdmin(true);
    localStorage.setItem("isAdmin", "true");
    alert("Login berhasil sebagai admin!");
  };

  const handleLogout = () => {
    setIsAdmin(false);
    localStorage.removeItem("isAdmin");
    alert("Anda telah logout.");
    router.push("/"); // Redirect ke halaman utama setelah logout
  };

  return (
    <nav className="bg-gray-900 text-white fixed w-full top-0 left-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-6 flex items-center">
        <div className="text-2xl font-bold">
          <Link href="/" className="hover:text-blue-500">
            PT. KEONG SUMBER MAKMUR
          </Link>
        </div>

        <div className="ml-auto space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`hover:text-blue-500 ${pathname === item.href ? "text-blue-500 underline" : ""}`}
            >
              {item.label}
            </Link>
          ))}

          {/* Link untuk Send Email hanya untuk admin */}
          {isAdmin && (
            <Link
              href="/send"
              className={`hover:text-blue-500 ${pathname === "/send" ? "text-blue-500 underline" : ""}`}
            >
              Send Email
            </Link>
          )}
        </div>

        {/* Tombol Login/Logout */}
        <button
          onClick={isAdmin ? handleLogout : handleLogin}
          className="ml-6 px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700"
        >
          {isAdmin ? "Logout" : "Login"}
        </button>
      </div>
    </nav>
  );
}

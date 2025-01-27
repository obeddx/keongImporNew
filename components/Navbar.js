// components/Navbar.js
import { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-gray-900 text-white py-4 px-6 fixed w-full top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-semibold">
          <Link href="/">
            <a className="text-white hover:text-blue-500">PT. KEONG SUMBER MAKMUR</a>
          </Link>
        </div>

        {/* Menu (Desktop) */}
        <div className="hidden md:flex space-x-8">
          <Link href="#hero">
            <a className="text-lg hover:text-blue-500">Home</a>
          </Link>
          <Link href="#keunggulan">
            <a className="text-lg hover:text-blue-500">Keunggulan</a>
          </Link>
          <Link href="#testimoni">
            <a className="text-lg hover:text-blue-500">Testimoni</a>
          </Link>
          <Link href="#contact">
            <a className="text-lg hover:text-blue-500">Kontak</a>
          </Link>
        </div>

        {/* Menu Burger (Mobile) */}
        <div className="md:hidden flex items-center">
          <button
            className="text-white focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Menu Mobile */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gray-800 text-white py-4 px-6 space-y-4">
          <Link href="#hero">
            <a className="text-lg hover:text-blue-500" onClick={() => setIsMobileMenuOpen(false)}>Home</a>
          </Link>
          <Link href="#keunggulan">
            <a className="text-lg hover:text-blue-500" onClick={() => setIsMobileMenuOpen(false)}>Keunggulan</a>
          </Link>
          <Link href="#testimoni">
            <a className="text-lg hover:text-blue-500" onClick={() => setIsMobileMenuOpen(false)}>Testimoni</a>
          </Link>
          <Link href="#contact">
            <a className="text-lg hover:text-blue-500" onClick={() => setIsMobileMenuOpen(false)}>Kontak</a>
          </Link>
        </div>
      )}
    </nav>
  );
}

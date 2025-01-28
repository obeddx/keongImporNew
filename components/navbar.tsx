// components/Navbar.tsx
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-gray-900 text-white fixed w-full top-0 left-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-6 flex items-center">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <Link href="/" className="hover:text-blue-500">
            PT. KEONG SUMBER MAKMUR
          </Link>
        </div>

        {/* Menu */}
        <div className="ml-auto space-x-6">
          <Link href="/" className="hover:text-blue-500">
            Home
          </Link>
          <Link href="/Products" className="hover:text-blue-500">
            Products
          </Link>
          <Link href="/aboutUs" className="hover:text-blue-500">
            About Us
          </Link>
          <Link href="/contact" className="hover:text-blue-500">
            Contact
          </Link>
        </div>

        {/* Tombol CTA */}
        <Link href="#products" className="ml-6 hidden md:inline-block px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700">
          Pelajari Lebih Lanjut
        </Link>
      </div>
    </nav>
  );
}

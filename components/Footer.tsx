import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react"; // Ikon Lucide untuk media sosial
import Image from "next/image"; // Import komponen Image dari next/image
import Link from "next/link"; // Import Link dari Next.js

export default function Footer() {
  return (
    <>
      <footer className="bg-gray-900 text-white py-10 relative">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Kontak Perusahaan */}
            <div className="flex items-center space-x-4">
              {/* Logo PT */}
              <div className="w-100 h-100">
                <Image
                  src="/logoPT.jpeg" // Ganti dengan path gambar logo PT Anda
                  alt="Logo PT"
                  width={300}
                  height={300}
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">Kontak Kami</h3>
                <ul className="space-y-2 text-gray-400">
                  <li>
                    <strong>Alamat:</strong> Jl Terboyo Industri gang 5 no G 35 Trimulyo, Genuk, Kota Semarang
                  </li>
                  <li>
                    <p className="text-gray-300 mb-2">
                      <strong>Email:</strong>{" "}
                      <Link
                        href="mailto:keongsumbermakmur@aol.com"
                        className="text-blue-500 hover:text-blue-700"
                      >
                        keongsumbermakmur@aol.com
                      </Link>
                    </p>
                  </li>
                  <li>
                    <p className="text-gray-300 mb-2">
                      <strong>Telepon:</strong>{" "}
                      <Link
                        href="https://wa.me/628123279332"
                        className="text-blue-500 hover:text-blue-700"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        +628123279332
                      </Link>
                    </p>
                  </li>
                </ul>
              </div>
            </div>

            {/* Tautan Halaman Utama */}
            <div>
              <h3 className="text-xl font-semibold mb-4 px-32">Halaman</h3>
              <ul className="space-y-2 text-gray-400 px-32">
                <li>
                  <Link href="#home" className="hover:text-white">Beranda</Link>
                </li>
                <li>
                  <Link href="/Products" className="hover:text-white">Produk</Link>
                </li>
                <li>
                  <Link href="/aboutUs" className="hover:text-white">Tentang Kami</Link>
                </li>
                <li>
                  <Link href="#contact" className="hover:text-white">Kontak</Link>
                </li>
              </ul>
            </div>

            {/* Ikon Sosial Media */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Ikuti Kami</h3>
              <div className="flex space-x-6 text-gray-400">
                <Link
                  href="https://www.facebook.com/keongsm"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white"
                >
                  <Facebook size={24} />
                </Link>
                <Link
                  href="https://twitter.com/keongsm"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white"
                >
                  <Twitter size={24} />
                </Link>
                <Link
                  href="https://www.instagram.com/keongsumbermakmur/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white"
                >
                  <Instagram size={24} />
                </Link>
                <Link
                  href="https://www.linkedin.com/company/keongsm"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white"
                >
                  <Linkedin size={24} />
                </Link>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-10 text-center text-gray-400">
            <p>© 2025 PT. KEONG SUMBER MAKMUR. All rights reserved.</p>
          </div>
        </div>

        {/* Ikon WhatsApp Live Chat */}
        <div className="fixed bottom-5 right-5">
          <Link
            href="https://wa.me/628123279332?text=Halo,%20saya%20ingin%20bertanya%20tentang%20produk%20Anda."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-400 via-green-500 to-green-600 text-white rounded-full shadow-xl hover:scale-110 transition-transform duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              className="w-10 h-10"
              fill="currentColor"
            >
              <path d="M16 0C7.163 0 0 7.163 0 16c0 3.162.922 6.106 2.512 8.607L.002 32l7.51-2.47A15.899 15.899 0 0016 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm8.356 23.5c-.365.73-1.802 1.36-2.525 1.426-.674.06-1.456.085-2.322-.074-4.086-.765-7.564-4.46-7.835-4.693-.27-.235-1.863-1.865-1.863-3.568 0-1.702.932-2.532 1.26-2.872.328-.34.72-.424.965-.424.245 0 .491.002.706.013.23.012.54-.086.845.64.305.726 1.08 2.482 1.175 2.659.095.177.155.38.03.613-.124.233-.186.378-.366.582-.182.204-.384.457-.548.613-.16.156-.326.33-.14.647.186.317.827 1.363 1.777 2.225 1.224 1.108 2.256 1.445 2.572 1.61.316.165.498.143.681-.048.184-.192.787-.894 1-1.2.214-.307.428-.257.727-.154.298.102 1.872.883 2.19 1.04.316.158.527.23.607.36.08.13.08.75-.286 1.48z" />
            </svg>
          </Link>
        </div>
      </footer>
    </>
  );
}

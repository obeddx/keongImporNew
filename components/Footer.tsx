// import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react"; // Ikon Lucide untuk media sosial

// export default function Footer() {
//   return (
//     <footer className="bg-gray-900 text-white py-10">
//       <div className="container mx-auto px-6">
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//           {/* Kontak Perusahaan */}
//           <div>
//             <h3 className="text-xl font-semibold mb-4">Kontak Kami</h3>
//             <ul className="space-y-2 text-gray-400">
//               <li>
//                 <strong>Alamat:</strong> Jl Terboyo Industri gang 5 no G 35 Trimulyo, Genuk, Kota Semarang
//               </li>
//               <li>
//               <p className="text-gray-300 mb-2">
//                <strong>Email:</strong>{" "}
//                <a href="https://mail.google.com/mail/?view=cm&fs=1&to=keongsumbermakmur@aol.com&su=Subjek%20Email&body=Isi%20Pesan" className="text-blue-500 hover:text-blue-700" target="_blank" rel="noopener noreferrer">
//                 keongsumbermakmur@aol.com
//                </a>
//               </p>
//               </li>
//               <li>
//               <p className="text-gray-300 mb-2">
//               <strong>Telepon:</strong>{" "}
//               <a href="https://wa.me/628123279332" className="text-blue-500 hover:text-blue-700" target="_blank" rel="noopener noreferrer">
//               +628123279332
//               </a>
//               </p>
//               </li>
//             </ul>
//           </div>

//           {/* Tautan Halaman Utama */}
//           <div>
//             <h3 className="text-xl font-semibold mb-4">Halaman</h3>
//             <ul className="space-y-2 text-gray-400">
//               <li>
//                 <a href="#home" className="hover:text-white">Beranda</a>
//               </li>
//               <li>
//                 <a href="#products" className="hover:text-white">Produk</a>
//               </li>
//               <li>
//                 <a href="#about" className="hover:text-white">Tentang Kami</a>
//               </li>
//               <li>
//                 <a href="#contact" className="hover:text-white">Kontak</a>
//               </li>
//             </ul>
//           </div>

//           {/* Ikon Sosial Media */}
//           <div>
//             <h3 className="text-xl font-semibold mb-4">Ikuti Kami</h3>
//             <div className="flex space-x-6 text-gray-400">
//               <a
//                 href="https://www.facebook.com/keongsm"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="hover:text-white"
//               >
//                 <Facebook size={24} />
//               </a>
//               <a
//                 href="https://twitter.com/keongsm"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="hover:text-white"
//               >
//                 <Twitter size={24} />
//               </a>
//               <a
//                 href="https://www.instagram.com/keongsm"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="hover:text-white"
//               >
//                 <Instagram size={24} />
//               </a>
//               <a
//                 href="https://www.linkedin.com/company/keongsm"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="hover:text-white"
//               >
//                 <Linkedin size={24} />
//               </a>
//             </div>
//           </div>
//         </div>

//         {/* Copyright */}
//         <div className="mt-10 text-center text-gray-400">
//           <p>© 2025 PT. KEONG SUMBER MAKMUR. All rights reserved.</p>
//         </div>
//       </div>
//     </footer>
//   );
// }

import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react"; // Ikon Lucide untuk media sosial
import Image from "next/image"; // Import komponen Image dari next/image

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-10">
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
                    <a
                      href="https://mail.google.com/mail/?view=cm&fs=1&to=keongsumbermakmur@aol.com&su=Subjek%20Email&body=Isi%20Pesan"
                      className="text-blue-500 hover:text-blue-700"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      keongsumbermakmur@aol.com
                    </a>
                  </p>
                </li>
                <li>
                  <p className="text-gray-300 mb-2">
                    <strong>Telepon:</strong>{" "}
                    <a
                      href="https://wa.me/628123279332"
                      className="text-blue-500 hover:text-blue-700"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      +628123279332
                    </a>
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
                <a href="#home" className="hover:text-white">Beranda</a>
              </li>
              <li>
                <a href="/Products" className="hover:text-white">Produk</a>
              </li>
              <li>
                <a href="/aboutUs" className="hover:text-white">Tentang Kami</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white">Kontak</a>
              </li>
            </ul>
          </div>

          {/* Ikon Sosial Media */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Ikuti Kami</h3>
            <div className="flex space-x-6 text-gray-400">
              <a
                href="https://www.facebook.com/share/1B8jekjJm7/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                <Facebook size={24} />
              </a>
              <a
                href="https://twitter.com/keongsm"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                <Twitter size={24} />
              </a>
              <a
                href="https://www.instagram.com/keongsumbermakmur/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                <Instagram size={24} />
              </a>
              <a
                href="https://www.linkedin.com/company/keongsm"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                <Linkedin size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-10 text-center text-gray-400">
          <p>© 2025 PT. KEONG SUMBER MAKMUR. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

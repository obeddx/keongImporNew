"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { client } from "../lib/sanityClient"; // Impor dari lib/sanityClient.ts
import { urlFor } from "../lib/imageUrlBuilder";

const ProductPage = () => {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    // Mengambil data produk dari Sanity
    client
      .fetch('*[_type == "product"]') // Ambil semua produk
      .then((data) => setProducts(data))
      .catch((error) => console.error(error));
  }, []);

  const handleViewDetails = (id: string) => {
    // Navigasi ke detail produk
    const newUrl = `/Products/${id}`;
    window.location.href = newUrl;
  };

  const handleContactOffer = (productName: string) => {
    // Navigasi ke halaman kontak dengan subject
    const newUrl = `/contact?subject=Hubungi untuk Penawaran: ${encodeURIComponent(
      productName
    )}`;
    window.location.href = newUrl;
  };

  return (
    <div className="py-20 mt-25 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 min-h-screen">
      <h1 className="text-3xl md:text-4xl font-bold text-center mt-10 mb-12 text-white">
        Products
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto">
        {products.length > 0 ? (
          products.map((product) => (
            <div
              key={product._id}
              className="flex flex-col bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition transform hover:scale-105 overflow-hidden min-h-[400px]" // Mengatur min-height untuk card
            >
              <div className="w-full h-2/3">
                <img
                  src={urlFor(product.image).url()} // Generate URL dari image asset
                  alt={product.name}
                  className="w-full h-full object-cover" // Mengatur gambar untuk mengisi card dengan proporsional
                />
              </div>
              <div className="p-4 flex flex-col justify-between flex-grow"> {/* Menggunakan flex-grow agar card memanjang */}
                <div>
                  <h2 className="text-lg font-semibold text-white">{product.name}</h2>
                  <p className="text-sm text-gray-300 mt-2">{product.description}</p>
                </div>
                <div className="flex flex-col space-y-2 mt-4">
                  <button
                    onClick={() => handleViewDetails(product._id)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => handleContactOffer(product.name)}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                  >
                    Hubungi untuk Penawaran
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-white text-center">No products found.</p>
        )}
      </div>
    </div>
  );
};

export default ProductPage;

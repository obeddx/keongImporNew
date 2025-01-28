"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";  // Menggunakan useRouter untuk navigasi
import { client } from "../../lib/sanityClient"; // Impor dari lib/sanityClient.ts
import { urlFor } from "../../lib/imageUrlBuilder";

const ProductDetail = () => {
  const [product, setProduct] = useState<any | null>(null);
  const { id } = useParams(); // Mengambil id dari URL menggunakan useParams
  const router = useRouter(); // Inisialisasi useRouter untuk navigasi

  useEffect(() => {
    if (id) {
      client
        .fetch(`*[_type == "product" && _id == "${id}"]`) // Ambil produk berdasarkan id
        .then((data) => setProduct(data[0]))
        .catch((error) => console.error(error));
    }
  }, [id]);

  if (!product) return <div>Loading...</div>;

  return (
    <div className="py-20 mt-25 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 min-h-screen">
      <h1 className="text-3xl md:text-4xl font-bold text-center mt-10 mb-12 text-white">
        Details Product
      </h1>
      <div className="p-6 md:p-10 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 min-h-screen text-white">
        <div className="max-w-5xl mx-auto bg-gray-800 rounded-lg shadow-xl overflow-hidden">
          <div className="flex flex-col md:flex-row">
            {/* Gambar Produk */}
            <div className="w-full md:w-1/2">
              <img
                src={urlFor(product.image).url()} // Generate URL dari image asset
                alt={product.name}
                className="w-full h-full object-contain"
              />
            </div>
            {/* Detail Produk */}
            <div className="w-full md:w-1/2 p-6 flex flex-col justify-between">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-4">{product.name}</h1>
                <p className="text-gray-300 mb-6">{product.description}</p>
                <ul className="space-y-3">
                  <li>
                    <span className="font-semibold">Size:</span> {product.size}
                  </li>
                  <li>
                    <span className="font-semibold">Weight:</span> {product.weight}
                  </li>
                  <li>
                    <span className="font-semibold">Packaging:</span> {product.packaging}
                  </li>
                  <li>
                    <span className="font-semibold">Certification:</span> {product.certification}
                  </li>
                </ul>
              </div>
              {/* Tombol Kembali */}
              <button
                onClick={() => router.push("/Products")} // Navigasi ke halaman products
                className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              >
                Kembali ke Produk
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

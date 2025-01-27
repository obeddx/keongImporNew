"use client";

import React from "react";
import { useRouter } from "next/navigation";

const products = [
  {
    id: 1,
    name: "Frozen Snail Meat",
    description: "This is a short description of product 1.",
    image: "/image-4.png",
  },
  {
    id: 2,
    name: "Canned Snail Meat",
    description: "This is a short description of product 2.",
    image: "/canned-snail.jpg",
  },
  {
    id: 3,
    name: "Product 3",
    description: "This is a short description of product 3.",
    image: "/frozen-snail.jpeg",
  },
  {
    id: 4,
    name: "Product 4",
    description: "This is a short description of product 4.",
    image: "/lane-snail.jpg",
  },
];

const ProductPage = () => {
  const router = useRouter();

  const handleViewDetails = (id: number) => {
    router.push(`/Products/${id}`);
  };

  const handleContactOffer = (productName: string) => {
    router.push(`/contact?subject=Hubungi untuk Penawaran: ${encodeURIComponent(productName)}`);
  };

  return (
    <div className="py-20 mt-25 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900">
      <h1 className="text-3xl md:text-4xl font-bold text-center mt-10 mb-12 text-white">
        Products
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="flex bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition transform hover:scale-105 overflow-hidden"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-1/2 h-auto object-cover rounded-l-lg"
            />
            <div className="p-4 flex flex-col justify-between w-1/2">
              <div>
                <h2 className="text-lg font-semibold text-white">
                  {product.name}
                </h2>
                <p className="text-sm text-gray-300 mt-2">
                  {product.description}
                </p>
              </div>
              <div className="flex flex-col space-y-2 mt-4">
                <button
                  onClick={() => handleViewDetails(product.id)}
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
        ))}
      </div>
    </div>
  );
};

export default ProductPage;
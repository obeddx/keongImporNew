"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { client } from "../lib/sanityClient";
import { urlFor } from "../lib/imageUrlBuilder";

const ProductPage = () => {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    client
      .fetch('*[_type == "product"]')
      .then((data) => setProducts(data))
      .catch((error) => console.error(error));
  }, []);

  const handleViewDetails = (id: string) => {
    window.location.href = `/Products/${id}`;
  };

  const handleContactOffer = (productName: string) => {
    window.location.href = `/contact?subject=Hubungi untuk Penawaran: ${encodeURIComponent(productName)}`;
  };

  return (
    <div className="py-20 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 min-h-screen pt-32"> {/* Tambahkan padding-top untuk menghindari navbar */}
      <motion.h1 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl font-bold text-center mb-12 text-white"
      >
        Products
      </motion.h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-7xl mx-auto px-6">
        {products.length > 0 ? (
          products.map((product, index) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="bg-gray-800 rounded-lg shadow-lg overflow-hidden flex flex-col transform transition-all hover:shadow-2xl"
            >
              <div className="w-full h-64">
                <img
                  src={urlFor(product.image).url()}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 flex flex-col justify-between flex-grow">
                <h2 className="text-lg font-semibold text-white">{product.name}</h2>
                <p className="text-sm text-gray-400 mt-2">{product.description}</p>
                <div className="flex flex-col mt-4 space-y-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleViewDetails(product._id)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                  >
                    View Details
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleContactOffer(product.name)}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                  >
                    Hubungi untuk Penawaran
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <p className="text-white text-center w-full">No products found.</p>
        )}
      </div>
    </div>
  );
};

export default ProductPage;

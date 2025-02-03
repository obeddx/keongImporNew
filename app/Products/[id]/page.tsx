"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { client } from "../../lib/sanityClient";
import { urlFor } from "../../lib/imageUrlBuilder";
import { motion } from "framer-motion";
import { useTheme } from "@/components/ThemeContext"; // Path absolut (benar)

const ProductDetail = () => {
  const [product, setProduct] = useState<any | null>(null);
  const [certificationUrl, setCertificationUrl] = useState<string | null>(null);
  const { id } = useParams();
  const router = useRouter();
  const { isDarkMode, toggleTheme } = useTheme(); // Menggunakan themeContext

  useEffect(() => {
    if (id) {
      client
        .fetch(
          `*[_type == "product" && _id == $id]{name, description, image, size, weight, packaging, certification{asset->{url}}}`,
          { id }
        )
        .then((data) => {
          const productData = data[0];
          setProduct(productData);
          if (productData?.certification?.asset?.url) {
            setCertificationUrl(productData.certification.asset.url);
          }
        })
        .catch((error) => {
          console.error("Error fetching product data:", error);
        });
    }
  }, [id]);

  if (!product) return <div>Loading...</div>;

  const handleDownloadCertification = () => {
    if (certificationUrl) {
      const newTab = window.open(certificationUrl, "_blank");
      if (!newTab) {
        alert("Failed to open certification URL.");
      }
    } else {
      alert("No certification available.");
    }
  };

  return (
    <motion.div
      className={`py-20 mt-25 min-h-screen transition-colors duration-300 ${
        isDarkMode ? "bg-gray-900 text-gray-200" : "bg-white text-gray-900"
      }`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Tombol Toggle Dark/Light Mode */}
      <button
        onClick={toggleTheme}
        className={`absolute top-4 right-4 px-4 py-2 rounded-md text-sm font-semibold transition-colors duration-300 ${
          isDarkMode ? "bg-gray-700 text-white" : "bg-gray-300 text-gray-900"
        }`}
      >
        {isDarkMode ? "Light Mode ☀️" : "Dark Mode 🌙"}
      </button>

      <motion.h1
        className="text-3xl md:text-4xl font-bold text-center mt-20 mb-12"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Product Details
      </motion.h1>

      <div
        className={`p-6 md:p-10 min-h-screen transition-colors duration-300 ${
          isDarkMode ? "bg-gray-900 text-gray-200" : "bg-white text-gray-900"
        }`}
      >
        <div
          className={`max-w-5xl mx-auto rounded-lg shadow-xl overflow-hidden transition-colors duration-300 ${
            isDarkMode ? "bg-gray-800 text-gray-300" : "bg-gray-100 text-gray-900"
          }`}
        >
          <div className="flex flex-col md:flex-row">
            <motion.div
              className="w-full md:w-1/2"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <img
                src={urlFor(product.image).url()}
                alt={product.name}
                className="w-full h-full object-contain"
              />
            </motion.div>
            <motion.div
              className="w-full md:w-1/2 p-6 flex flex-col justify-between"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-4">{product.name}</h1>
                <p className="mb-6">{product.description}</p>
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
                    <span className="font-semibold">Certification:</span>
                    {certificationUrl ? (
                      <button
                        onClick={handleDownloadCertification}
                        className="text-blue-500 hover:underline mt-2 transition-all duration-300 ease-in-out transform hover:scale-105"
                      >
                        Download Certification
                      </button>
                    ) : (
                      <span className="text-gray-400">No certification available</span>
                    )}
                  </li>
                </ul>
              </div>
              <motion.button
                onClick={() => router.push("/Products")}
                className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition transform hover:scale-105"
                whileHover={{ scale: 1.05 }}
              >
                Back to Products
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductDetail;

"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { client } from "../../lib/sanityClient";
import { urlFor } from "../../lib/imageUrlBuilder";

const ProductDetail = () => {
  const [product, setProduct] = useState<any | null>(null);
  const [certificationUrl, setCertificationUrl] = useState<string | null>(null);
  const { id } = useParams(); // Get the product ID from URL
  const router = useRouter(); // Initialize router

  useEffect(() => {
    if (id) {
      // Fetch product data by ID
      client
        .fetch(
          `*[_type == "product" && _id == $id]{name, description, image, size, weight, packaging, certification{asset->{url}}}`
          , { id } // Pass ID as parameter to the query
        )
        .then((data) => {
          const productData = data[0];
          setProduct(productData);

          // Check if the certification exists and has an asset URL
          if (productData?.certification?.asset?.url) {
            setCertificationUrl(productData.certification.asset.url);
          }
        })
        .catch((error) => {
          console.error("Error fetching product data:", error);
        });
    }
  }, [id]);

  if (!product) return <div>Loading...</div>; // Display loading state

  const handleDownloadCertification = () => {
    if (certificationUrl) {
      // Open certification URL in a new tab
      const newTab = window.open(certificationUrl, "_blank");
      if (!newTab) {
        alert("Failed to open certification URL.");
      }
    } else {
      alert("No certification available.");
    }
  };

  return (
    <div className="py-20 mt-25 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 min-h-screen">
      <h1 className="text-3xl md:text-4xl font-bold text-center mt-10 mb-12 text-white">
        Product Details
      </h1>
      <div className="p-6 md:p-10 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 min-h-screen text-white">
        <div className="max-w-5xl mx-auto bg-gray-800 rounded-lg shadow-xl overflow-hidden">
          <div className="flex flex-col md:flex-row">
            {/* Product Image */}
            <div className="w-full md:w-1/2">
              <img
                src={urlFor(product.image).url()} // Generate image URL
                alt={product.name}
                className="w-full h-full object-contain"
              />
            </div>
            {/* Product Details */}
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
                    <span className="font-semibold">Certification:</span>
                    {certificationUrl ? (
                      <button
                        onClick={handleDownloadCertification} // Trigger to open in a new tab
                        className="text-blue-500 hover:underline mt-2"
                      >
                         Download Certification
                      </button>
                    ) : (
                      <span className="text-gray-400">No certification available</span>
                    )}
                  </li>
                </ul>
              </div>
              {/* Back Button */}
              <button
                onClick={() => router.push("/Products")} // Navigate back to products list
                className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              >
                Back to Products
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

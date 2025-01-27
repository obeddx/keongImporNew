import React from "react";

const ProductDetail = ({ params }: { params: { id: string } }) => {
  const productDetails = {
    id: 1,
    name: "Frozen Snail Meat",
    image: "/image-4.png",
    type: "Seafood",
    size: "500g",
    weight: "500g",
    packaging: "Vacuum Sealed",
    certification: "/certification.pdf",
    description:
      "Frozen Snail Meat is a premium seafood product that is carefully prepared and frozen to preserve its natural taste and nutrients. Perfect for gourmet cooking or casual dining.",
  };

  return (
    <div className="p-6 md:p-10 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 min-h-screen text-white">
      <div className="max-w-5xl mx-auto bg-gray-800 rounded-lg shadow-xl overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Product Image */}
          <div className="w-full md:w-1/2">
            <img
              src={productDetails.image}
              alt={productDetails.name}
              className="w-full h-full object-cover"
            />
          </div>
          {/* Product Details */}
          <div className="w-full md:w-1/2 p-6 flex flex-col justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                {productDetails.name}
              </h1>
              <p className="text-gray-300 mb-6">{productDetails.description}</p>
              <ul className="space-y-3">
                <li>
                  <span className="font-semibold">Type:</span> {productDetails.type}
                </li>
                <li>
                  <span className="font-semibold">Size:</span> {productDetails.size}
                </li>
                <li>
                  <span className="font-semibold">Weight:</span> {productDetails.weight}
                </li>
                <li>
                  <span className="font-semibold">Packaging:</span>{" "}
                  {productDetails.packaging}
                </li>
              </ul>
            </div>
            <div className="mt-6">
              <a
                href={productDetails.certification}
                download
                className="inline-block px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition"
              >
                Download Certification
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

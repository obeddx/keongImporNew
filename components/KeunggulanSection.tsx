import Image from "next/image";
import { Star, Lightbulb, Leaf } from "lucide-react"; // Import ikon dari Lucide React

const KeunggulanSection = () => {
  return (
    <section className="mb-16 py-10">
      <h2 className="text-2xl font-semibold mb-4">Keunggulan Kami</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Kualitas Premium */}
        <div className="group bg-gray-800 p-6 rounded-lg shadow-lg relative">
          <div className="flex items-center mb-2">
            <Star className="text-yellow-400 w-6 h-6 mr-2" />
            <h3 className="text-xl font-semibold">Kualitas Premium</h3>
          </div>
          <p className="text-gray-300">
            Produk kami melewati berbagai tahapan kontrol kualitas untuk memastikan kepuasan pelanggan.
          </p>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Image
              src="/aboutUs5.jpeg"
              alt="Kualitas Premium"
              width={800}
              height={800}
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>

        {/* Inovasi */}
        <div className="group bg-gray-800 p-6 rounded-lg shadow-lg relative">
          <div className="flex items-center mb-2">
            <Lightbulb className="text-blue-400 w-6 h-6 mr-2" />
            <h3 className="text-xl font-semibold">Inovasi</h3>
          </div>
          <p className="text-gray-300">
            Kami terus berinovasi untuk menghadirkan produk yang sesuai dengan kebutuhan pasar.
          </p>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Image
              src="/aboutUs2.jpg"
              alt="Inovasi"
              width={800}
              height={800}
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>

        {/* Keberlanjutan */}
        <div className="group bg-gray-800 p-6 rounded-lg shadow-lg relative">
          <div className="flex items-center mb-2">
            <Leaf className="text-green-400 w-6 h-6 mr-2" />
            <h3 className="text-xl font-semibold">Keberlanjutan</h3>
          </div>
          <p className="text-gray-300">
            Kami mengutamakan praktik ramah lingkungan dalam setiap tahap produksi.
          </p>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Image
              src="/aboutUs3.jpg"
              alt="Keberlanjutan"
              width={800}
              height={800}
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default KeunggulanSection;

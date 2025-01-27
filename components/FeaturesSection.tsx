import { Star, CheckCircle, ShieldCheck } from "lucide-react"; // Lucide untuk ikon (Tailwind friendly)

export default function FeaturesSection() {
  const features = [
    {
      icon: <Star size={36} className="text-yellow-500" />,
      title: "Produk Berkualitas",
      description: "Keong Escargot diproses dengan standar kualitas tinggi untuk kepuasan Anda.",
      buttonText: "Pelajari Lebih Lanjut", // Teks tombol
      buttonLink: "#product-quality", // Link tombol (bisa disesuaikan)
    },
    {
      icon: <CheckCircle size={36} className="text-green-500" />,
      title: "Pengiriman Cepat",
      description: "Kami menjamin pengiriman yang tepat waktu ke seluruh wilayah.",
      buttonText: "Pelajari Lebih Lanjut",
      buttonLink: "#fast-shipping", // Link tombol
    },
    {
      icon: <ShieldCheck size={36} className="text-blue-500" />,
      title: "Keamanan Terjamin",
      description: "Produk kami higienis dan aman dikonsumsi dengan sertifikasi resmi.",
      buttonText: "Pelajari Lebih Lanjut",
      buttonLink: "#product-safety", // Link tombol
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Keunggulan Kami
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center bg-gray-800 rounded-lg p-6 text-center shadow-md hover:shadow-xl transition transform hover:scale-105"
            >
              <div>{feature.icon}</div>
              <h3 className="text-xl font-semibold mt-4">{feature.title}</h3>
              <p className="mt-2 text-gray-400">{feature.description}</p>
              {/* Tombol ditambahkan di sini */}
              <a
                href={feature.buttonLink}
                className="mt-6 inline-block px-6 py-3 bg-blue-600 text-white rounded-lg text-lg font-semibold transition transform hover:bg-blue-700 hover:scale-105"
              >
                {feature.buttonText}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import Link from "next/link";
import { notFound } from "next/navigation";

interface Article {
  id: string;
  title: string;
  content: string;
  image?: string;
  publishedAt: string;
}

const articles: Article[] = [
  {
    id: "1",
    title: "Artikel Pertama",
    content:
      "Ini adalah konten lengkap dari Artikel Pertama. Bisa berisi teks panjang, gambar, atau media lainnya.",
    image: "/aboutUs4.jpg",
    publishedAt: "2024-02-01",
  },
  {
    id: "2",
    title: "Artikel Kedua",
    content:
      "Ini adalah konten lengkap dari Artikel Kedua. Bisa berisi teks panjang, gambar, atau media lainnya.",
    image: "/aboutUs2.jpg",
    publishedAt: "2024-02-02",
  },
  {
    id: "3",
    title: "Artikel Ketiga",
    content:
      "Ini adalah konten lengkap dari Artikel Ketiga. Bisa berisi teks panjang, gambar, atau media lainnya.",
    image: "/aboutUs1.jpg",
    publishedAt: "2024-02-03",
  },
];

export default function ArticleDetail({ params }: { params: { id: string } }) {
  const article = articles.find((a) => a.id === params.id);

  if (!article) {
    return notFound();
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-r from-blue-400 to-purple-600 text-white pt-32 pb-32 mt-16">
      <div className="max-w-2xl w-full p-8 bg-white shadow-xl rounded-lg text-gray-900 transform transition duration-500 hover:scale-105">
        <h1 className="text-4xl font-extrabold mb-6 text-center">{article.title}</h1>
        <p className="text-gray-500 text-center mb-4">Diterbitkan pada: {article.publishedAt}</p>
        {article.image && (
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-72 object-cover rounded-lg mb-6 shadow-lg"
          />
        )}
        <p className="text-gray-700 text-lg leading-relaxed">{article.content}</p>
        <div className="mt-8 flex justify-center">
          <Link
            href="/article"
            className="px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition transform hover:scale-105 shadow-lg"
          >
            Kembali ke Daftar Artikel
          </Link>
        </div>
      </div>
    </div>
  );
}

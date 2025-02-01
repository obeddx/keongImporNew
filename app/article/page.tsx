"use client";

import Link from "next/link";

interface Article {
  id: string;
  title: string;
  excerpt: string;
  thumbnail?: string;
  publishedAt: string;
}

const articles: Article[] = [
  {
    id: "1",
    title: "Artikel Pertama",
    excerpt: "Ringkasan artikel pertama...",
    thumbnail: "/aboutUs4.jpg",
    publishedAt: "2024-02-01",
  },
  {
    id: "2",
    title: "Artikel Kedua",
    excerpt: "Ringkasan artikel kedua...",
    thumbnail: "/aboutUs2.jpg",
    publishedAt: "2024-02-02",
  },
  {
    id: "3",
    title: "Artikel Ketiga",
    excerpt: "Ringkasan artikel ketiga...",
    thumbnail: "/aboutUs1.jpg",
    publishedAt: "2024-02-03",
  },
];

export default function ArticlesPage() {
  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 pt-24 pb-20">
      <div className="max-w-4xl w-full p-8 bg-white shadow-2xl rounded-xl mt-16 mb-16">
        <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-800">
          📚 Daftar Artikel Terbaru
        </h1>
        <p className="text-center text-gray-600 text-lg mb-6">
          Temukan berbagai artikel menarik yang bisa memperluas wawasan Anda!
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {articles.map((article) => (
            <Link key={article.id} href={`/article/${article.id}`}>
              <div className="border rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition cursor-pointer bg-white hover:scale-105 transform duration-300">
                {article.thumbnail && (
                  <div className="relative">
                    <img
                      src={article.thumbnail}
                      alt={article.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-black opacity-0 hover:opacity-30 transition-opacity duration-300"></div>
                  </div>
                )}
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">{article.title}</h2>
                  <p className="text-gray-600 text-md">{article.excerpt}</p>
                  <p className="text-sm text-gray-500 mt-3">🗓 Diterbitkan: {article.publishedAt}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

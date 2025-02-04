"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { client } from "../../lib/sanityClient";
import { urlFor } from "../../lib/imageUrlBuilder";
import { PortableText, PortableTextBlock } from "@portabletext/react";
import { motion } from "framer-motion";
import { useTheme } from "@/components/ThemeContext";
import Image from "next/image";

interface Article {
  title: string;
  content: PortableTextBlock[];
  image?: { asset?: { _ref: string } } | null;
  publishedAt: string;
}

const ArticleDetail = () => {
  const [article, setArticle] = useState<Article | null>(null);
  const params = useParams();
  const router = useRouter();
  const { isDarkMode } = useTheme();

  useEffect(() => {
    if (params?.id) {
      client
        .fetch(
          "*[_type == 'article' && _id == $id]{title, content, image, publishedAt}",
          { id: params.id }
        )
        .then((data) => setArticle(data[0] || null))
        .catch((error) => console.error("Error fetching article data:", error));
    }
  }, [params?.id]);

  if (!article) return <div className="text-center">Loading...</div>;

  // ✅ Pastikan `urlFor()` hanya dipanggil jika `article.image?.asset?._ref` tersedia
  const imageUrl = article.image?.asset?._ref
    ? urlFor(article.image.asset).url()
    : "/placeholder.jpg";

  return (
    <motion.div
      className={`mt-20 pt-32 py-20 min-h-screen ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div
        className={`max-w-4xl mx-auto rounded-lg shadow-lg overflow-hidden ${
          isDarkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-black"
        }`}
      >
        {/* ✅ Pastikan `src` adalah string yang valid */}
        {article.image?.asset?._ref && (
          <div className="w-full h-64 relative">
            <Image
              src={imageUrl}
              alt={article.title}
              layout="fill"
              objectFit="cover"
            />
          </div>
        )}
        <div className="p-8">
          <motion.h1
            className="text-3xl font-bold mb-4"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {article.title}
          </motion.h1>
          <p className="text-sm mb-6">
            {new Date(article.publishedAt).toLocaleDateString()}
          </p>
          <div className="leading-relaxed">
            {article.content && article.content.length > 0 ? (
              <PortableText value={article.content} />
            ) : (
              <p>No content available.</p>
            )}
          </div>
          <motion.button
            onClick={() => router.push("/article")}
            className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition transform hover:scale-105"
            whileHover={{ scale: 1.05 }}
          >
            Back to Articles
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ArticleDetail;

"use client";

import React, { useEffect, useState } from "react";
import { client } from "../lib/sanityClient";
import { urlFor } from "../lib/imageUrlBuilder";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useTheme } from '@/components/ThemeContext';

const generateExcerpt = (content: string, wordLimit: number = 10) => {
  const words = content.split(" ");
  if (words.length <= wordLimit) {
    return content;
  }
  return words.slice(0, wordLimit).join(" ") + "...";
};

const ArticlePage = () => {
  const { isDarkMode } = useTheme();
  const [articles, setArticles] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [articlesPerPage] = useState(6);
  const router = useRouter();

  useEffect(() => {
    client
      .fetch("*[_type == 'article']{_id, title, content, image, publishedAt}")
      .then((data) => setArticles(data))
      .catch((error) => console.error(error));
  }, []);

  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle);
  const totalPages = Math.ceil(articles.length / articlesPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className={`py-20 min-h-screen pt-32 flex justify-center items-center ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      <motion.div
        className={`p-10 rounded-lg shadow-2xl max-w-6xl w-full ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl font-bold text-center mb-8">Latest Articles</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentArticles.map((article) => {
            const excerpt = generateExcerpt(article.content[0].children.map((block: any) => block.text).join(" "), 10);
            return (
              <motion.div
                key={article._id}
                className={`rounded-lg shadow-lg overflow-hidden cursor-pointer transform transition-all hover:scale-105 ${isDarkMode ? 'bg-gray-700' : 'bg-white'}`}
                whileHover={{ scale: 1.05 }}
                onClick={() => router.push(`/article/${article._id}`)}
              >
                {article.image && (
                  <img
                    src={urlFor(article.image).url()}
                    alt={article.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-6">
                  <h2 className="text-lg font-semibold">{article.title}</h2>
                  <p className="text-sm mt-2">{excerpt}</p>
                  {article.publishedAt && (
                    <p className="text-xs mt-4">
                      {new Date(article.publishedAt).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
        <div className="mt-8 flex justify-between items-center">
          <button
            onClick={prevPage}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-500"
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <p>
            Page {currentPage} of {totalPages}
          </p>
          <button
            onClick={nextPage}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-500"
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ArticlePage;

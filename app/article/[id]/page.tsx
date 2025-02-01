"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { client } from "../../lib/sanityClient";
import { urlFor } from "../../lib/imageUrlBuilder";
import { PortableText } from "@portabletext/react";
import { motion } from "framer-motion";

const ArticleDetail = () => {
  const [article, setArticle] = useState<any | null>(null);
  const { id } = useParams();
  const router = useRouter();

  useEffect(() => {
    if (id) {
      client
        .fetch(
          "*[_type == 'article' && _id == $id]{title, content, image, video, publishedAt}",
          { id }
        )
        .then((data) => setArticle(data[0]))
        .catch((error) => console.error("Error fetching article data:", error));
    }
  }, [id]);

  if (!article) return <div className="text-white text-center">Loading...</div>;

  const videoUrl = article.video?.asset?.url; // Ambil URL video dari field video

  return (
    <motion.div
      className="pt-20 py-20 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-4xl mx-auto bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <img
          src={urlFor(article.image).url()}
          alt={article.title}
          className="w-full h-64 object-cover"
        />
        <div className="p-8">
          <motion.h1
            className="text-3xl font-bold text-white mb-4"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {article.title}
          </motion.h1>
          <p className="text-sm text-gray-400 mb-6">
            {new Date(article.publishedAt).toLocaleDateString()}
          </p>
          <div className="text-gray-300 leading-relaxed">
            <PortableText value={article.content} />
          </div>

          {videoUrl && (
            <div className="mb-6">
              <video
                controls
                className="w-full"
                src={videoUrl} // Gunakan URL video yang benar
                type="video/mp4"
                alt="Article video"
              >
                Your browser does not support the video tag.
              </video>
            </div>
          )}

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

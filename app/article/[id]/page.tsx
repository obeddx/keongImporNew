"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { client } from "../../lib/sanityClient";
import { urlFor } from "../../lib/imageUrlBuilder";
import { PortableText } from "@portabletext/react";
import { motion } from "framer-motion";
import { useTheme } from "@/components/ThemeContext";
import Image from "next/image";

interface Article {
  title: string;
  content: { _type: string; children: Array<{ _type: string; text: string }> }; // Specific content structure for PortableText
  image: { asset: { _ref: string } }; // Adjust image structure based on your CMS
  video: { asset: { url: string } } | null;
  publishedAt: string;
}

const ArticleDetail = () => {
  const [article, setArticle] = useState<Article | null>(null);
  const { id } = useParams();
  const router = useRouter();
  const { isDarkMode } = useTheme();

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

  if (!article) return <div className="text-center">Loading...</div>;

  const videoUrl = article.video?.asset?.url;

  return (
    <motion.div
      className={`mt-20 pt-32 py-20 min-h-screen ${isDarkMode ? "bg-gray-900 text-white" : "bg-white text-black"}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className={`max-w-4xl mx-auto rounded-lg shadow-lg overflow-hidden ${isDarkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-black"}`}>
        {article.image && (
          <Image
            src={urlFor(article.image).url()}
            alt={article.title}
            width={800} // Provide a specific width
            height={400} // Provide a specific height
            className="w-full h-64 object-cover"
          />
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
            <PortableText value={article.content} />
          </div>

          {videoUrl && (
            <div className="mb-6">
              <video
                controls
                className="w-full"
                src={videoUrl}
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

import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import { Image } from "@sanity/types"; // Import the correct type for Sanity images

const client = createClient({
  projectId: "o5houilb", // Ganti dengan Project ID Anda
  dataset: "production", // Ganti dengan dataset Anda
  useCdn: true,
  apiVersion: "2023-01-01",
});

const builder = imageUrlBuilder(client);

// Specify the type for 'source' as 'Image'
export const urlFor = (source: Image) => builder.image(source);

import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

const client = createClient({
  projectId: "o5houilb", // Ganti dengan Project ID Anda
  dataset: "production", // Ganti dengan dataset Anda
  useCdn: true,
  apiVersion: "2023-01-01",
});

const builder = imageUrlBuilder(client);

export const urlFor = (source: any) => builder.image(source);

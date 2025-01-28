import { createClient } from 'next-sanity';

export const client = createClient({
  projectId: 'o5houilb', // Ganti dengan Project ID Anda
  dataset: 'production', // Gunakan dataset Anda
  useCdn: true, // Gunakan CDN untuk data yang sering diakses
});

// lib/getCertificationUrl.ts
import sanityClient from '@sanity/client';

const client = sanityClient({
  projectId: 'o5houilb', // Ganti dengan projectId Anda
  dataset: 'production',
  useCdn: true
});

// Fungsi untuk mengambil URL sertifikasi
const getCertificationUrl = async (certificationRef: string) => {
  try {
    const document = await client.getDocument(certificationRef);
    const certificationUrl = document?.asset?.url; // Mengambil URL asset PDF
    return certificationUrl;
  } catch (error) {
    console.error("Error fetching certification URL:", error);
  }
};

export default getCertificationUrl;

import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

// Inisialisasi PrismaClient
const prisma = new PrismaClient();

// Konfigurasi Nodemailer
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com", // Anda bisa menggunakan layanan email lain seperti SendGrid atau Mailgun
  port: 587,
  auth: {
    user: process.env.EMAIL_USER, // Ganti dengan email Anda
    pass: process.env.EMAIL_PASS, // Ganti dengan password atau app password email Anda
  },
});

// Interface untuk data yang diterima dari form
interface FormData {
  name: string;
  email: string;
  company?: string;
  country: string;
  message: string;
}

// Fungsi untuk mengirimkan email
const sendEmail = (formData: FormData) => {
  const mailOptions = {
    from: process.env.EMAIL_USER, // Ganti dengan email pengirim
    to: 'cobaweb575@gmail.com', // Ganti dengan email penerima
    subject: 'Kontak Baru dari Formulir Website',
    text: `Anda menerima pesan baru dari ${formData.name}:\n\n${formData.message}\n\nInformasi Kontak:\nEmail: ${formData.email}\nPerusahaan: ${formData.company || 'Tidak ada'}\nNegara: ${formData.country}`,
  };

  return transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
};

// API handler
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // Handle GET request untuk mengambil data kontak
    try {
      const kontaks = await prisma.kontak.findMany();
      res.status(200).json(kontaks);
    } catch (error) {
      console.error('Error fetching kontaks:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else if (req.method === 'POST') {
    // Handle POST request untuk menambahkan data kontak
    try {
      const { name, email, company, country, message } = req.body;

      // Validasi input
      if (!name || !email || !country || !message) {
        return res.status(400).json({ message: 'Semua field wajib diisi kecuali perusahaan' });
      }

      // Simpan data ke database
      const newKontak = await prisma.kontak.create({
        data: {
          nama: name,
          email,
          perusahaan: company || null, // Perusahaan bersifat opsional
          negara: country,
          pesan: message,
        },
      });

      // Kirim email
      await sendEmail(req.body); // Mengirimkan email dengan form data

      res.status(201).json(newKontak);
    } catch (error) {
      console.error('Error creating kontak:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    // Menangani metode HTTP yang tidak didukung
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

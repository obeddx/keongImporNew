import nodemailer from 'nodemailer';

// Mengambil kredensial dari environment variables
const email = 'yobertgeraldo4@gmail.com';
const pass = 'pakgudzycblcbrdw';

if (!email || !pass) {
  console.error("ERROR: Variabel environment EMAIL atau EMAIL_PASS tidak ditemukan!");
}

// Membuat transport Nodemailer dengan pengaturan SMTP
export const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com', // Host SMTP untuk Gmail
  port: 587, // Gunakan port 587 untuk TLS
  secure: false, // Harus false jika menggunakan port 587
  auth: {
    user: email, // Email pengirim
    pass: pass, // App Password dari Google
  },
});

// Fungsi untuk mengirim email ke penerima yang diinput user
export const sendEmail = async ({ to, subject, text, html }) => {
  try {
    const mailOptions = {
      from: email, // Pengirim
      to: Array.isArray(to) ? to.join(', ') : to, // Mengirim ke banyak email
      subject: subject, // Subjek dari input user
      text: text, // Isi email dalam teks biasa
      html: html, // Isi email dalam format HTML
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email berhasil dikirim:', info.messageId);
    return { success: true, info };
  } catch (error) {
    console.error('❌ Error saat mengirim email:', error);
    return { success: false, error: error.message };
  }
};

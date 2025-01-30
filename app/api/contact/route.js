// api/contact/route.js
import { sendEmail } from "../../config/nodemailer";

export async function POST(req) {
  try {
    const { to, subject, message } = await req.json();

    const response = await sendEmail({
      to: to,
      subject: subject,
      text: message,
      html: `<p>${message}</p>`, // Perbaikan dari JSX ke string template
    });

    if (response.success) {
      return Response.json({ message: "Email berhasil dikirim" }, { status: 200 });
    } else {
      throw new Error(response.error || "Gagal mengirim email.");
    }
  } catch (error) {
    console.error("❌ Error API:", error);
    return Response.json({ message: "Gagal mengirim email", error: error.message }, { status: 500 });
  }
}

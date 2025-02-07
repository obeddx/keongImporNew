import { NextResponse } from "next/server";
import { scryptSync } from "crypto";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Fungsi untuk verifikasi password
const verifyPassword = (password: string, hashedPassword: string) => {
  const [salt, hash] = hashedPassword.split(":"); // Ambil salt & hash dari database
  const newHash = scryptSync(password, salt, 64).toString("hex"); // Hash password yang dimasukkan
  return newHash === hash; // Bandingkan hasil hashing
};

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    // Cari user berdasarkan username
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user || !verifyPassword(password, user.password)) {
      return NextResponse.json({ error: "Username atau password salah!" }, { status: 401 });
    }

    return NextResponse.json({ message: "Login berhasil!" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Terjadi kesalahan, coba lagi nanti." }, { status: 500 });
  }
}

import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { promisify } from "util";
import crypto from "crypto";

const prisma = new PrismaClient();
const scrypt = promisify(crypto.scrypt);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "Semua data wajib diisi" });
    }

    try {
      // Cek apakah email sudah terdaftar
      const existingUser = await prisma.user.findUnique({
        where: { username },
      });

      if (existingUser) {
        return res.status(409).json({ message: "Username sudah terdaftar" });
      }

      // Hash password menggunakan scrypt
      const salt = crypto.randomBytes(16).toString("hex");
      const derivedKey = (await scrypt(password, salt, 64)) as Buffer;
      const hashedPassword = `${salt}:${derivedKey.toString("hex")}`;

      // Simpan user ke database
      const newUser = await prisma.user.create({
        data: {
          username,

          password: hashedPassword,
        },
      });

      return res.status(201).json({ message: "Registrasi berhasil", userId: newUser.id });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Terjadi kesalahan pada server" });
    } finally {
      await prisma.$disconnect();
    }
  } else {
    res.status(405).json({ message: "Metode tidak diperbolehkan" });
  }
}

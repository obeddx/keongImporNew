//lib/api.ts
export const sendContactForm = async (personalizedEmails: { email: string, subject: string, message: string }[]) => {
  try {
    // Kirim email satu per satu ke masing-masing penerima
    const responses = await Promise.all(
      personalizedEmails.map(({ email, subject, message }) =>
        fetch("/api/contact", {
          method: "POST",
          body: JSON.stringify({ to: email, subject, message }),
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })
      )
    );
    
    const successResponses = responses.filter((res) => res.ok);
    
    if (successResponses.length === personalizedEmails.length) {
      return { success: true };
    } else {
      throw new Error("Gagal mengirim beberapa email.");
    }
  } catch (error: unknown) { // Menentukan tipe error secara eksplisit
    if (error instanceof Error) { // Memastikan error adalah instance dari Error
      console.error("Error:", error.message); // Akses error.message
      return { success: false, error: error.message };
    } else {
      console.error("Unknown error:", error); // Menangani error selain instance Error
      return { success: false, error: "Terjadi kesalahan yang tidak diketahui." };
    }
  }
};

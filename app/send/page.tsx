"use client";
import React, { useState } from "react";
import { sendContactForm } from "../lib/api";
import * as XLSX from "xlsx";
import { useTheme } from "@/components/ThemeContext";

const SendEmailPage = () => {
  const { isDarkMode } = useTheme();

  const [recipients, setRecipients] = useState([{ email: "", name: "", company: "" }]);
  const [emailSubject, setEmailSubject] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [fileErrorMessage, setFileErrorMessage] = useState(""); // State untuk error file upload
  const [failureCount, setFailureCount] = useState(0); // Menyimpan jumlah kegagalan
  const [failureDetails, setFailureDetails] = useState<any[]>([]); // Menyimpan detail kegagalan
  const [successCount, setSuccessCount] = useState(0); // Menyimpan jumlah keberhasilan pengiriman email

  const handleRecipientChange = (index: number, field: "email" | "name" | "company", value: string) => {
    const updatedRecipients = [...recipients];
    updatedRecipients[index][field] = value;
    setRecipients(updatedRecipients);
  };

  const addRecipient = () => {
    setRecipients([...recipients, { email: "", name: "", company: "" }]);
  };

  const removeRecipient = (index: number) => {
    const updatedRecipients = recipients.filter((_, i) => i !== index);
    setRecipients(updatedRecipients);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const target = e.target;
      if (!target) return;

      const data = new Uint8Array(target.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      if (!jsonData.every((row: any) => row.Name && row.Company && row.Email)) {
        setFileErrorMessage("Format file salah. Pastikan ada kolom Name, Company, dan Email.");
        return;
      }

      const newRecipients = jsonData.map((row: any) => ({
        name: row.Name,
        company: row.Company,
        email: row.Email,
      }));

      // Memasukkan data dari file langsung ke indeks 0 (menghapus data sebelumnya)
      setRecipients(newRecipients);
      setFileErrorMessage(""); // Reset errorMessage jika file valid
    };

    reader.readAsArrayBuffer(file);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (recipients.some((recipient) => !recipient.email || !recipient.name || !recipient.company)) {
      setErrorMessage("Harap lengkapi semua kolom penerima.");
      return;
    }

    try {
      const personalizedEmails = recipients.map((recipient) => ({
        email: recipient.email,
        subject: emailSubject,
        message: emailMessage
          .replace("{name}", recipient.name)
          .replace("{company}", recipient.company),
      }));

      let failureList: any[] = [];
      let success = 0;

      for (const email of personalizedEmails) {
        try {
          const response = await sendContactForm([email]);
          if (response.success) {
            success++;
          } else {
            failureList.push({ email: email.email, reason: "Gagal mengirim email" });
          }
        } catch (error: unknown) {
          if (error instanceof Error) {
            failureList.push({ email: email.email, reason: error.message || "Unknown error" });
          } else {
            failureList.push({ email: email.email, reason: "Unknown error" });
          }
        }
      }

      setSuccessCount(success); // Menyimpan jumlah email yang berhasil dikirim
      if (failureList.length > 0) {
        setFailureDetails(failureList);
        setFailureCount(failureList.length);
        setErrorMessage("Beberapa email gagal dikirim.");
      } else {
        setSuccessMessage("Semua email berhasil dikirim!");
      }

      // Reset form state
      setRecipients([{ email: "", name: "", company: "" }]);
      setEmailSubject("");
      setEmailMessage("");
    } catch (error: unknown) {
      setSuccessMessage("");
      if (error instanceof Error) {
        setErrorMessage("Terjadi kesalahan saat mengirim email: " + error.message);
      } else {
        setErrorMessage("Terjadi kesalahan saat mengirim email.");
      }
    }
  };

  // Kelas untuk mode light/dark. Anda bisa menyesuaikannya.
  const outerContainerClass = isDarkMode
    ? "bg-gray-900 text-white"
    : "bg-gray-100 text-gray-900";
  const innerContainerClass = isDarkMode
    ? "bg-gray-800"
    : "bg-white";
  const inputClass = isDarkMode
    ? "w-full p-3 bg-gray-700 border border-gray-600 rounded-md"
    : "w-full p-3 bg-gray-200 border border-gray-300 rounded-md";
  const buttonClass = isDarkMode
    ? "bg-green-600 py-3 px-6 rounded-md hover:bg-green-700"
    : "bg-green-500 py-3 px-6 rounded-md hover:bg-green-600";
  const deleteButtonClass = isDarkMode
    ? "bg-red-600 py-3 px-6 rounded-md hover:bg-red-700"
    : "bg-red-500 py-3 px-6 rounded-md hover:bg-red-600";
  const submitButtonClass = isDarkMode
    ? "bg-blue-600 py-3 px-6 rounded-md hover:bg-blue-700"
    : "bg-blue-500 py-3 px-6 rounded-md hover:bg-blue-600";

  // Variabel kelas untuk header tabel <th> agar tulisan menjadi putih pada light mode
  const headerThClass = isDarkMode
    ? "px-6 py-3 text-left"
    : "px-6 py-3 text-left text-white";

  return (
    // Menambahkan kelas 'pt-64 pb-64' untuk memberikan jarak antara navbar dan konten halaman
    <div className={`${outerContainerClass} pt-64 pb-64 flex items-center justify-center min-h-screen p-6`}>
      <div className={`${innerContainerClass} w-full max-w-6xl p-8 rounded-lg shadow-lg`}>
        {/* Header */}
        <div className="flex justify-center items-center mb-6">
          <h1 className="text-3xl font-bold text-center">Send Personalized Emails</h1>
        </div>

        {/* Tampilkan pesan error untuk file XLSX di atas form */}
        {fileErrorMessage && (
          <div className="text-red-500 mb-4">
            {fileErrorMessage}
          </div>
        )}

        {/* Upload File Section */}
        <div className="mb-6">
          <label className="block text-lg font-medium mb-2">
            Upload Excel/CSV (Alternatif)
          </label>
          <input
            type="file"
            accept=".csv,.xlsx"
            onChange={handleFileUpload}
            className={`${inputClass}`}
          />
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="overflow-x-auto">
            <table className="table-auto w-full text-sm border-collapse border border-gray-700">
              <thead>
                <tr className="bg-gray-700">
                  <th className={headerThClass}>Name</th>
                  <th className={headerThClass}>Company</th>
                  <th className={headerThClass + " w-1/3"}>Email</th>
                  <th className={headerThClass}></th>
                </tr>
              </thead>
              <tbody>
                {recipients.map((recipient, index) => (
                  <tr key={index} className="border-t border-gray-600">
                    <td className="px-6 py-3">
                      <input
                        type="text"
                        value={recipient.name}
                        onChange={(e) =>
                          handleRecipientChange(index, "name", e.target.value)
                        }
                        className={inputClass}
                        placeholder="Name"
                        required
                      />
                    </td>
                    <td className="px-6 py-3">
                      <input
                        type="text"
                        value={recipient.company}
                        onChange={(e) =>
                          handleRecipientChange(index, "company", e.target.value)
                        }
                        className={inputClass}
                        placeholder="Company"
                        required
                      />
                    </td>
                    <td className="px-6 py-3 w-1/3">
                      <input
                        type="email"
                        value={recipient.email}
                        onChange={(e) =>
                          handleRecipientChange(index, "email", e.target.value)
                        }
                        className={inputClass}
                        placeholder="Email"
                        required
                      />
                    </td>
                    <td className="px-6 py-3 space-x-2">
                      <button type="button" onClick={addRecipient} className={buttonClass}>
                        Add
                      </button>
                      {index > 0 && (
                        <button
                          type="button"
                          onClick={() => removeRecipient(index)}
                          className={deleteButtonClass}
                        >
                          Delete
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div>
            <label className="block text-lg font-medium">Subject</label>
            <input
              type="text"
              value={emailSubject}
              onChange={(e) => setEmailSubject(e.target.value)}
              className={inputClass}
              required
            />
          </div>

          <div>
            <label className="block text-lg font-medium">Message</label>
            <textarea
              value={emailMessage}
              onChange={(e) => setEmailMessage(e.target.value)}
              className={`${inputClass} min-h-[150px]`}
              required
            />
          </div>

          <button type="submit" className={submitButtonClass}>
            Send Emails
          </button>
        </form>

        {/* Tampilkan status pengiriman di bawah tombol kirim */}
        {(successMessage || errorMessage) && (
          <div className="mt-6">
            {successMessage && (
              <div className="text-green-500">{successMessage}</div>
            )}
            {errorMessage && (
              <div className="text-red-500">
                {errorMessage}
                {failureCount > 0 && (
                  <div className="mt-4">
                    <h3 className="font-bold">Detail Kegagalan:</h3>
                    <ul>
                      {failureDetails.map((failure, index) => (
                        <li key={index}>
                          <strong>{failure.email}</strong>: {failure.reason}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
            {successCount > 0 && (
              <div className="mt-4 text-green-500">
                <strong>{successCount}</strong> email berhasil dikirim.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SendEmailPage;

"use client";
import React, { useState, useEffect } from "react";
import { sendContactForm } from "../lib/api";
import * as XLSX from "xlsx";


const SendEmailPage = () => {
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
        message: emailMessage.replace("{name}", recipient.name).replace("{company}", recipient.company),
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
      setRecipients([]);
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

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white p-6 mt-12">
      <div className="w-full max-w-6xl bg-gray-800 p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">Send Personalized Emails</h1>
        
        {/* Tampilkan pesan error untuk file XLSX di atas form */}
        {fileErrorMessage && (
          <div className="text-red-500 mb-4">
            {fileErrorMessage}
          </div>
        )}

        {/* Upload File Section */}
        <div className="mb-6">
          <label className="block text-lg font-medium mb-2">Upload Excel/CSV (Alternatif)</label>
          <input type="file" accept=".csv,.xlsx" onChange={handleFileUpload} className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md" />
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="overflow-x-auto">
            <table className="table-auto w-full text-sm border-collapse border border-gray-700">
              <thead>
                <tr className="bg-gray-700">
                  <th className="px-6 py-3 text-left">Name</th>
                  <th className="px-6 py-3 text-left">Company</th>
                  <th className="px-6 py-3 text-left w-1/3">Email</th>
                  <th className="px-6 py-3 text-left"></th>
                </tr>
              </thead>
              <tbody>
                {recipients.map((recipient, index) => (
                  <tr key={index} className="border-t border-gray-600">
                    <td className="px-6 py-3">
                      <input type="text" value={recipient.name} onChange={(e) => handleRecipientChange(index, "name", e.target.value)} className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md" placeholder="Name" required />
                    </td>
                    <td className="px-6 py-3">
                      <input type="text" value={recipient.company} onChange={(e) => handleRecipientChange(index, "company", e.target.value)} className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md" placeholder="Company" required />
                    </td>
                    <td className="px-6 py-3 w-1/3">
                      <input type="email" value={recipient.email} onChange={(e) => handleRecipientChange(index, "email", e.target.value)} className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md" placeholder="Email" required />
                    </td>
                    <td className="px-6 py-3">
                      <button type="button" onClick={addRecipient} className="bg-green-600 py-3 px-6 rounded-md hover:bg-green-700">Add</button>
                      {index > 0 && (
                        <button type="button" onClick={() => removeRecipient(index)} className="bg-red-600 py-3 px-6 rounded-md hover:bg-red-700">
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
            <input type="text" value={emailSubject} onChange={(e) => setEmailSubject(e.target.value)} className="w-full p-4 bg-gray-700 border border-gray-600 rounded-md" required />
          </div>
          
          <div>
            <label className="block text-lg font-medium">Message</label>
            <textarea value={emailMessage} onChange={(e) => setEmailMessage(e.target.value)} className="w-full p-4 bg-gray-700 border border-gray-600 rounded-md min-h-[150px]" required />
          </div>
          
          <button type="submit" className="w-full bg-blue-600 py-3 px-6 rounded-md hover:bg-blue-700">Send Emails</button>
        </form>

        {/* Tampilkan status pengiriman di bawah tombol kirim */}
        {(successMessage || errorMessage) && (
          <div className="mt-6">
            {successMessage && <div className="text-green-500">{successMessage}</div>}
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
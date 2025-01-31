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
  const [fileErrorMessage, setFileErrorMessage] = useState("");
  const [failureCount, setFailureCount] = useState(0);
  const [failureDetails, setFailureDetails] = useState<any[]>([]);
  const [successCount, setSuccessCount] = useState(0);

  const handleRecipientChange = (index, field, value) => {
    const updatedRecipients = [...recipients];
    updatedRecipients[index][field] = value;
    setRecipients(updatedRecipients);
  };

  const addRecipient = () => {
    setRecipients([...recipients, { email: "", name: "", company: "" }]);
  };

<<<<<<< HEAD
  const removeRecipient = (index: number) => {
=======
  const removeRecipient = (index) => {
>>>>>>> 8dd6b031d5842359e7d3cdeb2c26f2c1be87884e
    const updatedRecipients = recipients.filter((_, i) => i !== index);
    setRecipients(updatedRecipients);
  };

<<<<<<< HEAD

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
=======
  const handleFileUpload = (event) => {
>>>>>>> 8dd6b031d5842359e7d3cdeb2c26f2c1be87884e
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      if (!jsonData.every((row) => row.Name && row.Company && row.Email)) {
        setFileErrorMessage("Format file salah. Pastikan ada kolom Name, Company, dan Email.");
        return;
      }

      const newRecipients = jsonData.map((row) => ({
        name: row.Name,
        company: row.Company,
        email: row.Email,
      }));

      setRecipients(newRecipients);
      setFileErrorMessage("");
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white p-6 mt-12">
      <div className="w-full max-w-6xl bg-gray-800 p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">Send Personalized Emails</h1>

        {fileErrorMessage && <div className="text-red-500 mb-4">{fileErrorMessage}</div>}

        <div className="mb-6">
          <label className="block text-lg font-medium mb-2">Upload Excel/CSV (Alternatif)</label>
          <input type="file" accept=".csv,.xlsx" onChange={handleFileUpload} className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md" />
        </div>

        <form className="space-y-6">
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
                    <td className="px-6 py-3 flex gap-2">
                      <button type="button" onClick={addRecipient} className="bg-green-600 py-3 px-6 rounded-md hover:bg-green-700">Add</button>
<<<<<<< HEAD
                      {index > 0 && (
                        <button type="button" onClick={() => removeRecipient(index)} className="bg-red-600 py-3 px-6 rounded-md hover:bg-red-700">
                          Delete
                        </button>
                      )}
=======
                      <button type="button" onClick={() => removeRecipient(index)} className="bg-red-600 py-3 px-6 rounded-md hover:bg-red-700">Delete</button>
>>>>>>> 8dd6b031d5842359e7d3cdeb2c26f2c1be87884e
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SendEmailPage;

'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useTheme } from "@/components/ThemeContext";

type ReportData = {
  city: string;
  region: string;
  activeUsers: string;
  pagePath: string;
  platform: string;
};

export default function Dashboard() {
  const [reportData, setReportData] = useState<ReportData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/analitik');
        setReportData(response.data.result);
      } catch (error) {
        console.error('Error fetching report data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const outerContainerClass = isDarkMode
    ? "bg-gray-900 text-white"
    : "bg-gray-100 text-gray-900";
  const innerContainerClass = isDarkMode
    ? "bg-gray-800 text-white"
    : "bg-white text-black";
  const tableClass = isDarkMode
    ? "table-auto w-full bg-gray-800 text-white shadow-md rounded-lg"
    : "table-auto w-full bg-white shadow-md rounded-lg";
  const rowClass = isDarkMode
    ? "border-b hover:bg-gray-700"
    : "border-b hover:bg-gray-100";
  const loadingTextClass = isDarkMode
    ? "text-white"
    : "text-gray-900";
  const headerThClass = isDarkMode
    ? "px-6 py-3 text-left text-white bg-gray-700"
    : "px-6 py-3 text-left text-black bg-gray-200";

  return (
    <div className={`${outerContainerClass} pt-64 pb-64 flex items-center justify-center min-h-screen p-6`}>
      {loading ? (
        <p className={`${loadingTextClass}`}>Loading data...</p>
      ) : (
        <div className="overflow-x-auto">
          <h1 className={`text-3xl font-bold mb-6 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
            Google Analytics Dashboard
          </h1>
          <table className={`${tableClass}`}>
            <thead>
              <tr>
                <th className={`${headerThClass}`}>City</th>
                <th className={`${headerThClass}`}>Region</th>
                <th className={`${headerThClass}`}>Active Users</th>
                <th className={`${headerThClass}`}>Judul Halaman</th>
                <th className={`${headerThClass}`}>Device</th>
              </tr>
            </thead>
            <tbody>
              {reportData.length > 0 ? (
                reportData.map((data, index) => (
                  <tr key={index} className={`${rowClass}`}>
                    <td className="p-4">{data.city}</td>
                    <td className="p-4">{data.region}</td>
                    <td className="p-4">{data.activeUsers}</td>
                    <td className="p-4">{data.pagePath}</td>
                    <td className="p-4">{data.platform}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="p-4 text-center">
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

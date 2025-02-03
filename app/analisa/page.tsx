'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
// import AnalyticsBarChart from '@/components/analitikBar/page';
// import AnalyticsBarChart2 from '@/components/analitikBar2/page';

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

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6">Google Analytics Dashboard</h1>

      {loading ? (
        <p>Loading data...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto w-full bg-white shadow-md rounded-lg">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-4 text-left font-medium">City</th>
                <th className="p-4 text-left font-medium">Region</th>
                <th className="p-4 text-left font-medium">Active Users</th>
                <th className="p-4 text-left font-medium">Judul Halaman</th>
                <th className="p-4 text-left font-medium">Device</th>
              </tr>
            </thead>
            <tbody>
              {reportData.length > 0 ? (
                reportData.map((data, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="p-4">{data.city}</td>
                    <td className="p-4">{data.region}</td>
                    <td className="p-4">{data.activeUsers}</td>
                    <td className="p-4">{data.pagePath}</td>
                    <td className="p-4">{data.platform}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={2} className="p-4 text-center">
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* <AnalyticsBarChart/> */}
          {/* <AnalyticsBarChart2/> */}
        </div>
      )}
    </div>
  );
}

import { BetaAnalyticsDataClient, protos } from '@google-analytics/data';
import type { NextApiRequest, NextApiResponse } from 'next';
// import path from 'path';
import process from 'process';

const propertyId = '475908908';

// Tetapkan path kredensial
const credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS || '{}');

const analyticsDataClient = new BetaAnalyticsDataClient();

async function runReport() {
  const [response] = await analyticsDataClient.runReport({
    property: `properties/${propertyId}`,
    dateRanges: [
      {
        startDate: '2020-03-31',
        endDate: 'today',
      },
    ],
    dimensions: [{ name: 'city' }, { name: 'region' }, { name: 'pagePath' }, {name: "platform"}],
    metrics: [{ name: 'activeUsers' }],
  });

  return response;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const report = await runReport();

    const result = report.rows?.map((row: protos.google.analytics.data.v1beta.IRow) => ({
      city: row.dimensionValues?.[0]?.value || 'Unknown',
      region: row.dimensionValues?.[1]?.value || 'Unknown',
      pagePath: row.dimensionValues?.[2]?.value || 'Unknown',
      platform: row.dimensionValues?.[3]?.value || 'Unknown',
      activeUsers: row.metricValues?.[0]?.value || '0',
    }));

    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
}

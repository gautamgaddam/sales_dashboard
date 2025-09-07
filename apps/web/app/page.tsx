import React from 'react';
import type { MetricTile } from '../types/dashboard';

async function fetchMetrics(): Promise<MetricTile[]> {
  const base = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';
  const res = await fetch(`${base}/api/dashboard/metrics`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch metrics');
  const data = await res.json();
  return data.tiles as MetricTile[];
}

export default async function Page() {
  const tiles = await fetchMetrics();
  return (
    <main>
      <h1>Dashboard</h1>
      <pre>{JSON.stringify(tiles, null, 2)}</pre>
    </main>
  );
}

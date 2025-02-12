'use client';

import { useState, useEffect } from 'react';
import SearchBar from '@/components/SearchBar';
import FilterControls from '@/components/FilterControls';
import LeaderboardTable from '@/components/LeaderboardTable';
import { UserResponse } from '@/types';

export default function LeaderboardPage() {
  const [search, setSearch] = useState('');
  const [minAttempts, setMinAttempts] = useState(1);
  const [maxAttempts, setMaxAttempts] = useState(100);
  const [data, setData] = useState<UserResponse[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        search,
        minAttempts: minAttempts.toString(),
        maxAttempts: maxAttempts.toString(),
      });

      const response = await fetch(`/api/leaderboard?${params}`);
      const result = await response.json();
      setData(result.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      fetchData();
    }, 600);

    return () => clearTimeout(debounceTimer);
  }, [search, minAttempts, maxAttempts]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Leaderboard</h1>
      
      <div className="space-y-4 mb-8">
        <SearchBar value={search} onChange={setSearch} />
        <div className='flex justify-between'>
            <FilterControls
            minAttempts={minAttempts}
            maxAttempts={maxAttempts}
            onMinChange={setMinAttempts}
            onMaxChange={setMaxAttempts}
            />
            <button
                onClick={fetchData}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
                Refresh Data
            </button>
        </div>
      </div>

      <LeaderboardTable data={data} loading={loading} />

    </div>
  );
}
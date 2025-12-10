import React, { useEffect, useState } from 'react';

type Reason = {
  id?: number | string;
  reason?: string;
  generated_at?: string;
};

export default function BlogComponent() {
  const [items, setItems] = useState<Reason[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const backend = import.meta.env.VITE_BACKEND_URL || '';
    const url = backend ? `${backend}/api/reasons` : `/api/reasons`;

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (data && data.success) setItems(data.reasons || []);
        else throw new Error(data?.error || 'Unexpected response');
      })
      .catch((err) => setError(err.message || String(err)))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-6">Loading reasons…</div>;
  if (error) return <div className="p-6 text-red-600">Error: {error}</div>;
  if (!items || items.length === 0) return <div className="p-6">No reasons found.</div>;

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center bg-white text-black">
      <h1>1001 Reasons You Should Hire Me</h1>

      <ul className="space-y-4">
        {items.map((r) => (
          <li key={r.id || r.generated_at} className="border rounded p-4">
            <div className="text-lg">{r.reason || 'No reason'}</div>
            <div className="text-xs text-gray-500 mt-3">
              {r.generated_at ? new Date(r.generated_at).toLocaleString() : ''}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

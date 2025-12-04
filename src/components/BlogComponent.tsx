import React, { useEffect, useState } from 'react';

export default function DailyReason() {
  const [reason, setReason] = useState('');
  const [timeLeft, setTimeLeft] = useState('');

  // Hämta dagens anledning
  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/daily`)
      .then((res) => res.json())
      .then((data) => setReason(data.reason))
      .catch(() => setReason('No reason available'));
  }, []);

  // Nedräkning till nästa dag
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const nextMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0);
      const diff = nextMidnight.getTime() - now.getTime();
      const hours = Math.floor(diff / 1000 / 60 / 60);
      const minutes = Math.floor((diff / 1000 / 60) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      const format = (num: number) => String(num).padStart(2, '0');
      setTimeLeft(`${format(hours)}h ${format(minutes)}m ${format(seconds)}s`);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center bg-white text-black">
      <h1>1001 Reasons You Should Hire Me</h1>
      <h2 className="mt-4 text-lg">{reason || 'No reason available'}</h2>
      <p className="mt-2 text-sm text-gray-500">New reason in: {timeLeft}</p>
    </div>
  );
}

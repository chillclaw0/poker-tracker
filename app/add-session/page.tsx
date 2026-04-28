'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { addSession } from '@/lib/utils';

export default function AddSession() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    stakes: '',
    hours: '',
    buyIn: '',
    cashOut: '',
    notes: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      addSession({
        date: formData.date,
        stakes: formData.stakes,
        hours: parseFloat(formData.hours),
        buyIn: parseFloat(formData.buyIn),
        cashOut: parseFloat(formData.cashOut),
        notes: formData.notes,
      });
      router.push('/');
    } catch (error) {
      alert('Error saving session');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 sm:p-6">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">Add Poker Session</h1>
          <p className="text-slate-400">Log a new session to track your results</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-slate-800 rounded-lg p-6 border border-slate-700">
          <div className="mb-6">
            <label className="block text-white font-semibold mb-2">Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="w-full bg-slate-700 border border-slate-600 rounded px-4 py-2 text-white"
            />
          </div>

          <div className="mb-6">
            <label className="block text-white font-semibold mb-2">Stakes</label>
            <input
              type="text"
              name="stakes"
              placeholder="e.g., 2/5"
              value={formData.stakes}
              onChange={handleChange}
              required
              className="w-full bg-slate-700 border border-slate-600 rounded px-4 py-2 text-white placeholder-slate-400"
            />
          </div>

          <div className="mb-6">
            <label className="block text-white font-semibold mb-2">Hours Played</label>
            <input
              type="number"
              name="hours"
              placeholder="e.g., 4.5"
              step="0.5"
              value={formData.hours}
              onChange={handleChange}
              required
              className="w-full bg-slate-700 border border-slate-600 rounded px-4 py-2 text-white placeholder-slate-400"
            />
          </div>

          <div className="mb-6">
            <label className="block text-white font-semibold mb-2">Buy-In Amount</label>
            <input
              type="number"
              name="buyIn"
              placeholder="e.g., 500"
              value={formData.buyIn}
              onChange={handleChange}
              required
              className="w-full bg-slate-700 border border-slate-600 rounded px-4 py-2 text-white placeholder-slate-400"
            />
          </div>

          <div className="mb-6">
            <label className="block text-white font-semibold mb-2">Cash-Out Amount</label>
            <input
              type="number"
              name="cashOut"
              placeholder="e.g., 750"
              value={formData.cashOut}
              onChange={handleChange}
              required
              className="w-full bg-slate-700 border border-slate-600 rounded px-4 py-2 text-white placeholder-slate-400"
            />
          </div>

          <div className="mb-6">
            <label className="block text-white font-semibold mb-2">Notes (Optional)</label>
            <textarea
              name="notes"
              placeholder="Any notes about the session..."
              value={formData.notes}
              onChange={handleChange}
              rows={4}
              className="w-full bg-slate-700 border border-slate-600 rounded px-4 py-2 text-white placeholder-slate-400"
            />
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save Session'}
            </button>
            <Link href="/" className="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 px-6 rounded-lg transition text-center">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

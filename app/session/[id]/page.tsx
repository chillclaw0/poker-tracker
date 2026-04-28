'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { PokerSession } from '@/lib/types';
import { getSessions, deleteSession, updateSession, getProfit, getHourlyRate, formatCurrency, formatDate } from '@/lib/utils';

export default function SessionDetail() {
  const router = useRouter();
  const params = useParams();
  const sessionId = params.id as string;

  const [session, setSession] = useState<PokerSession | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    date: '',
    stakes: '',
    hours: 0,
    buyIn: 0,
    cashOut: 0,
    notes: '',
  });

  useEffect(() => {
    const sessions = getSessions();
    const found = sessions.find(s => s.id === sessionId);
    if (found) {
      setSession(found);
      setFormData({
        date: found.date,
        stakes: found.stakes,
        hours: found.hours,
        buyIn: found.buyIn,
        cashOut: found.cashOut,
        notes: found.notes || '',
      });
    }
  }, [sessionId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'hours' || name === 'buyIn' || name === 'cashOut' ? parseFloat(value) || 0 : value,
    }));
  };

  const handleSave = () => {
    if (session) {
      updateSession(session.id, formData);
      setSession({ ...session, ...formData });
      setIsEditing(false);
    }
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this session?')) {
      deleteSession(sessionId);
      router.push('/');
    }
  };

  if (!session) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 sm:p-6 flex items-center justify-center">
        <p className="text-white">Loading...</p>
      </div>
    );
  }

  const profit = getProfit(session.buyIn, session.cashOut);
  const hourlyRate = getHourlyRate(profit, session.hours);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 sm:p-6">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <Link href="/" className="text-blue-400 hover:text-blue-300 mb-4 inline-block">← Back</Link>
          <h1 className="text-3xl font-bold text-white">{session.stakes} Stakes Session</h1>
        </div>

        <div className="bg-slate-800 rounded-lg border border-slate-700 p-6 space-y-6">
          {!isEditing ? (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-slate-400 text-sm mb-1">Date</p>
                  <p className="text-white font-semibold">{formatDate(session.date)}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-sm mb-1">Stakes</p>
                  <p className="text-white font-semibold">{session.stakes}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-sm mb-1">Hours Played</p>
                  <p className="text-white font-semibold">{session.hours}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-sm mb-1">Buy-In</p>
                  <p className="text-white font-semibold">{formatCurrency(session.buyIn)}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-sm mb-1">Cash-Out</p>
                  <p className="text-white font-semibold">{formatCurrency(session.cashOut)}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-sm mb-1">Profit</p>
                  <p className={`font-semibold ${profit >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {formatCurrency(profit)}
                  </p>
                </div>
                <div className="col-span-2">
                  <p className="text-slate-400 text-sm mb-1">Hourly Rate</p>
                  <p className={`font-semibold text-lg ${hourlyRate >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {formatCurrency(hourlyRate)}/hr
                  </p>
                </div>
              </div>

              {session.notes && (
                <div>
                  <p className="text-slate-400 text-sm mb-1">Notes</p>
                  <p className="text-white">{session.notes}</p>
                </div>
              )}

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition"
                >
                  Edit
                </button>
                <button
                  onClick={handleDelete}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition"
                >
                  Delete
                </button>
              </div>
            </>
          ) : (
            <>
              <div>
                <label className="block text-white font-medium mb-2">Date</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full bg-slate-700 text-white border border-slate-600 rounded px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Stakes</label>
                <input
                  type="text"
                  name="stakes"
                  value={formData.stakes}
                  onChange={handleChange}
                  className="w-full bg-slate-700 text-white border border-slate-600 rounded px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Hours Played</label>
                <input
                  type="number"
                  name="hours"
                  step="0.5"
                  value={formData.hours}
                  onChange={handleChange}
                  className="w-full bg-slate-700 text-white border border-slate-600 rounded px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Buy-In Amount</label>
                <input
                  type="number"
                  name="buyIn"
                  value={formData.buyIn}
                  onChange={handleChange}
                  className="w-full bg-slate-700 text-white border border-slate-600 rounded px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Cash-Out Amount</label>
                <input
                  type="number"
                  name="cashOut"
                  value={formData.cashOut}
                  onChange={handleChange}
                  className="w-full bg-slate-700 text-white border border-slate-600 rounded px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Notes</label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  className="w-full bg-slate-700 text-white border border-slate-600 rounded px-3 py-2 h-24"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleSave}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition"
                >
                  Save
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="flex-1 bg-slate-600 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded transition"
                >
                  Cancel
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

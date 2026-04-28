'use client';

import { useState } from 'react';
import { Trash2, Plus, TrendingUp } from 'lucide-react';

interface Session {
  id: string;
  buyIn: number;
  cashOut: number;
  notes: string;
  date: string;
  profit: number;
}

export default function Home() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [buyIn, setBuyIn] = useState('');
  const [cashOut, setCashOut] = useState('');
  const [notes, setNotes] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const addSession = () => {
    if (buyIn && cashOut) {
      const profit = parseFloat(cashOut) - parseFloat(buyIn);
      const newSession: Session = {
        id: Date.now().toString(),
        buyIn: parseFloat(buyIn),
        cashOut: parseFloat(cashOut),
        notes,
        date,
        profit,
      };
      setSessions([newSession, ...sessions]);
      setBuyIn('');
      setCashOut('');
      setNotes('');
      setDate(new Date().toISOString().split('T')[0]);
    }
  };

  const deleteSession = (id: string) => {
    setSessions(sessions.filter(s => s.id !== id));
  };

  const totalProfit = sessions.reduce((sum, s) => sum + s.profit, 0);
  const winningPercentage = sessions.length > 0 
    ? ((sessions.filter(s => s.profit > 0).length / sessions.length) * 100).toFixed(1)
    : 0;
  const avgProfit = sessions.length > 0 
    ? (totalProfit / sessions.length).toFixed(2)
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-6 md:p-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="mb-8 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-20"></div>
          <div className="relative bg-gray-800 border border-gray-700 rounded-lg p-8">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-8 h-8 text-blue-400" />
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Poker Tracker
              </h1>
            </div>
            <p className="text-gray-400 text-sm">Track your poker sessions and analyze your performance</p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {/* Stats Cards */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg blur opacity-0 group-hover:opacity-20 transition duration-300"></div>
            <div className="relative bg-gray-800 border border-gray-700 rounded-lg p-6 hover:border-green-500 transition">
              <p className="text-gray-400 text-sm mb-2">Total Profit</p>
              <p className={`text-3xl font-bold ${totalProfit >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                ${totalProfit.toFixed(2)}
              </p>
              <p className="text-gray-500 text-xs mt-2">{sessions.length} sessions tracked</p>
            </div>
          </div>

          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg blur opacity-0 group-hover:opacity-20 transition duration-300"></div>
            <div className="relative bg-gray-800 border border-gray-700 rounded-lg p-6 hover:border-blue-500 transition">
              <p className="text-gray-400 text-sm mb-2">Win Rate</p>
              <p className="text-3xl font-bold text-blue-400">{winningPercentage}%</p>
              <p className="text-gray-500 text-xs mt-2">Sessions in profit</p>
            </div>
          </div>

          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-0 group-hover:opacity-20 transition duration-300"></div>
            <div className="relative bg-gray-800 border border-gray-700 rounded-lg p-6 hover:border-purple-500 transition">
              <p className="text-gray-400 text-sm mb-2">Average Profit</p>
              <p className="text-3xl font-bold text-purple-400">${avgProfit}</p>
              <p className="text-gray-500 text-xs mt-2">Per session</p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Input Section */}
          <div className="md:col-span-1">
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 sticky top-8">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Plus className="w-5 h-5 text-blue-400" />
                New Session
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Date</label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded px-4 py-2 text-white focus:outline-none focus:border-blue-500 transition"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">Buy In ($)</label>
                  <input
                    type="number"
                    placeholder="100"
                    value={buyIn}
                    onChange={(e) => setBuyIn(e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded px-4 py-2 text-white focus:outline-none focus:border-blue-500 transition"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">Cash Out ($)</label>
                  <input
                    type="number"
                    placeholder="150"
                    value={cashOut}
                    onChange={(e) => setCashOut(e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded px-4 py-2 text-white focus:outline-none focus:border-blue-500 transition"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">Notes (Optional)</label>
                  <textarea
                    placeholder="Session details..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded px-4 py-2 text-white focus:outline-none focus:border-blue-500 transition resize-none"
                    rows={4}
                  />
                </div>

                <button
                  onClick={addSession}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 rounded-lg transition transform hover:scale-105 active:scale-95 duration-200"
                >
                  Add Session
                </button>
              </div>
            </div>
          </div>

          {/* Sessions List */}
          <div className="md:col-span-2">
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
              <h2 className="text-xl font-bold mb-6">Recent Sessions</h2>
              
              {sessions.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-400 text-lg mb-2">No sessions yet</p>
                  <p className="text-gray-500 text-sm">Add your first poker session to get started</p>
                </div>
              ) : (
                <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
                  {sessions.map((session) => (
                    <div
                      key={session.id}
                      className="group bg-gradient-to-r from-gray-700 to-gray-750 border border-gray-600 rounded-lg p-4 hover:border-gray-500 transition"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <p className="text-gray-400 text-sm">{session.date}</p>
                          <p className="text-white font-semibold">
                            ${session.buyIn.toFixed(2)} → ${session.cashOut.toFixed(2)}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className={`text-lg font-bold ${session.profit >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                            {session.profit >= 0 ? '+' : ''}{session.profit.toFixed(2)}
                          </p>
                          <button
                            onClick={() => deleteSession(session.id)}
                            className="text-gray-400 hover:text-red-400 transition opacity-0 group-hover:opacity-100 mt-2"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      {session.notes && (
                        <p className="text-gray-400 text-sm italic">{session.notes}</p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';

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

  const addSession = () => {
    if (!buyIn || !cashOut) return;

    const newSession: Session = {
      id: Date.now().toString(),
      buyIn: parseFloat(buyIn),
      cashOut: parseFloat(cashOut),
      notes,
      date: new Date().toLocaleDateString(),
      profit: parseFloat(cashOut) - parseFloat(buyIn),
    };

    setSessions([newSession, ...sessions]);
    setBuyIn('');
    setCashOut('');
    setNotes('');
  };

  const deleteSession = (id: string) => {
    setSessions(sessions.filter(s => s.id !== id));
  };

  const totalProfit = sessions.reduce((sum, s) => sum + s.profit, 0);
  const winRate = sessions.length > 0 ? (sessions.filter(s => s.profit > 0).length / sessions.length) * 100 : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6 md:p-12">
      {/* Background decorative elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-2 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
            Poker Tracker
          </h1>
          <p className="text-slate-400 text-lg">Master your game. Track your wins.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-1">
            <div className="sticky top-6 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 shadow-2xl">
              <h2 className="text-2xl font-bold text-white mb-6">New Session</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Buy-In ($)</label>
                  <input
                    type="number"
                    value={buyIn}
                    onChange={(e) => setBuyIn(e.target.value)}
                    placeholder="100"
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Cash Out ($)</label>
                  <input
                    type="number"
                    value={cashOut}
                    onChange={(e) => setCashOut(e.target.value)}
                    placeholder="250"
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Notes (Optional)</label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="How did the session go?"
                    rows={3}
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition resize-none"
                  />
                </div>

                <button
                  onClick={addSession}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 rounded-lg transition transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-purple-500/50"
                >
                  Log Session
                </button>
              </div>
            </div>
          </div>

          {/* Stats and Sessions Section */}
          <div className="lg:col-span-2">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 border border-emerald-500/30 rounded-xl p-6">
                <p className="text-emerald-300 text-sm font-medium mb-1">Total Profit</p>
                <p className={`text-3xl font-bold ${totalProfit >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                  ${totalProfit.toFixed(2)}
                </p>
              </div>

              <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/10 border border-blue-500/30 rounded-xl p-6">
                <p className="text-blue-300 text-sm font-medium mb-1">Win Rate</p>
                <p className="text-3xl font-bold text-blue-400">{winRate.toFixed(1)}%</p>
              </div>

              <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/10 border border-purple-500/30 rounded-xl p-6">
                <p className="text-purple-300 text-sm font-medium mb-1">Sessions</p>
                <p className="text-3xl font-bold text-purple-400">{sessions.length}</p>
              </div>

              <div className="bg-gradient-to-br from-orange-500/20 to-orange-600/10 border border-orange-500/30 rounded-xl p-6">
                <p className="text-orange-300 text-sm font-medium mb-1">Avg Profit</p>
                <p className={`text-3xl font-bold ${sessions.length > 0 && (totalProfit / sessions.length) >= 0 ? 'text-orange-400' : 'text-red-400'}`}>
                  ${sessions.length > 0 ? (totalProfit / sessions.length).toFixed(2) : '0.00'}
                </p>
              </div>
            </div>

            {/* Sessions List */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Session History</h2>
              <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                {sessions.length === 0 ? (
                  <div className="bg-slate-800/30 border border-slate-700/30 rounded-xl p-8 text-center">
                    <p className="text-slate-400 text-lg">No sessions yet. Log your first poker session above!</p>
                  </div>
                ) : (
                  sessions.map((session) => (
                    <div
                      key={session.id}
                      className={`bg-gradient-to-r ${
                        session.profit >= 0
                          ? 'from-emerald-500/10 to-emerald-600/5 border-l-4 border-emerald-500'
                          : 'from-red-500/10 to-red-600/5 border-l-4 border-red-500'
                      } border border-slate-700/30 rounded-xl p-5 hover:shadow-xl transition transform hover:scale-102`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="text-slate-300 text-sm">{session.date}</p>
                          <p className="text-white font-semibold">
                            ${session.buyIn.toFixed(2)} → ${session.cashOut.toFixed(2)}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className={`text-2xl font-bold ${session.profit >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                            {session.profit >= 0 ? '+ ' : ''} ${Math.abs(session.profit).toFixed(2)}
                          </p>
                        </div>
                      </div>
                      {session.notes && (
                        <p className="text-slate-400 text-sm mb-3 italic">"{session.notes}"</p>
                      )}
                      <button
                        onClick={() => deleteSession(session.id)}
                        className="text-xs text-red-400 hover:text-red-300 font-medium hover:underline transition"
                      >
                        Remove
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

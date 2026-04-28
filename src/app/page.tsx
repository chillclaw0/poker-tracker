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

  const handleAddSession = () => {
    if (!buyIn || !cashOut) {
      alert('Please enter both buy-in and cash-out amounts');
      return;
    }

    const buyInNum = parseFloat(buyIn);
    const cashOutNum = parseFloat(cashOut);
    const profit = cashOutNum - buyInNum;

    const newSession: Session = {
      id: Date.now().toString(),
      buyIn: buyInNum,
      cashOut: cashOutNum,
      notes: notes || 'No notes',
      date: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      profit,
    };

    setSessions([newSession, ...sessions]);
    setBuyIn('');
    setCashOut('');
    setNotes('');
  };

  const handleDeleteSession = (id: string) => {
    setSessions(sessions.filter((s) => s.id !== id));
  };

  const totalBuyIn = sessions.reduce((sum, s) => sum + s.buyIn, 0);
  const totalCashOut = sessions.reduce((sum, s) => sum + s.cashOut, 0);
  const totalProfit = totalCashOut - totalBuyIn;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6 md:p-12">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-3">
            Poker Tracker
          </h1>
          <p className="text-gray-300 text-lg">
            Track your sessions and manage your bankroll with precision
          </p>
        </div>

        {/* Add Session Card */}
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl p-8 mb-10 border border-gray-700">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
            Add New Session
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
            <div>
              <label className="block text-gray-300 text-sm font-semibold mb-2">
                Buy-In Amount ($)
              </label>
              <input
                type="number"
                placeholder="0.00"
                value={buyIn}
                onChange={(e) => setBuyIn(e.target.value)}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>
            
            <div>
              <label className="block text-gray-300 text-sm font-semibold mb-2">
                Cash-Out Amount ($)
              </label>
              <input
                type="number"
                placeholder="0.00"
                value={cashOut}
                onChange={(e) => setCashOut(e.target.value)}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>
            
            <div>
              <label className="block text-gray-300 text-sm font-semibold mb-2">
                Notes (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g., 2/5 game, 4 hours"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>
          </div>
          
          <button
            onClick={handleAddSession}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3 px-6 rounded-lg transition duration-200 shadow-lg hover:shadow-xl"
          >
            + Add Session
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-lg p-6 border border-gray-700">
            <p className="text-gray-400 text-sm font-semibold mb-2">TOTAL BUY-IN</p>
            <p className="text-4xl font-bold text-blue-400">
              ${totalBuyIn.toFixed(2)}
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-lg p-6 border border-gray-700">
            <p className="text-gray-400 text-sm font-semibold mb-2">TOTAL CASH-OUT</p>
            <p className="text-4xl font-bold text-purple-400">
              ${totalCashOut.toFixed(2)}
            </p>
          </div>
          
          <div className={`bg-gradient-to-br rounded-xl shadow-lg p-6 border transition ${
            totalProfit >= 0
              ? 'from-green-900 to-green-800 border-green-700'
              : 'from-red-900 to-red-800 border-red-700'
          }`}>
            <p className="text-gray-300 text-sm font-semibold mb-2">TOTAL PROFIT/LOSS</p>
            <p className={`text-4xl font-bold ${totalProfit >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              ${totalProfit.toFixed(2)}
            </p>
          </div>
        </div>

        {/* Sessions List */}
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl p-8 border border-gray-700">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            <span className="w-2 h-2 bg-purple-400 rounded-full mr-3"></span>
            Session History
          </h2>
          
          {sessions.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">
                No sessions yet. Add your first session to get started!
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {sessions.map((session) => (
                <div
                  key={session.id}
                  className="bg-gray-700 hover:bg-gray-650 border border-gray-600 rounded-lg p-5 transition duration-200 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
                >
                  <div className="flex-1">
                    <div className="flex flex-wrap gap-4 mb-2">
                      <div>
                        <p className="text-gray-400 text-xs font-semibold">BUY-IN</p>
                        <p className="text-white text-lg font-bold">
                          ${session.buyIn.toFixed(2)}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-xs font-semibold">CASH-OUT</p>
                        <p className="text-white text-lg font-bold">
                          ${session.cashOut.toFixed(2)}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-xs font-semibold">RESULT</p>
                        <p className={`text-lg font-bold ${session.profit >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {session.profit >= 0 ? '+' : ''}${session.profit.toFixed(2)}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col md:flex-row md:items-center md:gap-4">
                      <p className="text-gray-400 text-sm">{session.date}</p>
                      <p className="text-gray-300 text-sm italic">{session.notes}</p>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => handleDeleteSession(session.id)}
                    className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 text-sm"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

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
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <style>{`@keyframes blob { 0%, 100% { transform: translate(0, 0) scale(1); } 33% { transform: translate(30px, -50px) scale(1.1); } 66% { transform: translate(-20px, 20px) scale(0.9); } } .animate-blob { animation: blob 7s infinite; } .animation-delay-2000 { animation-delay: 2s; } .animation-delay-4000 { animation-delay: 4s; }`}</style>
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-600 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-cyan-600 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>
      <div className="relative z-10 p-6 md:p-12">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <div className="inline-block mb-4 px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full text-xs font-bold uppercase tracking-wider">
              📊 Poker Pro Tracker
            </div>
            <h1 className="text-6xl md:text-7xl font-black bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent mb-4 leading-tight">
              Master Your Game
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl">Track sessions. Dominate bankroll. Professional poker analytics.</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <div className="lg:col-span-1 group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur-xl opacity-0 group-hover:opacity-75 transition duration-500"></div>
              <div className="relative bg-gradient-to-br from-gray-900 via-gray-900 to-black rounded-2xl p-8 border border-gray-800 backdrop-blur-sm h-full">
                <h2 className="text-2xl font-black text-white mb-6 flex items-center"><span className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded mr-3 flex items-center justify-center">+</span>Log Session</h2>
                <div className="space-y-5">
                  <div>
                    <label className="block text-gray-300 text-xs font-bold uppercase tracking-wider mb-3">Buy-In ($)</label>
                    <input type="number" placeholder="0.00" value={buyIn} onChange={(e) => setBuyIn(e.target.value)} className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition font-semibold" />
                  </div>
                  <div>
                    <label className="block text-gray-300 text-xs font-bold uppercase tracking-wider mb-3">Cash-Out ($)</label>
                    <input type="number" placeholder="0.00" value={cashOut} onChange={(e) => setCashOut(e.target.value)} className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition font-semibold" />
                  </div>
                  <div>
                    <label className="block text-gray-300 text-xs font-bold uppercase tracking-wider mb-3">Notes</label>
                    <input type="text" placeholder="2/5, 4 hrs..." value={notes} onChange={(e) => setNotes(e.target.value)} className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition font-semibold" />
                  </div>
                  <button onClick={handleAddSession} className="w-full mt-6 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-black py-3 px-6 rounded-lg transition duration-200 shadow-2xl hover:shadow-blue-500/50 uppercase text-sm tracking-wider">Log Session</button>
                </div>
              </div>
            </div>
            <div className="lg:col-span-2 grid grid-cols-3 gap-4">
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-400 rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition duration-500"></div>
                <div className="relative bg-gradient-to-br from-blue-950 to-blue-900 rounded-2xl p-6 border border-blue-800 backdrop-blur-sm overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500 rounded-full mix-blend-screen filter blur-2xl opacity-20 -translate-y-1/2 translate-x-1/2"></div>
                  <p className="text-blue-300 text-xs font-bold uppercase tracking-wider mb-3">Buy-In Total</p>
                  <p className="text-4xl font-black text-blue-100">${totalBuyIn.toFixed(2)}</p>
                  <p className="text-blue-400 text-xs mt-2">{sessions.length} sessions logged</p>
                </div>
              </div>
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition duration-500"></div>
                <div className="relative bg-gradient-to-br from-purple-950 to-purple-900 rounded-2xl p-6 border border-purple-800 backdrop-blur-sm overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500 rounded-full mix-blend-screen filter blur-2xl opacity-20 -translate-y-1/2 translate-x-1/2"></div>
                  <p className="text-purple-300 text-xs font-bold uppercase tracking-wider mb-3">Cash-Out Total</p>
                  <p className="text-4xl font-black text-purple-100">${totalCashOut.toFixed(2)}</p>
                  <p className="text-purple-400 text-xs mt-2">Stack depth</p>
                </div>
              </div>
              <div className={`group relative ${totalProfit >= 0 ? '' : ''}`}>
                <div className={`absolute inset-0 bg-gradient-to-r ${totalProfit >= 0 ? 'from-green-600 to-emerald-600' : 'from-red-600 to-orange-600'} rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition duration-500`}></div>
                <div className={`relative bg-gradient-to-br ${totalProfit >= 0 ? 'from-green-950 to-green-900' : 'from-red-950 to-red-900'} rounded-2xl p-6 border ${totalProfit >= 0 ? 'border-green-800' : 'border-red-800'} backdrop-blur-sm overflow-hidden`}>
                  <div className={`absolute top-0 right-0 w-32 h-32 ${totalProfit >= 0 ? 'bg-green-500' : 'bg-red-500'} rounded-full mix-blend-screen filter blur-2xl opacity-20 -translate-y-1/2 translate-x-1/2`}></div>
                  <p className={`${totalProfit >= 0 ? 'text-green-300' : 'text-red-300'} text-xs font-bold uppercase tracking-wider mb-3`}>{totalProfit >= 0 ? 'Profit' : 'Loss'}</p>
                  <p className={`text-4xl font-black ${totalProfit >= 0 ? 'text-green-100' : 'text-red-100'}`}>{totalProfit >= 0 ? '+' : ''}${totalProfit.toFixed(2)}</p>
                  <p className={`${totalProfit >= 0 ? 'text-green-400' : 'text-red-400'} text-xs mt-2`}>{totalProfit >= 0 ? 'Winning' : 'Breaking even'}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition duration-500"></div>
            <div className="relative bg-gradient-to-br from-gray-900 via-gray-900 to-black rounded-2xl p-8 border border-gray-800 backdrop-blur-sm">
              <h2 className="text-3xl font-black text-white mb-8 flex items-center"><span className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></span>Session History</h2>
              {sessions.length === 0 ? (
                <div className="text-center py-16"><p className="text-gray-400 text-lg">No sessions. Start logging to build your bankroll profile.</p></div>
              ) : (
                <div className="space-y-4">
                  {sessions.map((session) => (
                    <div key={session.id} className={`group/item relative overflow-hidden rounded-xl transition-all duration-300 p-6 border ${session.profit >= 0 ? 'bg-gradient-to-r from-green-950/30 to-green-900/20 border-green-800/50 hover:border-green-700' : 'bg-gradient-to-r from-red-950/30 to-red-900/20 border-red-800/50 hover:border-red-700'}`}>
                      <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                        <div className="flex-1">
                          <div className="flex flex-wrap gap-8 mb-4">
                            <div><p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-2">Buy In</p><p className="text-2xl font-black text-white">${session.buyIn.toFixed(2)}</p></div>
                            <div><p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-2">Cash Out</p><p className="text-2xl font-black text-white">${session.cashOut.toFixed(2)}</p></div>
                            <div><p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-2">Result</p><p className={`text-2xl font-black ${session.profit >= 0 ? 'text-green-400' : 'text-red-400'}`}>{session.profit >= 0 ? '+' : ''}${session.profit.toFixed(2)}</p></div>
                          </div>
                          <div className="flex flex-col md:flex-row md:items-center md:gap-6"><p className="text-gray-400 text-sm font-semibold">{session.date}</p><p className="text-gray-300 text-sm">{session.notes}</p></div>
                        </div>
                        <button onClick={() => handleDeleteSession(session.id)} className="bg-red-600/80 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition duration-200 text-sm uppercase tracking-wider">Delete</button>
                      </div>
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

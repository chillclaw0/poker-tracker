
"use client";

import { useState } from "react";

interface Session {
  id: string;
  date: string;
  buyIn: number;
  cashOut: number;
  profit: number;
  notes: string;
}

export default function Home() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [buyIn, setBuyIn] = useState("");
  const [cashOut, setCashOut] = useState("");
  const [notes, setNotes] = useState("");

  const addSession = () => {
    if (!buyIn || !cashOut) return;

    const profit = parseFloat(cashOut) - parseFloat(buyIn);
    const newSession: Session = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString(),
      buyIn: parseFloat(buyIn),
      cashOut: parseFloat(cashOut),
      profit,
      notes,
    };

    setSessions([newSession, ...sessions]);
    setBuyIn("");
    setCashOut("");
    setNotes("");
  };

  const deleteSession = (id: string) => {
    setSessions(sessions.filter((s) => s.id !== id));
  };

  const totalBuyIn = sessions.reduce((sum, s) => sum + s.buyIn, 0);
  const totalCashOut = sessions.reduce((sum, s) => sum + s.cashOut, 0);
  const totalProfit = sessions.reduce((sum, s) => sum + s.profit, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Poker Tracker</h1>
        <p className="text-gray-600 mb-8">Track your poker sessions and manage your bankroll</p>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Add New Session</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <input
              type="number"
              placeholder="Buy-in amount"
              value={buyIn}
              onChange={(e) => setBuyIn(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              placeholder="Cash-out amount"
              value={cashOut}
              onChange={(e) => setCashOut(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Notes (optional)"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={addSession}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition"
          >
            Add Session
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm">Total Buy-In</p>
            <p className="text-3xl font-bold text-gray-800">${totalBuyIn.toFixed(2)}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm">Total Cash-Out</p>
            <p className="text-3xl font-bold text-gray-800">${totalCashOut.toFixed(2)}</p>
          </div>
          <div className={`rounded-lg shadow p-6 ${totalProfit >= 0 ? "bg-green-50" : "bg-red-50"}`}>
            <p className="text-gray-600 text-sm">Total Profit/Loss</p>
            <p className={`text-3xl font-bold ${totalProfit >= 0 ? "text-green-600" : "text-red-600"}`}>
              ${totalProfit.toFixed(2)}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Sessions</h2>
          {sessions.length === 0 ? (
            <p className="text-gray-500">No sessions yet. Add one to get started!</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 px-4 font-semibold text-gray-700">Date</th>
                    <th className="text-left py-2 px-4 font-semibold text-gray-700">Buy-In</th>
                    <th className="text-left py-2 px-4 font-semibold text-gray-700">Cash-Out</th>
                    <th className="text-left py-2 px-4 font-semibold text-gray-700">Profit/Loss</th>
                    <th className="text-left py-2 px-4 font-semibold text-gray-700">Notes</th>
                    <th className="text-left py-2 px-4 font-semibold text-gray-700">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {sessions.map((session) => (
                    <tr key={session.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">{session.date}</td>
                      <td className="py-3 px-4">${session.buyIn.toFixed(2)}</td>
                      <td className="py-3 px-4">${session.cashOut.toFixed(2)}</td>
                      <td className={`py-3 px-4 font-semibold ${session.profit >= 0 ? "text-green-600" : "text-red-600"}`}>
                        ${session.profit.toFixed(2)}
                      </td>
                      <td className="py-3 px-4 text-gray-600">{session.notes || "-"}</td>
                      <td className="py-3 px-4">
                        <button
                          onClick={() => deleteSession(session.id)}
                          className="text-red-600 hover:text-red-800 font-semibold"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

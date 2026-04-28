'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { PokerSession } from '@/lib/types';
import { getSessions, getTotalProfit, getTotalHours, getAverageHourlyRate, getProfit, formatCurrency, formatDate } from '@/lib/utils';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function Dashboard() {
  const [sessions, setSessions] = useState<PokerSession[]>([]);
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    const data = getSessions();
    setSessions(data);

    let cumProfit = 0;
    const sorted = [...data].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    const chart = sorted.map(s => {
      cumProfit += getProfit(s.buyIn, s.cashOut);
      return {
        date: formatDate(s.date),
        profit: cumProfit,
      };
    });
    setChartData(chart);
  }, []);

  const totalProfit = getTotalProfit(sessions);
  const totalHours = getTotalHours(sessions);
  const hourlyRate = getAverageHourlyRate(sessions);
  const recentSessions = [...sessions].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 10);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">Poker Tracker</h1>
          <p className="text-slate-400">Track your sessions and watch your profit grow</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <p className="text-slate-400 text-sm font-medium mb-2">Total Profit</p>
            <p className={`text-3xl font-bold ${totalProfit >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {formatCurrency(totalProfit)}
            </p>
          </div>
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <p className="text-slate-400 text-sm font-medium mb-2">Hourly Rate</p>
            <p className={`text-3xl font-bold ${hourlyRate >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {formatCurrency(hourlyRate)}/hr
            </p>
          </div>
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <p className="text-slate-400 text-sm font-medium mb-2">Hours Played</p>
            <p className="text-3xl font-bold text-blue-400">{totalHours.toFixed(1)}</p>
          </div>
        </div>

        {chartData.length > 0 && (
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 mb-8">
            <h2 className="text-xl font-bold text-white mb-4">Cumulative Profit</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="date" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }} />
                <Line type="monotone" dataKey="profit" stroke="#10b981" strokeWidth={2} dot={{ fill: '#10b981' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}

        <div className="mb-8">
          <Link href="/add-session" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition">
            + Add Session
          </Link>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-white mb-4">Recent Sessions</h2>
          {recentSessions.length === 0 ? (
            <p className="text-slate-400">No sessions yet. Start by adding one!</p>
          ) : (
            <div className="space-y-3">
              {recentSessions.map(session => (
                <Link key={session.id} href={`/session/${session.id}`}>
                  <div className="bg-slate-800 border border-slate-700 hover:border-blue-500 rounded-lg p-4 cursor-pointer transition">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="text-white font-semibold">{session.stakes} Stakes</p>
                        <p className="text-slate-400 text-sm">{formatDate(session.date)}</p>
                      </div>
                      <p className={`text-lg font-bold ${getProfit(session.buyIn, session.cashOut) >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {formatCurrency(getProfit(session.buyIn, session.cashOut))}
                      </p>
                    </div>
                    <p className="text-slate-400 text-sm">{session.hours} hours @ ${session.buyIn} buy-in</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

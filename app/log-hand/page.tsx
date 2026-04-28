'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { PokerSession } from '@/lib/types';
import { getSessions, addHand } from '@/lib/utils';

const POKER_TYPES = ['NL Texas Hold\'em', 'PLO'];
const POSITIONS = ['UTG', 'UTG+1', 'UTG+2', 'MP', 'LJ', 'HJ', 'CO', 'BTN', 'SB', 'BB'];

interface ActionEntry {
  position: string;
  action: 'fold' | 'check' | 'bet' | 'raise' | 'call';
  amount: number;
}

interface StreetData {
  boardCards: string;
  actions: ActionEntry[];
}

function StreetSection({ title, data, onBoardChange, onAddAction, onActionChange, onRemoveAction, showBoard }: any) {
  return (
    <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
      <h2 className="text-xl font-bold text-white mb-4">{title}</h2>

      {showBoard && (
        <div className="mb-4">
          <label className="block text-white font-semibold mb-2">Board Cards</label>
          <input
            type="text"
            value={data.boardCards}
            onChange={(e) => onBoardChange(e.target.value)}
            placeholder="e.g., AsKd9h"
            className="w-full bg-slate-700 border border-slate-600 rounded px-4 py-2 text-white placeholder-slate-400"
          />
        </div>
      )}

      <div className="space-y-4">
        {data.actions.map((action: ActionEntry, index: number) => (
          <div key={index} className="flex gap-2 items-end">
            <div className="flex-1">
              <label className="block text-slate-400 text-sm mb-1">Position</label>
              <select
                value={action.position}
                onChange={(e) => onActionChange(index, 'position', e.target.value)}
                className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-white text-sm"
              >
                {POSITIONS.map(pos => <option key={pos} value={pos}>{pos}</option>)}
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-slate-400 text-sm mb-1">Action</label>
              <select
                value={action.action}
                onChange={(e) => onActionChange(index, 'action', e.target.value)}
                className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-white text-sm"
              >
                <option value="fold">Fold</option>
                <option value="check">Check</option>
                <option value="bet">Bet</option>
                <option value="raise">Raise</option>
                <option value="call">Call</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-slate-400 text-sm mb-1">Amount</label>
              <input
                type="number"
                value={action.amount}
                onChange={(e) => onActionChange(index, 'amount', parseFloat(e.target.value) || 0)}
                className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-white text-sm"
              />
            </div>
            <button
              type="button"
              onClick={() => onRemoveAction(index)}
              className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded text-sm"
            >
              X
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={onAddAction}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm"
        >
          + Add Action
        </button>
      </div>
    </div>
  );
}

export default function HandLogger() {
  const router = useRouter();
  const [sessions, setSessions] = useState<PokerSession[]>([]);
  const [formData, setFormData] = useState({
    pokerType: 'NL Texas Hold\'em',
    tableSize: '6',
    selectedSession: '',
    heroCards: '',
    heroStack: '',
    heroPosition: 'BTN',
    notes: '',
  });

  const [preflop, setPreflop] = useState<StreetData>({
    boardCards: '',
    actions: [{ position: 'BTN', action: 'bet' as const, amount: 0 }],
  });

  const [flop, setFlop] = useState<StreetData>({ boardCards: '', actions: [] });
  const [turn, setTurn] = useState<StreetData>({ boardCards: '', actions: [] });
  const [river, setRiver] = useState<StreetData>({ boardCards: '', actions: [] });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setSessions(getSessions());
  }, []);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const createStreetHandlers = (street: 'preflop' | 'flop' | 'turn' | 'river') => {
    const setters = { preflop: setPreflop, flop: setFlop, turn: setTurn, river: setRiver };
    const getters = { preflop, flop, turn, river };
    const setter = setters[street];
    const getter = getters[street];

    return {
      addAction: () => {
        setter({ ...getter, actions: [...getter.actions, { position: 'BTN', action: 'bet' as const, amount: 0 }] });
      },
      changeAction: (index: number, field: string, value: any) => {
        const updated = [...getter.actions];
        updated[index] = { ...updated[index], [field]: value };
        setter({ ...getter, actions: updated });
      },
      removeAction: (index: number) => {
        setter({ ...getter, actions: getter.actions.filter((_, i) => i !== index) });
      },
      changeBoardCards: (cards: string) => {
        setter({ ...getter, boardCards: cards });
      },
    };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const hand = {
        pokerType: formData.pokerType,
        tableSize: parseInt(formData.tableSize),
        sessionId: formData.selectedSession || undefined,
        heroCards: formData.heroCards,
        heroStack: parseFloat(formData.heroStack),
        heroPosition: formData.heroPosition,
        preflop, flop, turn, river,
        notes: formData.notes,
        timestamp: new Date().toISOString(),
      };
      addHand(hand);
      alert('Hand logged successfully!');
      router.push('/');
    } catch (error) {
      alert('Error logging hand');
      setLoading(false);
    }
  };

  const preflopHandlers = createStreetHandlers('preflop');
  const flopHandlers = createStreetHandlers('flop');
  const turnHandlers = createStreetHandlers('turn');
  const riverHandlers = createStreetHandlers('river');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">Log Hand</h1>
            <p className="text-slate-400">Record the details of a specific hand you played</p>
          </div>
          <Link href="/" className="text-blue-400 hover:text-blue-300">Back</Link>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <h2 className="text-xl font-bold text-white mb-4">Hand Details</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-white font-semibold mb-2">Poker Type</label>
                <select name="pokerType" value={formData.pokerType} onChange={handleFormChange} className="w-full bg-slate-700 border border-slate-600 rounded px-4 py-2 text-white">
                  {POKER_TYPES.map(type => <option key={type} value={type}>{type}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-white font-semibold mb-2">Table Size</label>
                <select name="tableSize" value={formData.tableSize} onChange={handleFormChange} className="w-full bg-slate-700 border border-slate-600 rounded px-4 py-2 text-white">
                  {[2, 3, 4, 5, 6, 8, 9].map(size => <option key={size} value={size}>{size}-max</option>)}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-white font-semibold mb-2">Your Cards</label>
                <input type="text" name="heroCards" value={formData.heroCards} onChange={handleFormChange} placeholder="e.g., AK or AsKd" className="w-full bg-slate-700 border border-slate-600 rounded px-4 py-2 text-white placeholder-slate-400" />
              </div>
              <div>
                <label className="block text-white font-semibold mb-2">Your Stack Size</label>
                <input type="number" name="heroStack" value={formData.heroStack} onChange={handleFormChange} placeholder="e.g., 500" className="w-full bg-slate-700 border border-slate-600 rounded px-4 py-2 text-white placeholder-slate-400" />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-white font-semibold mb-2">Your Position</label>
                <select name="heroPosition" value={formData.heroPosition} onChange={handleFormChange} className="w-full bg-slate-700 border border-slate-600 rounded px-4 py-2 text-white">
                  {POSITIONS.map(pos => <option key={pos} value={pos}>{pos}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-white font-semibold mb-2">Link to Session</label>
                <select name="selectedSession" value={formData.selectedSession} onChange={handleFormChange} className="w-full bg-slate-700 border border-slate-600 rounded px-4 py-2 text-white">
                  <option value="">-- Select a session --</option>
                  {sessions.map(s => <option key={s.id} value={s.id}>{s.stakes} on {s.date}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-white font-semibold mb-2">Notes</label>
              <textarea name="notes" value={formData.notes} onChange={handleFormChange} rows={3} placeholder="Any observations about the hand..." className="w-full bg-slate-700 border border-slate-600 rounded px-4 py-2 text-white placeholder-slate-400" />
            </div>
          </div>

          <StreetSection title="Preflop Action" data={preflop} showBoard={false} onBoardChange={() => {}} onAddAction={preflopHandlers.addAction} onActionChange={preflopHandlers.changeAction} onRemoveAction={preflopHandlers.removeAction} />
          <StreetSection title="Flop" data={flop} showBoard={true} onBoardChange={flopHandlers.changeBoardCards} onAddAction={flopHandlers.addAction} onActionChange={flopHandlers.changeAction} onRemoveAction={flopHandlers.removeAction} />
          <StreetSection title="Turn" data={turn} showBoard={true} onBoardChange={turnHandlers.changeBoardCards} onAddAction={turnHandlers.addAction} onActionChange={turnHandlers.changeAction} onRemoveAction={turnHandlers.removeAction} />
          <StreetSection title="River" data={river} showBoard={true} onBoardChange={riverHandlers.changeBoardCards} onAddAction={riverHandlers.addAction} onActionChange={riverHandlers.changeAction} onRemoveAction={riverHandlers.removeAction} />

          <div className="flex gap-4">
            <button type="submit" disabled={loading} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition disabled:opacity-50">
              {loading ? 'Logging Hand...' : 'Log Hand'}
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

import { PokerSession } from './types';
import { v4 as uuidv4 } from 'uuid';

const STORAGE_KEY = 'poker_sessions';

export const getProfit = (buyIn: number, cashOut: number): number => {
  return cashOut - buyIn;
};

export const getHourlyRate = (profit: number, hours: number): number => {
  if (hours === 0) return 0;
  return profit / hours;
};

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(value);
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString + 'T00:00:00');
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

export const getSessions = (): PokerSession[] => {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveSessions = (sessions: PokerSession[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
};

export const addSession = (formData: {
  date: string;
  stakes: string;
  hours: number;
  buyIn: number;
  cashOut: number;
  notes?: string;
}): PokerSession => {
  const sessions = getSessions();
  const newSession: PokerSession = {
    id: uuidv4(),
    date: formData.date,
    stakes: formData.stakes,
    hours: formData.hours,
    buyIn: formData.buyIn,
    cashOut: formData.cashOut,
    notes: formData.notes || '',
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
  sessions.push(newSession);
  saveSessions(sessions);
  return newSession;
};

export const updateSession = (id: string, updates: Partial<PokerSession>): PokerSession | null => {
  const sessions = getSessions();
  const index = sessions.findIndex(s => s.id === id);
  if (index === -1) return null;
  sessions[index] = {
    ...sessions[index],
    ...updates,
    updatedAt: Date.now(),
  };
  saveSessions(sessions);
  return sessions[index];
};

export const deleteSession = (id: string): void => {
  const sessions = getSessions();
  const filtered = sessions.filter(s => s.id !== id);
  saveSessions(filtered);
};

export const getTotalProfit = (sessions: PokerSession[]): number => {
  return sessions.reduce((sum, s) => sum + getProfit(s.buyIn, s.cashOut), 0);
};

export const getTotalHours = (sessions: PokerSession[]): number => {
  return sessions.reduce((sum, s) => sum + s.hours, 0);
};

export const getAverageHourlyRate = (sessions: PokerSession[]): number => {
  const totalProfit = getTotalProfit(sessions);
  const totalHours = getTotalHours(sessions);
  return getHourlyRate(totalProfit, totalHours);
};

export function getHands(): any[] {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem('poker_hands');
  return data ? JSON.parse(data) : [];
}

export function addHand(hand: any): void {
  const hands = getHands();
  const newHand = {
    ...hand,
    id: Date.now().toString(),
  };
  hands.push(newHand);
  if (typeof window !== 'undefined') {
    localStorage.setItem('poker_hands', JSON.stringify(hands));
  }
}

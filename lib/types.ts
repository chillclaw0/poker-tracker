export interface PokerSession {
  id: string;
  date: string;
  stakes: string;
  hours: number;
  buyIn: number;
  cashOut: number;
  notes?: string;
  createdAt: number;
  updatedAt: number;
}

export interface SessionFormData {
  date: string;
  stakes: string;
  hours: number;
  buyIn: number;
  cashOut: number;
  notes: string;
}

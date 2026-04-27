import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export interface User {
  userId: string;
  username: string;
  role: 'user' | 'admin';
}

export interface MoodEntry {
  id: string;
  userId: string;
  mood: 'happy' | 'sad' | 'neutral' | 'angry';
  note: string;
  createdAt: string;
  username?: string;
}

export interface Stats {
  happy: number;
  sad: number;
  neutral: number;
  angry: number;
}

export const api = {
  login: async (username: string, role: string): Promise<User> => {
    const res = await axios.post(`${API_URL}/auth/login`, { username, role });
    return res.data;
  },

  createMood: async (userId: string, role: string, mood: string, note: string) => {
    const res = await axios.post(`${API_URL}/moods`, { userId, role, mood, note });
    return res.data;
  },

  getMoods: async (userId: string, role: string): Promise<MoodEntry[]> => {
    const res = await axios.get(`${API_URL}/moods`, { params: { userId, role } });
    return res.data;
  },

  deleteMood: async (id: string, role: string) => {
    const res = await axios.delete(`${API_URL}/moods/${id}`, { params: { role } });
    return res.data;
  },

  getStats: async (userId: string, role: string): Promise<Stats> => {
    const res = await axios.get(`${API_URL}/stats`, { params: { userId, role } });
    return res.data;
  },
};

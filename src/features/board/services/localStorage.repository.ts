import { BoardRepository } from './board.repository';
import { BoardState } from '../types';

const STORAGE_KEY = 'trello_clone_board_state';

export class LocalStorageBoardRepository implements BoardRepository {
  getBoardState(): BoardState | null {
    if (typeof window === 'undefined') return null; 
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return null;
    try {
      return JSON.parse(data) as BoardState;
    } catch {
      console.error('Failed to parse board state from localStorage');
      return null;
    }
  }

  saveBoardState(state: BoardState): void {
    if (typeof window === 'undefined') return; 
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      console.error('Failed to save board state to localStorage');
    }
  }
}
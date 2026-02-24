import { BoardState } from '../types';

/**
 * BoardRepository
 * Interface abstraction برای persistence
 */
export interface BoardRepository {
  getBoardState(): BoardState | null;
  saveBoardState(state: BoardState): void;
}
import { BoardState } from '../types';

/**
 * BoardRepository
 * Interface abstraction for persistence
 */
export interface BoardRepository {
  getBoardState(): BoardState | null;
  saveBoardState(state: BoardState): void;
}
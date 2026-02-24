'use client';

import { create } from 'zustand';
import { BoardState } from '../types';
import { BoardService } from './board.service';
import { LocalStorageBoardRepository } from '../services/localStorage.repository';
import { createDemoBoardState } from './demoBord';

const repository = new LocalStorageBoardRepository();

/**
 * Safe initialization (SSR compatible)
 */
const initializeState = (): BoardState => {
  if (typeof window === 'undefined') {
    return createDemoBoardState();
  }

  const persisted = repository.getBoardState();
  return persisted ?? createDemoBoardState();
};

interface BoardStore extends BoardState {
  service: BoardService;
  setState: (newState: BoardState) => void;
}

export const useBoardStore = create<BoardStore>((set) => {
  const initialState = initializeState();

  return {
    ...initialState,

    service: new BoardService(initialState),

    setState: (newState: BoardState) => {
      repository.saveBoardState(newState);

      set({
        ...newState,
        service: new BoardService(newState),
      });
    },
  };
});
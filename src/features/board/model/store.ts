// src/features/board/model/store.ts
'use client';

import { create } from 'zustand';
import { BoardState } from '../types';
import { BoardService } from './board.service';
import { LocalStorageBoardRepository } from '../services/localStorage.repository';
import { createDemoBoardState } from './demoBord';

const repository = new LocalStorageBoardRepository();

interface BoardStore extends BoardState {
  service: BoardService;
  setState: (newState: BoardState) => void;
}

export const useBoardStore = create<BoardStore>((set) => {
  const initialState: BoardState = {
    boards: {},
    lists: {},
    cards: {},
    comments: {},
    activeBoardId: null,
  };

  return {
    ...initialState,
    service: new BoardService(initialState),

    setState: (newState: BoardState) => {
      if (typeof window !== 'undefined') {
        repository.saveBoardState(newState);
      }

      set({
        ...newState,
        service: new BoardService(newState),
      });
    },
  };
});

if (typeof window !== 'undefined') {
  setTimeout(() => {
    const persisted = repository.getBoardState();
    const demoState = createDemoBoardState();
    useBoardStore.getState().setState(persisted ?? demoState);
  }, 0);
}
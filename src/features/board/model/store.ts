import {create} from 'zustand';
import { BoardState } from '../types';
import { BoardService } from './board.service';
import { LocalStorageBoardRepository } from '../services/localStorage.repository';

const repository = new LocalStorageBoardRepository();

const initialState: BoardState = repository.getBoardState() || {
  activeBoardId: null,
  boards: {},
  lists: {},
  cards: {},
  comments: {},
};

interface BoardStore extends BoardState {
  service: BoardService;
  setState: (newState: BoardState) => void;
}

export const useBoardStore = create<BoardStore>((set, get) => {
  const service = new BoardService(initialState);

  return {
    ...initialState,
    service,
    setState: (newState: BoardState) => {
      set({ ...newState, service: new BoardService(newState) });
      repository.saveBoardState(newState);
    },
  };
});

import { BoardState } from '../types';

export const createDemoBoardState = (): BoardState => {
  const boardId = crypto.randomUUID();
  const list1Id = crypto.randomUUID();
  const list2Id = crypto.randomUUID();

  const now = new Date().toISOString();

  return {
    activeBoardId: boardId,

    boards: {
      [boardId]: {
        id: boardId,
        title: 'Demo Board',
        listIds: [list1Id, list2Id],
        createdAt: now,
        updatedAt: now,
      },
    },

    lists: {
      [list1Id]: {
        id: list1Id,
        boardId,
        title: 'To Do',
        cardIds: [],
        createdAt: now,
        updatedAt: now,
      },
      [list2Id]: {
        id: list2Id,
        boardId,
        title: 'In Progress',
        cardIds: [],
        createdAt: now,
        updatedAt: now,
      },
    },

    cards: {},
    comments: {},
  };
};
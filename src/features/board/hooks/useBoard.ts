'use client';
import { useCallback } from 'react';
import { useBoardStore } from '../model/store';
import { BoardState, ID, Card, List, Comment } from '../types';

/**
 * useBoard
 * Composed hook for UI components to interact with Board feature
 */
export const useBoard = () => {
  const { activeBoardId, boards, lists, cards, comments, service, setState } = useBoardStore();
  const activeBoard = activeBoardId ? boards[activeBoardId] : null;

  /** Generic state updater */
  const updateState = useCallback(
    (updater: (prev: BoardState) => BoardState) => {
      setState(updater({ activeBoardId, boards, lists, cards, comments }));
    },
    [activeBoardId, boards, lists, cards, comments, setState]
  );

  /** Board actions */
  const editBoardTitle = useCallback(
    (title: string) => {
      if (!activeBoardId) return;
      updateState(prev => service.updateBoardTitle(activeBoardId, title));
    },
    [service, activeBoardId, updateState]
  );

  /** List actions */
  const addList = useCallback(
    (title: string) => {
      if (!activeBoardId) return;
      const newList: List = {
        id: crypto.randomUUID(),
        boardId: activeBoardId,
        title,
        cardIds: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      updateState(prev => service.createList(activeBoardId, newList));
    },
    [service, activeBoardId, updateState]
  );

  const editListTitle = useCallback(
    (listId: ID, title: string) => {
      updateState(prev => {
        const list = prev.lists[listId];
        if (!list) return prev;
        return service.updateListTitle(listId, title); // متد در BoardService اضافه می‌کنیم
      });
    },
    [service, updateState]
  );

  const deleteList = useCallback(
    (listId: ID) => updateState(prev => service.deleteList(listId)),
    [service, updateState]
  );

  const reorderLists = useCallback(
    (startIndex: number, endIndex: number) => {
      if (!activeBoardId) return;
      updateState(prev => service.reorderLists(activeBoardId, startIndex, endIndex));
    },
    [service, activeBoardId, updateState]
  );

  const deleteAllCards = useCallback(
    (listId: ID) => updateState(prev => service.deleteAllCards(listId)),
    [service, updateState]
  );

  /** Card actions */
  const addCard = useCallback(
    (listId: ID, title: string) => {
      const newCard: Card = {
        id: crypto.randomUUID(),
        listId,
        title,
        commentIds: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      updateState(prev => service.createCard(listId, newCard));
    },
    [service, updateState]
  );

  const editCardTitle = useCallback(
    (cardId: ID, title: string) => updateState(prev => service.updateCardTitle(cardId, title)),
    [service, updateState]
  );

  const deleteCard = useCallback(
    (cardId: ID) => updateState(prev => service.deleteCard(cardId)), // متد deleteCard در BoardService اضافه می‌کنیم
    [service, updateState]
  );

  const moveCard = useCallback(
    (cardId: ID, sourceListId: ID, destListId: ID, destIndex: number) =>
      updateState(prev => service.moveCard(cardId, sourceListId, destListId, destIndex)),
    [service, updateState]
  );

  const reorderCards = useCallback(
    (listId: ID, startIndex: number, endIndex: number) =>
      updateState(prev => service.reorderCards(listId, startIndex, endIndex)),
    [service, updateState]
  );

  /** Comment actions */
  const addComment = useCallback(
    (cardId: ID, content: string) => {
      const newComment: Comment = {
        id: crypto.randomUUID(),
        cardId,
        content,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      updateState(prev => service.addComment(cardId, newComment));
    },
    [service, updateState]
  );

  const deleteComment = useCallback(
    (commentId: ID) => updateState(prev => service.deleteComment(commentId)),
    [service, updateState]
  );

  return {
    activeBoard,
    boards,
    lists,
    cards,
    comments,
    editBoardTitle,
    addList,
    editListTitle,
    deleteList,
    reorderLists,
    addCard,
    editCardTitle,
    deleteCard,
    moveCard,
    reorderCards,
    deleteAllCards,
    addComment,
    deleteComment,
  };
};
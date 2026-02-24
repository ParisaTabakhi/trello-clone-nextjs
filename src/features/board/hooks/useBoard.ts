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
      updateState(prev => service.updateBoardTitle(prev.activeBoardId!, title));
    },
    [service, updateState]
  );

  /** List actions */
  const addList = useCallback(
    (list: List) => {
      updateState(prev => service.createList(prev.activeBoardId!, list));
    },
    [service, updateState]
  );

  const deleteList = useCallback(
    (listId: ID) => {
      updateState(prev => service.deleteList(listId));
    },
    [service, updateState]
  );

  const reorderLists = useCallback(
    (startIndex: number, endIndex: number) => {
      if (!activeBoardId) return;
      updateState(prev => service.reorderLists(activeBoardId, startIndex, endIndex));
    },
    [service, activeBoardId, updateState]
  );

  /** Card actions */
  const addCard = useCallback(
    (card: Card) => {
      updateState(prev => service.createCard(card.listId, card));
    },
    [service, updateState]
  );

  const editCardTitle = useCallback(
    (cardId: ID, title: string) => {
      updateState(prev => service.updateCardTitle(cardId, title));
    },
    [service, updateState]
  );

  const moveCard = useCallback(
    (cardId: ID, sourceListId: ID, destListId: ID, destIndex: number) => {
      updateState(prev => service.moveCard(cardId, sourceListId, destListId, destIndex));
    },
    [service, updateState]
  );

  const reorderCards = useCallback(
    (listId: ID, startIndex: number, endIndex: number) => {
      updateState(prev => service.reorderCards(listId, startIndex, endIndex));
    },
    [service, updateState]
  );

  const deleteAllCards = useCallback(
    (listId: ID) => {
      updateState(prev => service.deleteAllCards(listId));
    },
    [service, updateState]
  );

  /** Comment actions */
  const addComment = useCallback(
    (comment: Comment) => {
      updateState(prev => service.addComment(comment.cardId, comment));
    },
    [service, updateState]
  );

  const deleteComment = useCallback(
    (commentId: ID) => {
      updateState(prev => service.deleteComment(commentId));
    },
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
    deleteList,
    reorderLists,
    addCard,
    editCardTitle,
    moveCard,
    reorderCards,
    deleteAllCards,
    addComment,
    deleteComment,
  };
};
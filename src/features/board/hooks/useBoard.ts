'use client';
import { useCallback, useMemo } from 'react';
import { useBoardStore } from '../model/store';
import { createList, createCard, createComment ,BoardState , ID } from '../types';

export const useBoard = () => {
  const store = useBoardStore();
  
  const activeBoard = useMemo(
    () => (store.activeBoardId ? store.boards[store.activeBoardId] : null),
    [store.activeBoardId, store.boards]
  );

  /**
   * Generic state updater
   */
  const updateState = useCallback(
    (updater: (prev: BoardState) => BoardState) => {
      store.setState(updater({
        activeBoardId: store.activeBoardId,
        boards: store.boards,
        lists: store.lists,
        cards: store.cards,
        comments: store.comments
      }));
    },
    [store]
  );

  // ===================== Board Actions =====================
  const editBoardTitle = useCallback(
    (title: string) => {
      if (!store.activeBoardId) return;
      updateState(prev => store.service.updateBoardTitle(store.activeBoardId!, title));
    },
    [store.activeBoardId, store.service, updateState]
  );

  // ===================== List Actions =====================
  const addList = useCallback(
    (title: string) => {
      if (!store.activeBoardId) return;
      const newList = createList(store.activeBoardId, title);
      updateState(prev => store.service.createList(store.activeBoardId!, newList));
    },
    [store.activeBoardId, store.service, updateState]
  );

  const editListTitle = useCallback(
    (listId: ID, title: string) => {
      updateState(prev => {
        if (!prev.lists[listId]) return prev;
        return store.service.updateListTitle(listId, title);
      });
    },
    [store.service, updateState]
  );

  const deleteList = useCallback(
    (listId: ID) => updateState(prev => store.service.deleteList(listId)),
    [store.service, updateState]
  );

  const reorderLists = useCallback(
    (startIndex: number, endIndex: number) => {
      if (!store.activeBoardId) return;
      updateState(prev => store.service.reorderLists(store.activeBoardId!, startIndex, endIndex));
    },
    [store.activeBoardId, store.service, updateState]
  );

  const deleteAllCards = useCallback(
    (listId: ID) => updateState(prev => store.service.deleteAllCards(listId)),
    [store.service, updateState]
  );

  // ===================== Card Actions =====================
  const addCard = useCallback(
    (listId: ID, title: string) => {
      const newCard = createCard(listId, title);
      updateState(prev => store.service.createCard(listId, newCard));
    },
    [store.service, updateState]
  );

  const editCardTitle = useCallback(
    (cardId: ID, title: string) => 
      updateState(prev => store.service.updateCardTitle(cardId, title)),
    [store.service, updateState]
  );

  const deleteCard = useCallback(
    (cardId: ID) => updateState(prev => store.service.deleteCard(cardId)),
    [store.service, updateState]
  );

  const moveCard = useCallback(
    (cardId: ID, sourceListId: ID, destListId: ID, destIndex: number) =>
      updateState(prev => store.service.moveCard(cardId, sourceListId, destListId, destIndex)),
    [store.service, updateState]
  );

  const reorderCards = useCallback(
    (listId: ID, startIndex: number, endIndex: number) =>
      updateState(prev => store.service.reorderCards(listId, startIndex, endIndex)),
    [store.service, updateState]
  );

  // ===================== Comment Actions =====================
  const addComment = useCallback(
    (cardId: ID, content: string) => {
      const newComment = createComment(cardId, content);
      updateState(prev => store.service.addComment(cardId, newComment));
    },
    [store.service, updateState]
  );

  const deleteComment = useCallback(
    (commentId: ID) => updateState(prev => store.service.deleteComment(commentId)),
    [store.service, updateState]
  );

  return useMemo(
    () => ({
      // State
      activeBoard,
      boards: store.boards,
      lists: store.lists,
      cards: store.cards,
      comments: store.comments,
      
      // Board Actions
      editBoardTitle,
      
      // List Actions
      addList,
      editListTitle,
      deleteList,
      reorderLists,
      deleteAllCards,
      
      // Card Actions
      addCard,
      editCardTitle,
      deleteCard,
      moveCard,
      reorderCards,
      
      // Comment Actions
      addComment,
      deleteComment,
    }),
    [
      // State dependencies
      activeBoard,
      store.boards,
      store.lists,
      store.cards,
      store.comments,
      
      // Action dependencies
      editBoardTitle,
      addList,
      editListTitle,
      deleteList,
      reorderLists,
      deleteAllCards,
      addCard,
      editCardTitle,
      deleteCard,
      moveCard,
      reorderCards,
      addComment,
      deleteComment,
    ]
  );
};
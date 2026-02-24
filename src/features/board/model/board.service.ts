import { Board, List, Card, Comment, BoardState, ID } from '../types';
import { reorderArray, moveItemBetweenArrays } from '../lib/reorder.util';

/**
 * BoardService
 * Pure Domain Service
 */
export class BoardService {
  constructor(private state: BoardState) {}

  // ===================== Board =====================
  updateBoardTitle(boardId: ID, title: string): BoardState {
    const board = this.state.boards[boardId];
    if (!board) throw new Error(`Board ${boardId} not found`);
    return {
      ...this.state,
      boards: {
        ...this.state.boards,
        [boardId]: { ...board, title },
      },
    };
  }

  // ===================== List =====================
  createList(boardId: ID, newList: List): BoardState {
    return {
      ...this.state,
      lists: { ...this.state.lists, [newList.id]: newList },
      boards: {
        ...this.state.boards,
        [boardId]: {
          ...this.state.boards[boardId],
          listIds: [...this.state.boards[boardId].listIds, newList.id],
        },
      },
    };
  }

  deleteList(listId: ID): BoardState {
    const list = this.state.lists[listId];
    if (!list) return this.state;

    // Remove all cards in list
    const updatedCards = { ...this.state.cards };
    list.cardIds.forEach((cardId) => delete updatedCards[cardId]);

    const updatedLists = { ...this.state.lists };
    delete updatedLists[listId];

    const board = this.state.boards[list.boardId];

    return {
      ...this.state,
      lists: updatedLists,
      cards: updatedCards,
      boards: {
        ...this.state.boards,
        [board.id]: {
          ...board,
          listIds: board.listIds.filter((id) => id !== listId),
        },
      },
    };
  }

  reorderLists(boardId: ID, startIndex: number, endIndex: number): BoardState {
    const board = this.state.boards[boardId];
    if (!board) throw new Error(`Board ${boardId} not found`);
    return {
      ...this.state,
      boards: {
        ...this.state.boards,
        [boardId]: {
          ...board,
          listIds: reorderArray(board.listIds, startIndex, endIndex),
        },
      },
    };
  }

  // ===================== Card =====================
  createCard(listId: ID, card: Card): BoardState {
    const list = this.state.lists[listId];
    if (!list) throw new Error(`List ${listId} not found`);
    return {
      ...this.state,
      cards: { ...this.state.cards, [card.id]: card },
      lists: {
        ...this.state.lists,
        [listId]: { ...list, cardIds: [...list.cardIds, card.id] },
      },
    };
  }

  updateCardTitle(cardId: ID, title: string): BoardState {
    const card = this.state.cards[cardId];
    if (!card) throw new Error(`Card ${cardId} not found`);
    return {
      ...this.state,
      cards: {
        ...this.state.cards,
        [cardId]: { ...card, title },
      },
    };
  }

  moveCard(
    cardId: ID,
    sourceListId: ID,
    destListId: ID,
    destIndex: number
  ): BoardState {
    const sourceList = this.state.lists[sourceListId];
    const destList = this.state.lists[destListId];
    if (!sourceList || !destList) throw new Error(`List not found`);
    if (!this.state.cards[cardId]) throw new Error(`Card ${cardId} not found`);

    const { source: newSourceCards, destination: newDestCards } = moveItemBetweenArrays(
      sourceList.cardIds,
      destList.cardIds,
      sourceList.cardIds.indexOf(cardId),
      destIndex
    );

    return {
      ...this.state,
      lists: {
        ...this.state.lists,
        [sourceListId]: { ...sourceList, cardIds: newSourceCards },
        [destListId]: { ...destList, cardIds: newDestCards },
      },
    };
  }

  reorderCards(listId: ID, startIndex: number, endIndex: number): BoardState {
    const list = this.state.lists[listId];
    if (!list) throw new Error(`List ${listId} not found`);
    return {
      ...this.state,
      lists: {
        ...this.state.lists,
        [listId]: {
          ...list,
          cardIds: reorderArray(list.cardIds, startIndex, endIndex),
        },
      },
    };
  }

  deleteAllCards(listId: ID): BoardState {
    const list = this.state.lists[listId];
    if (!list) throw new Error(`List ${listId} not found`);
    const updatedCards = { ...this.state.cards };
    list.cardIds.forEach((cardId) => delete updatedCards[cardId]);
    return {
      ...this.state,
      cards: updatedCards,
      lists: {
        ...this.state.lists,
        [listId]: { ...list, cardIds: [] },
      },
    };
  }

  // ===================== Comment =====================
  addComment(cardId: ID, comment: Comment): BoardState {
    const card = this.state.cards[cardId];
    if (!card) throw new Error(`Card ${cardId} not found`);
    return {
      ...this.state,
      comments: { ...this.state.comments, [comment.id]: comment },
      cards: {
        ...this.state.cards,
        [cardId]: { ...card, commentIds: [...card.commentIds, comment.id] },
      },
    };
  }

  deleteComment(commentId: ID): BoardState {
    const comment = this.state.comments[commentId];
    if (!comment) throw new Error(`Comment ${commentId} not found`);
    const card = this.state.cards[comment.cardId];
    if (!card) throw new Error(`Card ${comment.cardId} not found`);

    const updatedComments = { ...this.state.comments };
    delete updatedComments[commentId];

    return {
      ...this.state,
      comments: updatedComments,
      cards: {
        ...this.state.cards,
        [card.id]: { ...card, commentIds: card.commentIds.filter((id) => id !== commentId) },
      },
    };
  }
}
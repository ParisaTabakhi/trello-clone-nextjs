// Primitive & Utility Types

export type ID = string;

export type ISODateString = string;

export type DragItemType = 'LIST' | 'CARD';


// Base Entity (for consistency)

export interface BaseEntity {
  id: ID;
  createdAt: ISODateString;
  updatedAt: ISODateString;
}


// Comment Entity

export interface Comment extends BaseEntity {
  cardId: ID;
  content: string;
}


// Card Entity

export interface Card extends BaseEntity {
  listId: ID;
  title: string;
  commentIds: ID[];
}


// List Entity

export interface List extends BaseEntity {
  boardId: ID;
  title: string;
  cardIds: ID[];
}


// Board Entity

export interface Board extends BaseEntity {
  title: string;
  listIds: ID[];
}


// Normalized State Shape

export interface BoardEntities {
  boards: Record<ID, Board>;
  lists: Record<ID, List>;
  cards: Record<ID, Card>;
  comments: Record<ID, Comment>;
}


// Root Feature State

export interface BoardState extends BoardEntities {
  activeBoardId: ID | null;
}
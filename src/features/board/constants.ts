import { DragItemType, ID } from './types';

// LocalStorage Key
export const BOARD_STORAGE_KEY = 'trello_clone_board_state';

// Demo Board Default
export const DEMO_BOARD_ID: ID = 'board-1';

export const DEMO_BOARD_TITLE = 'Demo Board';

// Default Lists
export const DEMO_LISTS = [
  { id: 'list-1', title: 'To Do' },
  { id: 'list-2', title: 'In Progress' },
  { id: 'list-3', title: 'Done' },
];

// Default Colors (can use in SCSS variables later)
export const LIST_BG_COLORS = ['#F0F0F0', '#E8E8E8', '#FFFFFF'];

// Drag & Drop Types
export const DRAG_ITEM_TYPES: Record<DragItemType, DragItemType> = {
  LIST: 'LIST',
  CARD: 'CARD',
};
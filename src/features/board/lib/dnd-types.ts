import { UniqueIdentifier } from '@dnd-kit/core';

export type DragItemType = 'list' | 'card';

export interface DragItemData {
  type: DragItemType;
  id: string;
  listId?: string; 
  index: number;
}

export interface DragActiveItem {
  id: UniqueIdentifier;
  data: DragItemData;
}

export interface DragOverEvent {
  activeId: UniqueIdentifier;
  overId: UniqueIdentifier | null;
  activeData: DragItemData;
  overData?: DragItemData;
}

export interface DragEndEvent {
  activeId: UniqueIdentifier;
  overId: UniqueIdentifier | null;
  activeData: DragItemData;
  overData?: DragItemData;
}

// DND-Kit specific types
export interface DndKitSensorOptions {
  activationConstraint?: {
    delay?: number;
    tolerance?: number;
    distance?: number;
  };
}
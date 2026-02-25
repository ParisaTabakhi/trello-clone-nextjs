'use client';

import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { List as ListType } from '../../types';
import { List } from '../../ui/List';

interface SortableListProps {
  list: ListType;
  index: number;
}

/**
 * SortableList Component
 * Single Responsibility: Wraps a list with DnD sortable functionality
 * Open/Closed: Open for extension via props, closed for modification
 */
export const SortableList: React.FC<SortableListProps> = ({ list, index }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: list.id,
    data: {
      type: 'list',
      id: list.id,
      index,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    height: 'fit-content',
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`sortable-list ${isDragging ? 'is-dragging' : ''}`}
    >
      <List list={list} />
    </div>
  );
};
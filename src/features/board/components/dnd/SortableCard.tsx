'use client';

import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Card as CardType } from '../../types';
import { Card } from '../../ui/Card';

interface SortableCardProps {
  card: CardType;
  index: number;
  listId: string;
}

/**
 * SortableCard Component
 * Single Responsibility: Wraps a card with DnD sortable functionality
 * Interface Segregation: Only receives props it needs
 */
export const SortableCard: React.FC<SortableCardProps> = ({ 
  card, 
  index, 
  listId 
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: card.id,
    data: {
      type: 'card',
      id: card.id,
      listId,
      index,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    marginBottom: '8px',
    cursor: isDragging ? 'grabbing' : 'grab',
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`sortable-card ${isDragging ? 'is-dragging' : ''}`}
    >
      <Card card={card} />
    </div>
  );
};
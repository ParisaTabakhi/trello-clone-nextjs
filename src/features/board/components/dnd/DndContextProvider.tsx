'use client';

import React from 'react';
import {
  DndContext,
  closestCenter,
  MeasuringStrategy,
} from '@dnd-kit/core';
import { useDndSensors } from '../../hooks/useDndSensors';
import { useDndHandlers } from '../../hooks/useDndHandlers';

interface DndContextProviderProps {
  children: React.ReactNode;
  listsCount: number;
}

/**
 * DndContextProvider Component
 * Single Responsibility: Provides DnD context to children
 * Dependency Inversion: Depends on hooks abstractions
 * Liskov Substitution: Can be replaced with any DnD provider
 */
export const DndContextProvider: React.FC<DndContextProviderProps> = ({ 
  children, 
  listsCount 
}) => {
  const sensors = useDndSensors();
  const { handleDragStart, handleDragOver, handleDragEnd } = useDndHandlers();

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      measuring={{
        droppable: {
          strategy: MeasuringStrategy.Always,
        },
      }}
    >
      {children}
    </DndContext>
  );
};
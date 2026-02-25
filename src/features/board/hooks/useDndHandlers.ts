'use client';

import { useCallback } from 'react';
import { DragEndEvent, DragOverEvent, DragStartEvent } from '@dnd-kit/core';
import { useBoard } from './useBoard';
import { DragItemData } from '../lib/dnd-types';

export const useDndHandlers = () => {
  const { moveCard, reorderCards, reorderLists, lists } = useBoard();
  
  // Track active drag item
  const handleDragStart = useCallback((event: DragStartEvent) => {
    const { active } = event;
    document.body.style.cursor = 'grabbing';
  }, []);

  // Handle drag over for visual feedback (like active drop zones)
  const handleDragOver = useCallback((event: DragOverEvent) => {
    const { active, over } = event;
    
    if (!over) return;
    
    const activeData = active.data.current as DragItemData;
    const overData = over.data.current as DragItemData;
    
    // You can add visual feedback here if needed
  }, []);

  // Main drag end handler
  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;
    
    // Reset cursor
    document.body.style.cursor = '';
    
    // If no drop target, do nothing
    if (!over) return;
    
    // If dropped on same position, do nothing
    if (active.id === over.id) return;
    
    const activeData = active.data.current as DragItemData;
    const overData = over.data.current as DragItemData;
    
    if (!activeData || !overData) return;
    
    // Handle List drag & drop
    if (activeData.type === 'list' && overData.type === 'list') {
      reorderLists(activeData.index, overData.index);
      return;
    }
    
    // Handle Card drag & drop
    if (activeData.type === 'card' && overData.type === 'card') {
      const activeListId = activeData.listId;
      const overListId = overData.listId;
      
      if (!activeListId || !overListId) return;
      
      // If moving within the same list
      if (activeListId === overListId) {
        reorderCards(activeListId, activeData.index, overData.index);
      } 
      // If moving to a different list
      else {
        moveCard(
          active.id as string,
          activeListId,
          overListId,
          overData.index
        );
      }
      return;
    }
    
    // Handle Card dropped on List (به عنوان آخرین آیتم لیست)
    if (activeData.type === 'card' && overData.type === 'list') {
      const activeListId = activeData.listId;
      const targetListId = over.id as string;
      
      if (!activeListId || !targetListId) return;
      
      // Get the target list to find its card count
      const targetList = lists[targetListId];
      if (!targetList) return;
      
      // Move card to the end of the target list
      moveCard(
        active.id as string,
        activeListId,
        targetListId,
        targetList.cardIds.length // Insert at the end
      );
    }
  }, [reorderLists, reorderCards, moveCard, lists]);

  return {
    handleDragStart,
    handleDragOver,
    handleDragEnd,
  };
};
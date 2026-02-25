"use client";

import React from "react";
import { useBoard } from "../hooks/useBoard";
import { List as ListType } from "../types";
import { ListActionsMenu } from "./ListActionsMenu";
import { InlineCreate } from "./InlineCreate";
import { SortableCard } from "../components/dnd/SortableCard";
import "../styles/_list.scss";
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useDroppable } from '@dnd-kit/core';

interface ListProps {
  list: ListType;
}

export const List: React.FC<ListProps> = ({ list }) => {
  const { cards, addCard, deleteList, deleteAllCards, editListTitle } = useBoard();
  const listCards = list.cardIds.map((cardId) => cards[cardId]);
  
  // Make the list a droppable area
  const { setNodeRef, isOver } = useDroppable({
    id: list.id,
    data: {
      type: 'list',
      id: list.id,
      accepts: ['card'],
    },
  });

  const handleTitleEdit = () => {
    const newTitle = prompt("Edit list title", list.title);
    if (newTitle && newTitle !== list.title) editListTitle(list.id, newTitle);
  };

  return (
    <div 
      ref={setNodeRef}
      className={`list ${isOver ? 'drag-over' : ''}`}
    >
      <div className="list-header">
        <h3 className="list-title" onClick={handleTitleEdit}>
          {list.title}
        </h3>

        <ListActionsMenu
          onDeleteAll={() => deleteAllCards(list.id)}
          onDeleteList={() => deleteList(list.id)}
        />
      </div>

      <div className="list-cards">
        <SortableContext
          items={list.cardIds}
          strategy={verticalListSortingStrategy}
        >
          {listCards.map((card, index) => (
            <SortableCard 
              key={card.id} 
              card={card} 
              index={index}
              listId={list.id}
            />
          ))}
        </SortableContext>
      </div>

      <InlineCreate
        triggerLabel="+ Add Card"
        placeholder="Enter card title..."
        confirmLabel="Create Card"
        onCreate={(title) => addCard(list.id, title)}
      />
    </div>
  );
};
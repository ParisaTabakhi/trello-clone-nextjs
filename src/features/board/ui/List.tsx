"use client";

import React from "react";
import { Card } from "./Card";
import { useBoard } from "../hooks/useBoard";
import { List as ListType } from "../types";
import { ListActionsMenu } from "./ListActionsMenu";
import { InlineCreate } from "./InlineCreate";
import "../styles/_list.scss";

interface ListProps {
  list: ListType;
}

export const List: React.FC<ListProps> = ({ list }) => {
  const { cards, addCard, deleteList, deleteAllCards, editListTitle } = useBoard();
  const listCards = list.cardIds.map((cardId) => cards[cardId]);

  const handleTitleEdit = () => {
    const newTitle = prompt("Edit list title", list.title);
    if (newTitle && newTitle !== list.title) editListTitle(list.id, newTitle);
  };

  return (
    <div className="list">
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
        {listCards.map((card) => (
          <Card key={card.id} card={card} />
        ))}
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
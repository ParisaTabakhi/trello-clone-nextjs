"use client";

import React from "react";
import { useBoard } from "../hooks/useBoard";
import { List } from "./List";
import { InlineCreate } from "./InlineCreate";
import "../styles/_board.scss";

export const Board: React.FC = () => {
  const { activeBoard, lists, addList } = useBoard();

  if (!activeBoard) return <div className="board-empty">No board selected</div>;

  const boardLists = activeBoard.listIds.map((listId) => lists[listId]);

  return (
    <div className="board">
      <h2 className="board-title">{activeBoard.title}</h2>

      <div className="board-lists">
        {boardLists.map((list) => (
          <List key={list.id} list={list} />
        ))}

        <div className="add-list-container">
          <InlineCreate
            triggerLabel="+ Add Another List"
            placeholder="Enter list title..."
            confirmLabel="Create List"
            onCreate={(title) => addList(title)}
          />
        </div>
      </div>
    </div>
  );
};
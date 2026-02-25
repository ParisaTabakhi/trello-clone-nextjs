"use client";

import React from "react";
import { useBoard } from "../hooks/useBoard";
import { SortableList } from "../components/dnd/SortableList";
import { DndContextProvider } from "../components/dnd/DndContextProvider";
import { InlineCreate } from "./InlineCreate";
import "../styles/_board.scss";
import {
  SortableContext,
  horizontalListSortingStrategy,
} from '@dnd-kit/sortable';

export const Board: React.FC = () => {
  const { activeBoard, lists, addList } = useBoard();

  if (!activeBoard) return <div className="board-empty">No board selected</div>;

  const boardLists = activeBoard.listIds.map((listId) => lists[listId]);

  return (
    <div className="board">
      <h2 className="board-title">{activeBoard.title}</h2>

      <DndContextProvider listsCount={boardLists.length}>
        <div className="board-lists">
          <SortableContext
            items={activeBoard.listIds}
            strategy={horizontalListSortingStrategy}
          >
            {boardLists.map((list, index) => (
              <SortableList key={list.id} list={list} index={index} />
            ))}
          </SortableContext>

          <div className="add-list-container">
            <InlineCreate
              triggerLabel="+ Add Another List"
              placeholder="Enter list title..."
              confirmLabel="Create List"
              onCreate={(title) => addList(title)}
            />
          </div>
        </div>
      </DndContextProvider>
    </div>
  );
};
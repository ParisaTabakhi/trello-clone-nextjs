"use client";

import React, { useState, useRef, useEffect } from "react";
import { Button } from "../../../shared/components/Button/Button";
import "../styles/_list.scss";

interface ListActionsMenuProps {
  onDeleteAll: () => void;
  onDeleteList: () => void;
}

type ActionType = "deleteAll" | "deleteList" | null;

export const ListActionsMenu: React.FC<ListActionsMenuProps> = ({
  onDeleteAll,
  onDeleteList,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState<ActionType>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setConfirmAction(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleConfirm = () => {
    if (confirmAction === "deleteAll") onDeleteAll();
    if (confirmAction === "deleteList") onDeleteList();

    setConfirmAction(null);
    setIsOpen(false);
  };

  return (
    <div className="list-menu" ref={menuRef}>
      <Button
        variant="inline"
        size="sm"
        className="list-menu-trigger"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        ⋯
      </Button>

      {isOpen && (
        <div className="list-menu-popover">
          {!confirmAction && (
            <>
              <Button
                variant="danger"
                size="sm"
                className="menu-item"
                onClick={() => setConfirmAction("deleteAll")}
              >
                Delete all cards
              </Button>

              <Button
                variant="danger"
                size="sm"
                className="menu-item"
                onClick={() => setConfirmAction("deleteList")}
              >
                Delete list
              </Button>
            </>
          )}

          {confirmAction && (
            <div className="confirm-box">
              <p className="confirm-text">Are you sure?</p>
              <div className="confirm-actions">
                <Button
                  variant="danger"
                  size="sm"
                  onClick={handleConfirm}
                >
                  Confirm
                </Button>

                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setConfirmAction(null)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
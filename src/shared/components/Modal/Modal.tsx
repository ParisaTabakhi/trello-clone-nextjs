"use client";

import React, { ReactNode } from "react";
import { Button } from "../Button/Button";
import "./_modal.scss";

interface ModalProps {
  isOpen: boolean;
  title?: string;
  onClose: () => void;
  children: ReactNode;
  showCloseButton?: boolean;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  title,
  onClose,
  children,
  showCloseButton = true,
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()} // Prevent closing modal when clicking inside
      >
        {title && (
          <div className="modal-header">
            <h3>{title}</h3>
            {showCloseButton && (
              <Button variant="inline" size="sm" onClick={onClose}>
                ✕
              </Button>
            )}
          </div>
        )}

        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
};
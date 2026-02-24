import React, { useState } from "react";
import { Card, Comment } from "../types";
import { Button } from "../../../shared/components/Button/Button";
import { Modal } from "../../../shared/components/Modal/Modal";
import { Input } from "../../../shared/components/Input/Input";
import "../styles/_modal.scss";

interface CardModalProps {
  card: Card;
  comments: Comment[];
  onClose: () => void;
  onAddComment: (content: string) => void;
}

export const CardModal: React.FC<CardModalProps> = ({
  card,
  comments,
  onClose,
  onAddComment,
}) => {
  const [newComment, setNewComment] = useState("");

  const handleAddComment = () => {
    const trimmed = newComment.trim();
    if (!trimmed) return;
    onAddComment(trimmed);
    setNewComment("");
  };

  return (
    <Modal isOpen={true} onClose={onClose} title={card.title}>
      <div className="comments-list">
        {comments.map((comment) => (
          <div key={comment.id} className="comment-item">
            {comment.content}
          </div>
        ))}
      </div>

      <Input
        value={newComment}
        onChange={setNewComment}
        onSubmit={handleAddComment}
        autoFocus
        submitLabel="Add"
      />
    </Modal>
  );
};
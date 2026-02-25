"use client";

import React from 'react';
import { Card as CardType } from '../types';
import { useBoard } from '../hooks/useBoard';
import { CardModal } from './CardModal';
import '../styles/_card.scss';

interface CardProps {
  card: CardType;
}

export const Card: React.FC<CardProps> = ({ card }) => {
  const { comments, addComment } = useBoard();
  const cardComments = card.commentIds.map((id) => comments[id]);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  return (
    <>
      <div className="card">
        <div className="card-header">
          <span className="card-title">{card.title}</span>
        </div>
        <div className="card-badge" onClick={() => setIsModalOpen(true)}>
          <span>comments</span>
          {card.commentIds.length}
        </div>
      </div>

      {isModalOpen && (
        <CardModal
          card={card}
          comments={cardComments}
          onClose={() => setIsModalOpen(false)}
          onAddComment={(content) => addComment(card.id, content)}
        />
      )}
    </>
  );
};
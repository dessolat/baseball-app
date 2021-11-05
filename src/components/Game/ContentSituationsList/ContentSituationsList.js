import React from 'react';
import cl from './ContentSituationsList.module.scss';
import ContentSituationsListItem from '../ContentSituationsListItem/ContentSituationsListItem';

const ContentSituationsList = ({ cards, currentCard, setCurrentCard }) => {
  const situationClick = (player, number) => {
    if (currentCard.row_number !== number) {
      setCurrentCard({ ...player, row_number: number });
      return;
    }
    setCurrentCard({});
  };

  return (
    <ul className={cl.list}>
      {cards.map((card, i) => (
        <ContentSituationsListItem
          key={card.inning_number + ' ' + card.who}
          player={card}
          number={i}
          situationClick={situationClick}
          currentCard={currentCard}
        />
      ))}
    </ul>
  );
};

export default ContentSituationsList;

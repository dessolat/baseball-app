import React from 'react';
import cl from './ContentSituationsList.module.scss';
import ContentSituationsListItem from '../ContentSituationsListItem/ContentSituationsListItem';

const ContentSituationsList = ({ innings, inningNumber }) => {
  const cards = [];
  const newInnings =
    inningNumber !== null ? innings.filter(inning => inning.number === inningNumber) : innings;
  newInnings.forEach(inning => {
    inning['top/guests'].forEach(guest => cards.push({ inning_number: inning.number, ...guest }));
    inning['bottom/owners']?.forEach(owner => cards.push({ inning_number: inning.number, ...owner }));
  });

  return (
    <ul className={cl.list}>
      {cards.map(card => (
        <ContentSituationsListItem key={card.inning_number + ' ' + card.who} player={card} />
      ))}
    </ul>
  );
};

export default ContentSituationsList;

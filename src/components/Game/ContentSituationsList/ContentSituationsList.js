import React from 'react';
import cl from './ContentSituationsList.module.scss';
import ContentSituationsListItem from '../ContentSituationsListItem/ContentSituationsListItem';

const ContentSituationsList = ({ innings, inningNumber, setEvents, currentCard, setCurrentCard }) => {
  const cards = [];
  const newInnings =
    inningNumber !== null ? innings.filter(inning => inning.number === inningNumber) : innings;
  newInnings.forEach(inning => {
    inning['top/guests'].forEach(guest => cards.push({ inning_number: inning.number, ...guest }));
    inning['bottom/owners']?.forEach(owner => cards.push({ inning_number: inning.number, ...owner }));
  });

  const situationClick = player => {
		setCurrentCard({who_id: player['who id'], inning_number: player.inning_number})
    const events = [];
    player.moments.forEach(moment => {
      if (moment.events) moment.events.forEach(event => events.push(event.description));
    });
    setEvents(events);
  };

  return (
    <ul className={cl.list}>
      {cards.map(card => (
        <ContentSituationsListItem
          key={card.inning_number + ' ' + card.who}
          player={card}
          situationClick={situationClick}
					currentCard={currentCard}
        />
      ))}
    </ul>
  );
};

export default ContentSituationsList;

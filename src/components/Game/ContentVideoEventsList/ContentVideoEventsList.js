import React, { useState, useEffect } from 'react';
import cl from './ContentVideoEventsList.module.scss';
import ContentVideoEventsListItem from './ContentVideoEventsListItem';
import { useSelector } from 'react-redux';

const ContentVideoEventsList = () => {
  const [events, setEvents] = useState([]);
  const currentCard = useSelector(state => state.game.currentCard);

  useEffect(() => {
    const newEvents = [];
    currentCard.type !== 'Replacement'
      ? currentCard.moments?.forEach(moment => moment.icons && newEvents.push(moment.icons))
      : newEvents.push(currentCard.moments[0].icons);
    setEvents(newEvents);
  }, [currentCard]);

  return (
    <>
      {events.length !== 0 && (
        <ul className={cl.events}>
          {events.map((event, i) => (
            <ContentVideoEventsListItem key={i} event={event} />
          ))}
        </ul>
      )}
    </>
  );
};

export default ContentVideoEventsList;

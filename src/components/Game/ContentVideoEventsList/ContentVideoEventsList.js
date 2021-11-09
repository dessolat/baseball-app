import React, { useState, useEffect, useRef } from 'react';
import cl from './ContentVideoEventsList.module.scss';
import ContentVideoEventsListItem from './ContentVideoEventsListItem';

const ContentVideoEventsList = ({ currentCard }) => {
  const [events, setEvents] = useState([]);
  const ref = useRef();

  useEffect(() => {
    const newEvents = [];
    currentCard.moments?.forEach(moment => {
      if (moment.events) moment.events.forEach(event => newEvents.push(event.description));
    });
    setEvents(newEvents);
  }, [currentCard]);

  useEffect(() => {
    if (events.length > 0) {
      const count = Math.ceil(events.length / 6);
      ref.current.style.setProperty('--w', 30 * count + 16 + 8 * (count - 1));
    }
  }, [events]);

  return (
    <>
      {events.length !== 0 && (
        <ul ref={ref} className={cl.events}>
          {events.map((event, i) => (
            <ContentVideoEventsListItem key={i} event={event} />
          ))}
        </ul>
      )}
    </>
  );
};

export default ContentVideoEventsList;

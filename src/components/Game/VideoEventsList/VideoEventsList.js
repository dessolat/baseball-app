import React, { useState, useEffect } from 'react';
import cl from './VideoEventsList.module.scss';
import VideoEventsListItem from './VideoEventsListItem';
import { useSelector } from 'react-redux';

const VideoEventsList = () => {
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
            <VideoEventsListItem key={i} event={event} />
          ))}
        </ul>
      )}
    </>
  );
};

export default VideoEventsList;

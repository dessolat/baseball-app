import React from 'react';
import cl from './ContentVideoEventsList.module.scss';
import ContentVideoEventsListItem from './ContentVideoEventsListItem';

const ContentVideoEventsList = ({ events }) => {
  return (
    <>
      {events.length !== 0 && (
        <ul className={cl.events}>
          {events.map((event, i) => <ContentVideoEventsListItem key={i} event={event} />)}
        </ul>
      )}
    </>
  );
};

export default ContentVideoEventsList;

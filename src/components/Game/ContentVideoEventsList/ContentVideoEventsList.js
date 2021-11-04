import React from 'react';
import cl from './ContentVideoEventsList.module.scss';
import ContentVideoEventsListItem from './ContentVideoEventsListItem';

const ContentVideoEventsList = ({ currentCard }) => {
	const events = [];
	currentCard.moments?.forEach(moment => {
		if (moment.events) moment.events.forEach(event => events.push(event.description));
	});

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

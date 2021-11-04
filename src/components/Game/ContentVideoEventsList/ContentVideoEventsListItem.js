import React from 'react';

const ContentVideoEventsListItem = ({ event }) => {
  const eventValue = event.includes('ball')
    ? 'B'
    : event.includes('strike')
    ? 'ST'
    : event.includes('doubled')
    ? 'D'
    : event.includes('walked')
    ? 'W'
    : event.includes('hit')
    ? 'H'
    : event.includes('advanced')
    ? 'A'
    : event.includes('scored')
    ? 'SC'
    : event.includes('grounded')
    ? 'G'
		: event.includes('foul') ? 'F'
		: event.includes('single') ? 'SI'
		: event.includes('swing') ? 'SW'
		: event.includes('flied') ? 'FL'
    : 'w';
  return <li>{eventValue}</li>;
};

export default ContentVideoEventsListItem;

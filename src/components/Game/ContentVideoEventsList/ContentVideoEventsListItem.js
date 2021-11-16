import React from 'react';
import cl from './ContentVideoEventsList.module.scss';

const ContentVideoEventsListItem = ({ event }) => {
  return <li className={cl[event.circ_color_pitch]}>{event.circ_text_pitch}</li>;
};

export default ContentVideoEventsListItem;

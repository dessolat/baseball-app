import React from 'react';
import cl from './ContentVideoEventsList.module.scss';

const ContentVideoEventsListItem = ({ event }) => {
  return (
    <>
      {event.circ_color_play && (
        <li className={cl[event.circ_color_play]} data-before={event.batter_moment}>
          {event.circ_text_play}
        </li>
      )}
      {event.circ_color_pitch && (
        <li className={cl[event.circ_color_pitch]} data-before={event.batter_moment}>
          {event.circ_text_pitch}
        </li>
      )}
    </>
  );
};

export default ContentVideoEventsListItem;

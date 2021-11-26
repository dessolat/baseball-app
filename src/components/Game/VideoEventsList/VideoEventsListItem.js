import React from 'react';
import cl from './VideoEventsList.module.scss';
import ReplaceEvent from 'components/UI/icons/ReplaceEvent';

const VideoEventsListItem = ({ event }) => {
  return (
    <>
      {event.circ_color_pitch && (
        <li className={cl[event.circ_color_pitch]} data-before={event.batter_moment}>
          {event.circ_text_pitch}
        </li>
      )}
      {event.circ_color_play && (
        <li
          className={event.circ_text_play !== 'R' ? cl[event.circ_color_play] : ''}
          data-before={event.circ_text_pitch || event.circ_text_play === 'R' ? '' : event.batter_moment}>
          {event.circ_text_play !== 'R' ? event.circ_text_play : <ReplaceEvent />}
        </li>
      )}
    </>
  );
};

export default VideoEventsListItem;

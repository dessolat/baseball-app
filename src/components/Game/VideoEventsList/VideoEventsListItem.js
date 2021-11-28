import React from 'react';
import cl from './VideoEventsList.module.scss';
import ReplaceEvent from 'components/UI/icons/ReplaceEvent';

const VideoEventsListItem = ({ moment }) => {
  return (
    <>
      {moment.icons.circ_color_pitch && (
        <li className={cl[moment.icons.circ_color_pitch]} data-before={moment.icons.batter_moment}>
          {moment.icons.circ_text_pitch}
        </li>
      )}
      {moment.icons.circ_color_play && (
        <li
          className={moment.icons.circ_text_play !== 'R' ? cl[moment.icons.circ_color_play] : ''}
          data-before={moment.icons.circ_text_pitch || moment.icons.circ_text_play === 'R' ? '' : moment.icons.batter_moment}>
          {moment.icons.circ_text_play !== 'R' ? moment.icons.circ_text_play : <ReplaceEvent />}
        </li>
      )}
    </>
  );
};

export default VideoEventsListItem;

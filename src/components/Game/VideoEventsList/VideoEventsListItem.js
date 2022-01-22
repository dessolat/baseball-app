import React from 'react';
import cl from './VideoEventsList.module.scss';
import ReplaceEvent from 'components/UI/icons/ReplaceEvent';

const VideoEventsListItem = ({ moment }) => {
  const playClasses = [];
  moment.icons.circ_text_play !== 'R' && playClasses.push(cl[moment.icons.circ_color_play]);
  moment.icons.circ_text_play === 'OBR' && playClasses.push(cl.obr);

  const playDataBefore =
    moment.icons.circ_text_pitch || moment.icons.circ_text_play === 'R' ? '' : moment.icons.batter_moment;
  const playContent = moment.icons.circ_text_play !== 'R' ? moment.icons.circ_text_play : <ReplaceEvent />;

  return (
    <>
      {moment.icons.circ_color_pitch && (
        <li>
          <div className={cl[moment.icons.circ_color_pitch]} data-before={moment.icons.batter_moment}>
            {moment.icons.circ_text_pitch}
          </div>
        </li>
      )}
      {moment.icons.circ_color_play && (
        <li>
          <div className={playClasses.join(' ')} data-before={playDataBefore}>
            {playContent}
          </div>
        </li>
      )}
    </>
  );
};

export default VideoEventsListItem;

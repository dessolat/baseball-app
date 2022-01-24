import React from 'react';
import cl from './VideoEventsList.module.scss';
import ReplaceEvent from 'components/UI/icons/ReplaceEvent';
import { useSelector } from 'react-redux';

const VideoEventsListItem = ({ moment, handleClick }) => {
	const currentMoment = useSelector(state => state.game.currentMoment)

	const pitchClasses = [moment.icons.circ_color_pitch && cl[moment.icons.circ_color_pitch]]
  const playClasses = [];
  moment.icons.circ_text_play !== 'R' && playClasses.push(cl[moment.icons.circ_color_play]);
  moment.icons.circ_text_play === 'OBR' && playClasses.push(cl.obr);

	const wrapperClasses = []
	moment.inner?.id === currentMoment?.inner?.id && wrapperClasses.push(cl.active)
	

  const playDataBefore =
    moment.icons.circ_text_pitch || moment.icons.circ_text_play === 'R' ? '' : moment.icons.batter_moment;
  const playContent = moment.icons.circ_text_play !== 'R' ? moment.icons.circ_text_play : <ReplaceEvent />;

  return (
    <>
      {moment.icons.circ_color_pitch && (
        <li className={wrapperClasses.join(' ')} onClick={handleClick(moment)}>
          <div className={pitchClasses.join(' ')} data-before={moment.icons.batter_moment}>
            {moment.icons.circ_text_pitch}
          </div>
        </li>
      )}
      {moment.icons.circ_color_play && (
        <li className={wrapperClasses.join(' ')} onClick={handleClick(moment)}>
          <div className={playClasses.join(' ')} data-before={playDataBefore}>
            {playContent}
          </div>
        </li>
      )}
    </>
  );
};

export default VideoEventsListItem;

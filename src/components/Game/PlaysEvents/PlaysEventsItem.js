import ReplaceEvent from 'components/UI/icons/ReplaceEvent';
import React from 'react';
import cl from './PlaysEvents.module.scss';

const PlaysEventsItem = ({ moment, currentMoment, handleClick }) => {
  const { icons, pitcher, inner } = moment;
  const classes = inner.id === currentMoment.inner?.id ? cl.active : '';

  const playClasses = [];
  icons.circ_text_play !== 'R' && playClasses.push(cl[icons.circ_color_play]);
  icons.circ_text_play === 'OBR' && playClasses.push(cl.obr);

  const playDataBefore = icons.circ_text_pitch || icons.circ_text_play === 'R' ? '' : icons.batter_moment;
  return (
    <>
      {icons.circ_color_pitch && (
        <li className={classes} onClick={handleClick(moment)}>
          <div className={cl[icons.circ_color_pitch]} data-before={icons.batter_moment}>
            {icons.circ_text_pitch}
          </div>
          <div className={cl.text}>
            <p>slider</p>({pitcher.balls_count} - {pitcher.strikes_count})
          </div>
        </li>
      )}
      {icons.circ_color_play && (
        <li className={classes} onClick={handleClick(moment)}>
          <div className={playClasses.join(' ')} data-before={playDataBefore}>
            {icons.circ_text_play !== 'R' ? icons.circ_text_play : <ReplaceEvent />}
          </div>
          <div className={cl.text}>
            <p>slider</p>({pitcher.balls_count} - {pitcher.strikes_count})
          </div>
        </li>
      )}
    </>
  );
};

export default PlaysEventsItem;

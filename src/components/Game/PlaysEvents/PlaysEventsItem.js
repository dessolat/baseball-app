import ReplaceEvent from 'components/UI/icons/ReplaceEvent';
import React from 'react';
import cl from './PlaysEvents.module.scss';

const PlaysEventsItem = ({ moment, currentMoment, handleClick }) => {
  const classes = moment.inner.id === currentMoment.inner?.id ? cl.active : '';

  return (
    <>
      {moment.icons.circ_color_pitch && (
        <li className={classes} onClick={() => handleClick(moment)}>
          <div className={cl[moment.icons.circ_color_pitch]} data-before={moment.icons.batter_moment}>
            {moment.icons.circ_text_pitch}
          </div>
          <div className={cl.text}>
            <p>slider</p>({moment.pitcher.strikes_count} strike, {moment.pitcher.balls_count} ball)
          </div>
        </li>
      )}
      {moment.icons.circ_color_play && (
        <li className={classes} onClick={() => handleClick(moment)}>
          <div
            className={moment.icons.circ_text_play !== 'R' ? cl[moment.icons.circ_color_play] : ''}
            data-before={
              moment.icons.circ_text_pitch || moment.icons.circ_text_play === 'R'
                ? ''
                : moment.icons.batter_moment
            }>
            {moment.icons.circ_text_play !== 'R' ? moment.icons.circ_text_play : <ReplaceEvent />}
          </div>
          <div className={cl.text}>
            <p>slider</p>({moment.pitcher.strikes_count} strike, {moment.pitcher.balls_count} ball)
          </div>
        </li>
      )}
    </>
  );
};

export default PlaysEventsItem;

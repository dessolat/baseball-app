import ReplaceEvent from 'components/UI/icons/ReplaceEvent';
import React from 'react';
import cl from './PlaysEvents.module.scss';

const PlaysEventsItem = ({ moment }) => {
  return (
    <>
      {moment.icons.circ_color_pitch && (
        <li>
          <div className={cl[moment.icons.circ_color_pitch]} data-before={moment.icons.batter_moment}>
            {moment.icons.circ_text_pitch}
          </div>
					<p className={cl.text}>slider ({moment.pitcher.strikes_count} strike, {moment.pitcher.balls_count} ball)</p>
        </li>
      )}
      {moment.icons.circ_color_play && (
        <li>
          <div
            className={moment.icons.circ_text_play !== 'R' ? cl[moment.icons.circ_color_play] : ''}
            data-before={
              moment.icons.circ_text_pitch || moment.icons.circ_text_play === 'R'
                ? ''
                : moment.icons.batter_moment
            }>
            {moment.icons.circ_text_play !== 'R' ? moment.icons.circ_text_play : <ReplaceEvent />}
          </div>
					<p className={cl.text}>slider ({moment.pitcher.strikes_count} strike, {moment.pitcher.balls_count} ball)</p>
        </li>
      )}
    </>
  );
};

export default PlaysEventsItem;

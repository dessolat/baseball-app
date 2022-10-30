import ReplaceEvent from 'components/UI/icons/ReplaceEvent';
import React, { forwardRef } from 'react';
import cl from './PlaysEvents.module.scss';

const PlaysEventsItem = ({ moment, currentMoment, handleClick }, ref) => {
  const { icons, inner } = moment;
  // const { icons, table, inner } = moment;
  const classes = inner.id === currentMoment.inner?.id ? cl.active : '';
	const refValue = inner.id === currentMoment.inner?.id ? ref : null

  const playClasses = [];
  icons.circ_text_play !== 'R' && playClasses.push(cl[icons.circ_color_play]);
  icons.circ_text_play === 'OBR' && playClasses.push(cl.obr);

  const playDataBefore = icons.circ_text_pitch || icons.circ_text_play === 'R' ? '' : icons.batter_moment;

  const topEventText = moment.metering?.pitch?.init_speed_x
    ? `${moment.metering?.pitch?.init_speed_x.toFixed(1)} mph`
    : '';
  return (
    <>
      {icons.circ_color_pitch && (
        <li ref={refValue} className={classes} onClick={handleClick(moment)}>
          <div className={cl[icons.circ_color_pitch]} data-before={icons.batter_moment}>
            {icons.circ_text_pitch}
          </div>
          <div className={cl.text}>
            <p>cu {topEventText}</p>
						{/* ({table.balls} - {table.strikes}) */}
          </div>
        </li>
      )}
      {icons.circ_color_play && (
        <li className={classes} onClick={handleClick(moment)} ref={icons.circ_color_pitch ? null : refValue}>
          <div className={playClasses.join(' ')} data-before={playDataBefore}>
            {icons.circ_text_play !== 'R' ? icons.circ_text_play : <ReplaceEvent />}
          </div>
          {!(icons.circ_color_pitch && icons.circ_color_play) && <div className={cl.text}>
            {/* {icons.circ_color_pitch && icons.circ_color_play? (
              <>
                <p> </p> 
              </>
            ) : (
              <> */}
                <p>cu {topEventText}</p>
								{/* ({table.balls} - {table.strikes}) */}
              {/* </>
            )} */}
          </div>}
        </li>
      )}
    </>
  );
};

export default forwardRef(PlaysEventsItem);

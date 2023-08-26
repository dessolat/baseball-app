import ReplaceEvent from 'components/UI/icons/ReplaceEvent';
import usePitchTypes from 'hooks/usePitchTypes';
import React, { forwardRef } from 'react';
import cl from './PlaysEvents.module.scss';

const PlaysEventsItem = ({ moment, currentMoment, handleClick, isVideo }, ref) => {
  const { icons, inner, metering, table } = moment;

  const isActive = inner.id === currentMoment?.inner?.id;
  const classes = isActive ? cl.active : '';
  const refValue = isActive ? ref : null;

  const playClasses = [];
  icons.circ_text_play !== 'R' && playClasses.push(cl[icons.circ_color_play]);
  icons.circ_text_play === 'OBR' && playClasses.push(cl.obr);

  const playDataBefore = icons.circ_text_pitch || icons.circ_text_play === 'R' ? '' : icons.batter_moment;

  const topEventText = metering?.pitch?.start_speed ? metering?.pitch?.start_speed.toFixed(0) : '';

  const ballsEnding = table.balls > 1 ? 's' : '';
  const strikesEnding = table.strikes > 1 ? 's' : '';

  const pitchTypeName = usePitchTypes(metering.pitch?.pitch_type, false);
  return (
    <>
      {icons.circ_color_pitch && (
        <li ref={refValue} className={classes} onClick={handleClick(moment)}>
          <div className={cl[icons.circ_color_pitch]} data-before={icons.batter_moment}>
            {icons.circ_text_pitch}
          </div>
          <div className={cl.text}>
            {isVideo && (
              <p>
                {pitchTypeName} {topEventText}
              </p>
            )}
            <div className={cl.onlyDesktop}>
              {!isVideo && (
                <>{`(${table.balls} ball${ballsEnding} - ${table.strikes} strike${strikesEnding})`}</>
              )}
            </div>
          </div>
        </li>
      )}
      {icons.circ_color_play && (
        <li className={classes} onClick={handleClick(moment)} ref={icons.circ_color_pitch ? null : refValue}>
          <div className={playClasses.join(' ')} data-before={playDataBefore}>
            {icons.circ_text_play !== 'R' ? icons.circ_text_play : <ReplaceEvent />}
          </div>
          {!(icons.circ_color_pitch && icons.circ_color_play) && (
            <div className={cl.text}>
              {/* {icons.circ_color_pitch && icons.circ_color_play? (
              <>
                <p> </p> 
              </>
            ) : (
              <> */}
              {isVideo && (
                <p>
                  {pitchTypeName} {topEventText}
                </p>
              )}
              <div className={cl.onlyDesktop}>
                {!isVideo && (
                  <>{`(${table.balls} ball${ballsEnding} - ${table.strikes} strike${strikesEnding})`}</>
                )}
              </div>

              {/* ({table.balls} - {table.strikes}) */}
              {/* </>
            )} */}
            </div>
          )}
        </li>
      )}
    </>
  );
};

export default forwardRef(PlaysEventsItem);

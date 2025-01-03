import React from 'react';
import { useSelector } from 'react-redux';
import cl from './PitchValues.module.scss';
import classNames from 'classnames';

const PitchValues = () => {
  const currentMoment = useSelector(s => s.game.currentMoment);
  const pitchState = useSelector(s => s.game.pitchState);

  const {
    offset_x,
    offset_y,
    rotation,
    start_speed: initSpeed,
    end_speed: plateSpeed,
    release_height: releaseHeight,
    release_side: releaseSide
  } = currentMoment?.metering?.pitch || {};

  const releaseValue = initSpeed?.toFixed(1) ?? '';
  const platePointValue = plateSpeed?.toFixed(1) ?? '';

  const trueSpinValue = rotation ? rotation.toFixed(2) + ' rpm' : ' ';
  const verticalBreakValue = offset_y ? (offset_y * -100).toFixed(2) + ' cm' : ' ';
  const horizontalBreakValue = offset_x ? (offset_x * 100).toFixed(2) + ' cm' : ' ';

  const releaseHeightValue = releaseHeight?.toFixed(1) ?? '';
  const releaseSideValue = releaseSide?.toFixed(1) ?? '';

  const wrapperClasses = classNames(cl.pitchValues, {
    [cl.dnone]: pitchState !== 'SpeedSpinInfo'
  });
  return (
    <div className={wrapperClasses}>
      <div>
        <p className={cl.subHeader}>Release speed /</p>
        <p className={cl.subHeader}>Plate point speed</p>
        <p className={cl.releaseValue}>{releaseValue} mph /</p>
        <p className={cl.regularValue}>{platePointValue} mph</p>
      </div>

      <div className={cl.spinInfo}>
        <div>
          <p className={cl.subHeader}>True spin</p>
          <p className={cl.regularValue}>{trueSpinValue}</p>
        </div>
        <div>
          <p className={cl.subHeader}>Vertical break</p>
          <p className={cl.breakValue}>{verticalBreakValue}</p>
        </div>
        <div>
          <p className={cl.subHeader}>Horizontal break</p>
          <p className={cl.breakValue}>{horizontalBreakValue}</p>
        </div>
      </div>

      <div>
        <p className={cl.subHeader}>Release height</p>
        <p className={cl.regularValue}>{releaseHeightValue} m</p>
        <p className={cl.subHeader}>Release side</p>
        <p className={cl.regularValue}>{releaseSideValue} m</p>
      </div>
    </div>
  );
};

export default PitchValues;

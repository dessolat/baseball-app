import React from 'react';
import cl from './PlaysField.module.scss';
import gridImg from 'images/grid.png';
import PlaysFieldBalls from './PlaysFieldBalls';
import { useSelector } from 'react-redux';
import classNames from 'classnames';

const STRIKE_BALL_COLORS = {
  STRIKE: '#E2001C',
  BALL: '#2B9D6A'
};

const PlaysField = ({ currentMoment }) => {
  const pitchState = useSelector(state => state.game.pitchState);

  const wrapperClasses = classNames({
    [cl.outerWrapper]: pitchState === 'Field',
    [cl.dnone]: pitchState !== 'Field'
  });

  const isStrikeBallValue = currentMoment.metering?.pitch;
  const strikeBallValue = currentMoment.metering?.pitch?.is_strike ? 'STRIKE' : 'BALL';

  const ballsCoords = currentMoment?.metering?.pitch?.data_2d || [];
  return (
    <div className={wrapperClasses}>
      <div className={cl.field}>
        <img className={cl.grid} src={gridImg} alt='grid' />
        <PlaysFieldBalls coords={ballsCoords} currentMoment={currentMoment} />
      </div>
      {isStrikeBallValue && (
        <div className={cl.strikeBallWrapper} style={{ color: STRIKE_BALL_COLORS[strikeBallValue] }}>
          {strikeBallValue}
        </div>
      )}
    </div>
  );
};

export default PlaysField;

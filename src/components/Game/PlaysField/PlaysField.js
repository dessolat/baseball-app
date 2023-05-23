import React from 'react';
import cl from './PlaysField.module.scss';
import gridImg from 'images/grid.png';
import PlaysFieldBalls from './PlaysFieldBalls';
import { useDispatch, useSelector } from 'react-redux';
import { setPitchState } from 'redux/gameReducer';
import Arrow from 'components/UI/buttons/Arrow/Arrow';
import classNames from 'classnames';

const STRIKE_BALL_COLORS = {
  STRIKE: '#E2001C',
  BALL: '#2B9D6A'
};

const PlaysField = ({ currentMoment }) => {
  const pitchState = useSelector(state => state.game.pitchState);

  const dispatch = useDispatch();

  const handleArrowClick = () => dispatch(setPitchState('Videos'));

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
      <Arrow
        direction='right'
        onClick={handleArrowClick}
        style={{ position: 'absolute', transform: 'scale(2.4)', top: '50%', right: '20px', opacity: 0.5 }}
      />
      {isStrikeBallValue && (
        <div className={cl.strikeBallWrapper} style={{ color: STRIKE_BALL_COLORS[strikeBallValue] }}>
          {strikeBallValue}
        </div>
      )}
    </div>
  );
};

export default PlaysField;

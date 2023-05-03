import React, { useState, useEffect, useRef } from 'react';
import cl from './PlaysField.module.scss';
import gridImg from 'images/grid.png';
import PlaysFieldBalls from './PlaysFieldBalls';
import { useDispatch, useSelector } from 'react-redux';
import { setPitchState } from 'redux/gameReducer';
import Arrow from 'components/UI/buttons/Arrow/Arrow';
import classNames from 'classnames';

const PlaysField = ({ currentMoment }) => {
  const [coords, setCoords] = useState([]);
  // const [count, setCount] = useState(0);
  const [coeff, setCoeff] = useState({ x: 1, y: 1, yScale: 1 });
  const [isGrid, setIsGrid] = useState(true);
  const [isBalls, setIsBalls] = useState(true);

  const pitchState = useSelector(state => state.game.pitchState);
  const dispatch = useDispatch();

  const parent = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const resizeHandler = () => {
      timeoutRef.current !== null && clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {

        setCoeff({
          x: parent.current.clientWidth / 1920,
          y: parent.current.clientHeight / 1080
        });
        timeoutRef.current = null;
      }, 100);
    };

    setCoeff({
      x: parent.current.clientWidth / 1920,
      y: parent.current.clientHeight / 1080
    });
    window.addEventListener('resize', resizeHandler);

    return () => {
      window.removeEventListener('resize', resizeHandler);
      // clearTimeout(timeout);
    };
  }, []);

  // useEffect(() => {
  //   if (count === 0) return;

  //   let graphTimeout;
  //   if (count < coords.length) {
  //     graphTimeout = setTimeout(() => setCount(prev => prev + 1), 40);
  //     return;
  //   }

  //   return () => {
  //     clearTimeout(graphTimeout);
  //   };
  //   // eslint-disable-next-line
  // }, [count]);

  useEffect(() => {
    // setCount(0);
    // const timeout = setTimeout(() => setCount(prev => prev + 1), 150);
    setCoords(currentMoment?.metering?.pitch?.data_2d || []);

    return () => {
      // clearTimeout(timeout);
    };
  }, [currentMoment]);

  const handleArrowClick = () => dispatch(setPitchState('Stats'));

  const wrapperClasses = classNames({
    [cl.outerWrapper]: pitchState === 'Field',
    [cl.dnone]: pitchState !== 'Field'
  });

  const strikeBallValue = currentMoment.metering?.pitch
    ? currentMoment.metering.pitch.is_strike
      ? 'STRIKE'
      : 'BALL'
    : '';

  const STRIKE_BALL_COLORS = {
    STRIKE: '#E2001C',
    BALL: '#2B9D6A'
  };
  return (
    <div className={wrapperClasses}>
      <div className={cl.field} ref={parent}>
        {isGrid && <img className={cl.grid} src={gridImg} alt='grid' />}
        {isBalls && <PlaysFieldBalls coords={coords} coeff={coeff} currentMoment={currentMoment} />}
        <Arrow
          direction='right'
          onClick={handleArrowClick}
          style={{ position: 'absolute', transform: 'scale(2.4)', top: '50%', right: '20px', opacity: 0.5 }}
        />
        <button
          style={{
            position: 'absolute',
            left: '50%',
            top: '-0.2rem',
            translate: '-50% 0',
            borderRadius: '5px',
            backgroundColor: 'lightgray',
						width: 80,
						height: 20
          }}
          className={cl.larger}
          onClick={() => setIsGrid(prev => !prev)}>
          Grid on/off
        </button>
        <button
          style={{
            position: 'absolute',
            left: '50%',
            top: '1.5rem',
            translate: '-50% 0',
            borderRadius: '5px',
            backgroundColor: 'lightgray',
						display: 'flex',
						width: 80,
						height: 20
          }}
          className={cl.larger}
          onClick={() => setIsBalls(prev => !prev)}>
          Balls on/off
        </button>
      </div>
      <div className={cl.strikeBallWrapper} style={{ color: STRIKE_BALL_COLORS[strikeBallValue] }}>
        {strikeBallValue}
      </div>
    </div>
  );
};

export default PlaysField;

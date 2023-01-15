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

  const pitchState = useSelector(state => state.game.pitchState);
  const dispatch = useDispatch();

  const parent = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const resizeHandler = () => {
      timeoutRef.current !== null && clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        const yScale = parent.current.clientHeight / 330;
        setCoeff({
          x: parent.current.clientWidth / 1920,
          y: (parent.current.clientHeight + 90 * yScale) / 1080,
          yScale
        });
        timeoutRef.current = null;
      }, 100);
    };

    // const timeout = setTimeout(() => setCount(prev => prev + 1), 150);
    const yScale = parent.current.clientHeight / 330;
    setCoeff({
      x: parent.current.clientWidth / 1920,
      y: (parent.current.clientHeight + 90 * yScale) / 1080,
      yScale
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
        <img className={cl.grid} src={gridImg} alt='grid' />
        <PlaysFieldBalls coords={coords} coeff={coeff} currentMoment={currentMoment}/>
        <Arrow
          direction='right'
          onClick={handleArrowClick}
          style={{ position: 'absolute', transform: 'scale(2.4)', top: '50%', right: '20px', opacity: 0.5 }}
        />
      </div>
      <div className={cl.strikeBallWrapper} style={{ color: STRIKE_BALL_COLORS[strikeBallValue] }}>
        {strikeBallValue}
      </div>
    </div>
  );
};

export default PlaysField;

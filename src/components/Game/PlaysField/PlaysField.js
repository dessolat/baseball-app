import React, { useState, useEffect, useRef } from 'react';
import cl from './PlaysField.module.scss';
import gridImg from 'images/grid.png';
import PlaysFieldBalls from './PlaysFieldBalls';

const PlaysField = ({ currentMoment }) => {
  const [coords, setCoords] = useState([]);
  const [initSpeed, setInitSpeed] = useState('');
  const [count, setCount] = useState(1);
  const [coeff, setCoeff] = useState({ x: 1, y: 1, yScale: 1 });
  const parent = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const resizeHandler = () => {
      timeoutRef.current !== null && clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        // setCoeff({ x: parent.current.clientWidth / 1920, y: parent.current.clientHeight / 1080 });
        const yScale = parent.current.clientHeight / 330;
        setCoeff({
          x: parent.current.clientWidth / 1920,
          y: (parent.current.clientHeight + 90 * yScale) / 1080,
          yScale
        });
        timeoutRef.current = null;
      }, 100);
    };

    setTimeout(() => setCount(prev => prev + 1), 150);
    // setCoeff({ x: parent.current.clientWidth / 1920, y: parent.current.clientHeight / 1080 });
    const yScale = parent.current.clientHeight / 330;
    setCoeff({
      x: parent.current.clientWidth / 1920,
      y: (parent.current.clientHeight + 90 * yScale) / 1080,
      yScale
    });
    window.addEventListener('resize', resizeHandler);

    return () => {
      window.removeEventListener('resize', resizeHandler);
    };
  }, []);

  useEffect(() => {
    if (count === 1) return;
    count < coords.length && setTimeout(() => setCount(prev => prev + 1), 40);
    // eslint-disable-next-line
  }, [count]);

  useEffect(() => {
    setCount(1);
    setTimeout(() => setCount(prev => prev + 1), 150);
    // timeoutRef.current = setTimeout(() => setCount(prev => prev + 1), 150);
    setCoords(currentMoment.metering?.data_2d || []);
    setInitSpeed(currentMoment.metering?.init_speed_x || '');

    return () => {
      // clearTimeout(timeoutRef.current);
    };
  }, [currentMoment]);

  const imgStyles = {
    top: parent.current ? (43 * parent.current.clientHeight) / 330 : 43,
    width: parent.current ? (102 * parent.current.clientWidth) / 746 : 102,
    height: parent.current ? (148 * parent.current.clientHeight) / 330 : 148
  };

  const releaseValue = initSpeed !== '' ? initSpeed.toFixed(1) : '';

  return (
    <div className={cl.field} ref={parent}>
      <img className={cl.grid} style={imgStyles} src={gridImg} alt='grid' />
      <PlaysFieldBalls coords={coords} count={count} coeff={coeff} />
      <div className={cl.top}>
        <div className={cl.speedData}>
          <p className={cl.subHeader}>
            <span className={cl.releaseSpeed}>Release speed</span>/ Plate point speed
          </p>
          <span className={cl.releaseValue}>{releaseValue} mph</span>
          <span className={cl.regularValue}>/ 73.7 mph</span>
        </div>
        <div className={cl.releaseData}>
          <p className={cl.subHeader}>Release height</p>
          <p className={cl.regularValue}>1.7 m</p>
          <p className={cl.subHeader}>Release side</p>
          <p className={cl.regularValue}>0.3 m</p>
        </div>
      </div>
    </div>
  );
};

export default PlaysField;

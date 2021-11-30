import React, { useState, useEffect, useRef } from 'react';
import cl from './PlaysField.module.scss';
import gridImg from 'images/grid.png';

const coords = [
  { x: 280, y: 170 },
  { x: 300, y: 155 },
  { x: 312, y: 140 },
  { x: 330, y: 131 },
  { x: 350, y: 118 }
];

const PlaysField = () => {
  const [count, setCount] = useState(1);
  const [coeff, setCoeff] = useState({ x: 1, y: 1 });
  const parent = useRef(null);

  useEffect(() => {
    setTimeout(() => setCount(prev => prev + 1), 80);
    setCoeff({ x: parent.current.clientWidth / 671, y: parent.current.clientHeight / 330 });
  }, []);

  useEffect(() => {
    if (count === 1) return;
    count < coords.length && setTimeout(() => setCount(prev => prev + 1), 80);
  }, [count]);

  return (
    <div className={cl.field} ref={parent}>
      <img
        className={cl.grid}
        style={{ top: 21 * coeff.y, width: 109 * coeff.x, height: 158 * coeff.y }}
        src={gridImg}
        alt='grid'
      />
      {coords.slice(0, count).map((coord, i) => {
        const classes = [cl.ball];
        i === 0 && classes.push(cl.onTop);
        return (
          <div
            key={i}
            className={classes.join(' ')}
            style={{ left: coord.x * coeff.x, top: coord.y * coeff.y }}></div>
        );
      })}

      <div className={cl.top}>
        <div className={cl.speedData}>
          <p className={cl.subHeader}>
            <span className={cl.releaseSpeed}>Release speed</span>/ Plate point speed
          </p>
          <span className={cl.releaseValue}>88.8 mph</span>
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

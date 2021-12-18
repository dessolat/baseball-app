import React, { useState, useEffect, useRef } from 'react';
import cl from './PlaysField.module.scss';
import gridImg from 'images/grid.png';

const PlaysField = ({ currentMoment }) => {
  const [coords, setCoords] = useState([]);
  const [initSpeed, setInitSpeed] = useState('');
  const [count, setCount] = useState(1);
  const [coeff, setCoeff] = useState({ x: 1, y: 1 });
  const parent = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const resizeHandler = () => {
			timeoutRef.current !== null && clearTimeout(timeoutRef.current)
      timeoutRef.current = setTimeout(() => {
				setCoeff({ x: parent.current.clientWidth / 1920, y: parent.current.clientHeight / 1080 });
				timeoutRef.current = null
      }, 100);
    };

    setTimeout(() => setCount(prev => prev + 1), 150);
    setCoeff({ x: parent.current.clientWidth / 1920, y: parent.current.clientHeight / 1080 });
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

  return (
    <div className={cl.field} ref={parent}>
      <img
        className={cl.grid}
        style={{ top: 43 * coeff.y * 3.273, width: 102 * coeff.x * 2.574, height: 148 * coeff.y * 3.273 }}
        src={gridImg}
        alt='grid'
      />
      {coords.slice(0, count).map((coord, i) => {
        const ballClasses = [cl.ball];
        i === coords.length - 1 && ballClasses.push(cl.onTop);

				const ballStyles = {
					left: coord[0] * coeff.x - (12.5 * coord[4]) / 2,
					top: coord[1] * coeff.y - (12.5 * coord[4]) / 2 - 90 * coeff.y,
					width: 12.5 * coord[4] + 'px',
					height: 12.5 * coord[4] + 'px'
				};
			
				const shadowStyles = {
					left: coord[2] * coeff.x - (12.5 * coord[4]) / 2,
					top: coord[3] * coeff.y - (7.5 * coord[4]) / 2 - 90 * coeff.y,
					width: 12.5 * coord[4] + 'px',
					height: 7.5 * coord[4] + 'px'
				};

        return (
          <Fragment key={i}>
            <div className={ballClasses.join(' ')} style={ballStyles}></div>
            <div className={cl.shadow} style={shadowStyles}></div>
          </Fragment>
        );
      })}

      <div className={cl.top}>
        <div className={cl.speedData}>
          <p className={cl.subHeader}>
            <span className={cl.releaseSpeed}>Release speed</span>/ Plate point speed
          </p>
          <span className={cl.releaseValue}>{initSpeed !== '' ? initSpeed.toFixed(1) : ''} mph</span>
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

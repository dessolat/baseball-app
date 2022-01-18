import React, { useEffect, useRef } from 'react';
import cl from './PlaysBat.module.scss';

const PlaysBatFooter = ({ currentLine, currentMoment, handleDotClick, frame }) => {
  const { swing_index, plane_index, impact_index, data_2d } = currentMoment.metering?.bat || {};

  const dotRef = useRef(null);

  useEffect(() => {
    if (Object.keys(currentMoment).length === 0 || dotRef.current === null) return;
    dotRef.current.classList.remove(cl.slider);
    setTimeout(() => {
      dotRef.current?.classList.add(cl.slider);
    }, 0);
  }, [currentMoment]);

  const getDotColor = order => (currentLine === order ? '#1A4C96' : '#E8E6E6');
  const getXCoord = index => (330 / data_2d.length) * index;

  const isDots = Object.keys(currentMoment).length !== 0 && data_2d !== undefined;
  return (
    <div className={cl.footer}>
      <svg
        width='100%'
        height='40'
        viewBox='0 0 338 40'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        preserveAspectRatio='none'>
        <text x='0' y='12' className={cl.subHeader}>
          Bat speed (mph)
        </text>
        <path d='M1 25L330 25' stroke='#1A4C96' />
        {isDots && (
          <>
            {/* <text x='182.5' y='12' className={cl.value}>
              90
            </text> */}
            <circle
              cx={getXCoord(swing_index)}
              cy='25.38184'
              r='5'
              className={cl.dot}
              onClick={handleDotClick('line0')}
              fill={getDotColor('line0')}
            />
            {/* <text x='228.5' y='12' className={cl.value}>
              90
            </text> */}
            <circle
              cx={getXCoord(plane_index)}
              cy='25.38184'
              r='5'
              className={cl.dot}
              onClick={handleDotClick('line1')}
              fill={getDotColor('line1')}
            />
            {/* <text x='268.5' y='12' className={cl.value}>
              90
            </text> */}
            <circle
              cx={getXCoord(impact_index)}
              cy='25.38184'
              r='5'
              className={cl.dot}
              onClick={handleDotClick('line2')}
              fill={getDotColor('line2')}
            />
            <circle
              cx={getXCoord(frame - 1)}
              cy='25.5'
              r='7.5'
              className={cl.slider}
              ref={dotRef}
              fill='#4AA0F0'
            />
          </>
        )}
      </svg>
    </div>
  );
};

export default PlaysBatFooter;

import React, { useEffect, useRef } from 'react';
import cl from './PlaysBat.module.scss';

const PlaysBatFooter = ({ currentDot, currentMoment, handleDotClick }) => {
  const dotRef = useRef(null);

  useEffect(() => {
    if (Object.keys(currentMoment).length === 0 || dotRef.current === null) return;
    dotRef.current.classList.remove(cl.slider);
    setTimeout(() => {
      dotRef.current.classList.add(cl.slider);
    }, 0);
  }, [currentMoment]);

  const getDotColor = order => (currentDot === order ? '#1A4C96' : '#E8E6E6');

  const isDots = !(Object.keys(currentMoment).length === 0) && currentMoment.events[0].type !== 'replace';

  return (
    <div className={cl.footer}>
      <svg width='100%' height='40' viewBox='0 0 334 40' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <text x='0' y='12' className={cl.subHeader}>
          Bat speed (mph)
        </text>
        <path d='M1 25L330 25' stroke='#1A4C96' />
        {isDots && (
          <>
            <text x='182.5' y='12' className={cl.value}>
              90
            </text>
            <circle
              cx='190.5'
              cy='25.38184'
              r='5'
              className={cl.dot}
              onClick={handleDotClick('first')}
              fill={getDotColor('first')}
            />
            <text x='228.5' y='12' className={cl.value}>
              90
            </text>
            <circle
              cx='236.5'
              cy='25.38184'
              r='5'
              className={cl.dot}
              onClick={handleDotClick('second')}
              fill={getDotColor('second')}
            />
            <text x='268.5' y='12' className={cl.value}>
              90
            </text>
            <circle
              cx='277.5'
              cy='25.38184'
              r='5'
              className={cl.dot}
              onClick={handleDotClick('third')}
              fill={getDotColor('third')}
            />
            <text x='318.7' y='12' className={cl.value}>
              90
            </text>
            <circle
              cx='326.5'
              cy='25.5'
              r='5'
              className={cl.dot}
              onClick={handleDotClick('fourth')}
              fill={getDotColor('fourth')}
            />
            <circle cx='1' cy='25.5' r='7.5' className={cl.slider} ref={dotRef} fill='#4AA0F0' />
          </>
        )}
      </svg>
    </div>
  );
};

export default PlaysBatFooter;

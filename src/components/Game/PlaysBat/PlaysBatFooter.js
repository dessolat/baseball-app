import React from 'react';
import cl from './PlaysBat.module.scss';

const PlaysBatFooter = ({ currentDot, handleDotClick }) => {
  const fillColors = {
    first: currentDot === 'first' ? '#1A4C96' : '#E8E6E6',
    second: currentDot === 'second' ? '#1A4C96' : '#E8E6E6',
    third: currentDot === 'third' ? '#1A4C96' : '#E8E6E6',
    fourth: currentDot === 'fourth' ? '#1A4C96' : '#E8E6E6'
  };

  return (
    <div className={cl.footer}>
      <svg width='100%' height='40' viewBox='0 0 334 40' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <text x='0' y='12' className={cl.subHeader}>
          Bat speed (mph)
        </text>
        <path d='M1 25L330 25' stroke='#1A4C96' />
        <text x='182.5' y='12' className={cl.value}>
          90
        </text>
        <circle
          cx='190.5'
          cy='25.38184'
          r='5'
          className={cl.dot}
          onClick={handleDotClick('first')}
          fill={fillColors.first}
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
          fill={fillColors.second}
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
          fill={fillColors.third}
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
          fill={fillColors.fourth}
        />
        <circle cx='326.5' cy='25.5' r='7.5' className={cl.slider} fill='#4AA0F0' />
      </svg>
    </div>
  );
};

export default PlaysBatFooter;

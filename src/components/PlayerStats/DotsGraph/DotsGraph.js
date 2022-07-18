import React from 'react';
import cl from './DotsGraph.module.scss';

const DotsGraph = ({ color = 'green' }) => {
  const dotsData = { color };

  dotsData.coords = [];
  for (let i = 0; i < 25; i++) {
    dotsData.coords.push([Math.random() * 100, Math.random() * 100]);
  }

  const xScale = 46 / 100;
  const yScale = 75 / 100;
  return (
    <svg viewBox='0 0 100 230' xmlns='http://www.w3.org/2000/svg' className={cl.graph}>
      {/* Top title */}
      <text x='50' y='15' textAnchor='middle' className={cl.topTitle}>
        Type
      </text>
			{/* Circles rendering */}
      {dotsData.coords.map((coord, i) => (
        <circle
          key={i}
          cx={27 + xScale * coord[0]}
          cy={88 + yScale * coord[1]}
          r='3.75'
          fill={dotsData.color}
          stroke='black'
          strokeWidth='0.5'
        />
      ))}
      {/* Dots rect */}
      <rect x='27' y='88' width='46' height='75' stroke='#EAEAEA' fill='none' />
      {/* Floor pad */}
      <path d='M26.91489 203H72.4255L81 220.122L49.3404 230L19 220.122L26.91489 203Z' fill='#EAEAEA' />
      
    </svg>
  );
};

export default DotsGraph;

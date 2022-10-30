import React, { Fragment } from 'react';
import DraggableArea from './DraggableArea';
import cl from './Timeline.module.scss';

const Timeline = () => {
  const LINES = [
    { color: '#1A4C96' },
    { color: '#FFAB00' },
    { color: '#BF8610' },
    { color: '#8D6004' },
    { color: '#5C4006' }
  ];

  return (
    <div className={cl.wrapper}>
      <svg viewBox='0 0 885 52' className={cl.chart}>
        {/* Horizontal lines */}
        {LINES.map(({ color }, i) => (
          <line key={i} x1='0' y1={(i + 1) * 9} x2='885' y2={(i + 1) * 9} stroke={color} strokeWidth='1' />
        ))}

        {/* Lines text */}
        {LINES.map((_, i) => (
          <Fragment key={i}>
            <rect x={55 + i * 31} y={(i + 1) * 9 - 6} width='24' height='10' fill='#fff' />
            <text x={57.87 + i * 31} y={(i + 1) * 9 + 2.9} className={cl.horizontalLineText}>
              P-H
            </text>
            <rect x={55 + i * 31 + 273} y={(i + 1) * 9 - 6} width='24' height='10' fill='#fff' />
            <text x={57.87 + i * 31 + 273} y={(i + 1) * 9 + 2.9} className={cl.horizontalLineText}>
              P-H
            </text>
            <rect x={55 + i * 31 + 546} y={(i + 1) * 9 - 6} width='24' height='10' fill='#fff' />
            <text x={57.87 + i * 31 + 546} y={(i + 1) * 9 + 2.9} className={cl.horizontalLineText}>
              P-H
            </text>
          </Fragment>
        ))}
				
				{/* Draggable area */}
				<DraggableArea />
      </svg>
    </div>
  );
};

export default Timeline;

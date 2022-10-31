import React, { forwardRef } from 'react';
import cl from './Timeline.module.scss';

const DraggableArea = ({ x1, x2, handleMouseDown, viewBoxWidth }, ref) => {
  const x1relative = (viewBoxWidth / 100) * x1;
  const x2relative = (viewBoxWidth / 100) * x2;
  return (
    <>
      <rect
        x={x1relative}
        y='0'
        width={x2relative - x1relative}
        height='52'
        fill='#E0F0FF'
        fillOpacity='0.4'
        className={cl.draggableRect}
        onMouseDown={handleMouseDown}
        onDragStart={e => e.preventDefault()}
        name='drag-area'
        ref={ref}
      />
      <line
        x1={x1relative + 1}
        y1='0'
        x2={x1relative + 1}
        y2='52'
        stroke='#1A4C96'
        strokeWidth='2'
        className={cl.draggableLine}
        onMouseDown={handleMouseDown}
        onDragStart={e => e.preventDefault()}
        name='left-line'
      />
      <line
        x1={x2relative - 1}
        y1='0'
        x2={x2relative - 1}
        y2='52'
        stroke='#1A4C96'
        strokeWidth='2'
        className={cl.draggableLine}
        onMouseDown={handleMouseDown}
        onDragStart={e => e.preventDefault()}
        name='right-line'
      />
    </>
  );
};

export default forwardRef(DraggableArea);

import React from 'react';
import cl from './Timeline.module.scss';

const DraggableArea = () => {
  return (
    <>
      <rect
        x='210'
        y='0'
        width='384'
        height='52'
        fill='#E0F0FF'
        fillOpacity='0.4'
        className={cl.draggableRect}
      />
      <line x1='209' y1='0' x2='209' y2='52' stroke='#1A4C96' strokeWidth='2' className={cl.draggableLine} />
      <line x1='593' y1='0' x2='593' y2='52' stroke='#1A4C96' strokeWidth='2' className={cl.draggableLine} />
    </>
  );
};

export default DraggableArea;

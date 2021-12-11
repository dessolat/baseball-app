import React from 'react';
import Rectangle from '../Rectangle';
import cl from './Bases.module.scss';

const Bases = ({ r1, r2, r3 }) => {
  return (
    <div className={cl.rectangles}>
      <Rectangle className={cl.topRectangle + ' ' + cl.absolute} fill={r2 && '#FFAB00'} />
      <Rectangle className={cl.leftRectangle + ' ' + cl.absolute} fill={r3 && '#FFAB00'} />
      <Rectangle className={cl.rightRectangle + ' ' + cl.absolute} fill={r1 && '#FFAB00'} />
    </div>
  );
};

export default Bases;

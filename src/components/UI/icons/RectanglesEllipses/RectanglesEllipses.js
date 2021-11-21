import React from 'react';
import Ellipse from '../Ellipse';
import Rectangle from '../Rectangle';
import cl from './RectanglesEllipses.module.scss';

const RectanglesEllipses = ({ r1, r2, r3, outs }) => {
  return (
    <div className={cl.rectangles}>
      <Rectangle className={cl.topRectangle + ' ' + cl.absolute} fill={r2 && '#FFAB00'} />
      <Rectangle className={cl.leftRectangle + ' ' + cl.absolute} fill={r3 && '#FFAB00'} />
      <Rectangle className={cl.rightRectangle + ' ' + cl.absolute} fill={r1 && '#FFAB00'} />
      <Ellipse className={cl.leftEllipse + ' ' + cl.absolute} fill={outs > 0 && '#1A4C96'} />
      <Ellipse className={cl.rightEllipse + ' ' + cl.absolute} fill={outs > 1 && '#1A4C96'} />
    </div>
  );
};

export default RectanglesEllipses;

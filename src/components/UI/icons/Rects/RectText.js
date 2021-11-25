import React from 'react';
import cl from './Rects.module.scss';

const RectText = ({ icons }) => {
  const classes = [cl.filter, cl.rectText, cl[icons.rect_color]];
  const text = icons.rect_text.toLowerCase();

  text === 'filders choice out' && classes.push(cl.f10_5);
  text === 'grounded into dp' && classes.push(cl.f11);
  text === 'caught stealing' && classes.push(cl.f11_5);
  (text === 'fielders choice' || text === 'pickoff attempt') && classes.push(cl.f12);

  return <div className={classes.join(' ')}>{icons.rect_text.toUpperCase()}</div>;
};

export default RectText;

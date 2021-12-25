import React from 'react';
import cl from './Rects.module.scss';

const RectText = ({ icons }) => {
  const classes = [cl.rectText, cl[icons.rect_color]];
  return <div className={classes.join(' ')}>{icons.rect_text.toUpperCase()}</div>;
};

export default RectText;

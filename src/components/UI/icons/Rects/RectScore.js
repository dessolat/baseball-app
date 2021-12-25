import React from 'react';
import cl from './Rects.module.scss';

const RectScore = ({ icons }) => {
  const classes = [cl.score, cl.rectText];
  const scoreText = icons.score_gue + ' - ' + icons.score_own;

  return <div className={classes.join(' ')}>{scoreText}</div>;
};

export default RectScore;

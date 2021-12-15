import React from 'react';
import cl from './Rects.module.scss';

const RectScore = ({icons}) => {
	const classes = [cl.score, cl.rectText]

  return (
    <div className={classes.join(' ')}>
      {icons.score_gue + ' - ' + icons.score_own}
    </div>
  );
};

export default RectScore;

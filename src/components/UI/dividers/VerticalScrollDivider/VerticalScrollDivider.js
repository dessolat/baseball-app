import React from 'react';
import cl from './VerticalScrollDivider.module.scss';

const VerticalScrollDivider = ({ direction = 'left', ...props }) => {
	const classes = [cl.divider]
	classes.push(direction === 'left' ? cl.left : cl.right)

  return <div className={classes.join(' ')} {...props}></div>;
};

export default VerticalScrollDivider;

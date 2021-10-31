import React from 'react';

const Ellipse = ({fill, ...props}) => {
	return (
    <svg {...props} width='10' height='11' viewBox='0 0 10 11' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <circle cx='5' cy='5.82837' r='4.75' fill={fill === false ? 'none' : fill} stroke='black' strokeWidth='0.5' />
    </svg>
  );
};

export default Ellipse;

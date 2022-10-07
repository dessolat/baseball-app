import React, {useState, useLayoutEffect} from 'react';

const PlaysSpinChart = ({ pitch }) => {
  const { offset_x, offset_y } = pitch || 0;

	const [currentDotRadius, setCurrentDotRadius] = useState(0);

  useLayoutEffect(() => {
    if (pitch === null) return;

    setCurrentDotRadius(prev => prev === 1 ? 0.99999 : 1);
  }, [offset_x, offset_y]);

  useLayoutEffect(() => {
		if (pitch === null) return;

    currentDotRadius < 7.5 &&
      setTimeout(() => {
        setCurrentDotRadius(prev => (prev + 0.45 > 7.5) ? 7.5 : prev + 0.45);
      }, 10);

    // eslint-disable-next-line
  }, [currentDotRadius]);

  const isDrawBall = pitch;
  const coordX = 50 + 50 * offset_x;
  const coordY = 50 - 50 * offset_y;
  return (
    <svg width='100' height='100' viewBox='0 0 100 100' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <line x1='49.5' y1='100' x2='49.5' stroke='#ACACAC' />
      <line y1='49.5' x2='100' y2='49.5' stroke='#ACACAC' />
      {isDrawBall && <circle cx={coordX} cy={coordY} r={currentDotRadius} fill='#2B9D6A' />}
    </svg>
  );
};

export default PlaysSpinChart;

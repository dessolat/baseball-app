import React from 'react';
import PlaysFieldBall from './PlaysFieldBall';

const PlaysFieldBalls = ({ coords, count, coeff }) => {
  return (
    <>
      {coords.slice(0, count).map((coord, i) => (
        <PlaysFieldBall key={i} coord={coord} index={i} coeff={coeff} coordsLength={coords.length} />
      ))}
    </>
  );
};

export default PlaysFieldBalls;

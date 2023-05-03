import React from 'react';
import cl from './PlaysField.module.scss';

const PlaysFieldBall = ({ coord, index, coordsLength }) => {
  const ballClasses = [cl.ball];
  index === coordsLength - 1 && ballClasses.push(cl.onTop);

	const ballHalfSize = `${12.5 * coord[4] / 2}px`
	const xShadowHalfSize = `${7.5 * coord[4] / 2}px`

  const ballStyles = {
    left: `calc(${coord[0] * 100 / 1920}% - ${ballHalfSize})`,
    top: `calc(${coord[1] * 100 / 1080}% - ${ballHalfSize})`,
    // left: coord[0] * coeff.x - (12.5 * coord[4]) / 2,
    // top: coord[1] * coeff.y - (12.5 * coord[4]) / 2,
    width: 12.5 * coord[4] + 'px',
    height: 12.5 * coord[4] + 'px'
  };

  const shadowStyles = {
    left: `calc(${coord[2] * 100 / 1920}% - ${ballHalfSize})`,
    top: `calc(${coord[3] * 100 / 1080}% - ${xShadowHalfSize})`,
    // left: coord[2] * coeff.x - (12.5 * coord[4]) / 2,
    // top: coord[3] * coeff.y - (7.5 * coord[4]) / 2,
    width: 12.5 * coord[4] + 'px',
    height: 7.5 * coord[4] + 'px'
  };

  return (
    <>
      <div className={ballClasses.join(' ')} style={ballStyles}></div>
      <div className={cl.shadow} style={shadowStyles}></div>
    </>
  );
};

export default PlaysFieldBall;

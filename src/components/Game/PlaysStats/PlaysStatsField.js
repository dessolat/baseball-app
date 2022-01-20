import React from 'react';
import cl from './PlaysStats.module.scss';

const PlaysStatsField = ({ hit }) => {
  const { data_2d } = hit || 0;

  let ballPath = data_2d ? `M${data_2d[0][0]} ${data_2d[0][1]}` : '';
  data_2d && data_2d.slice(1).forEach(coords => (ballPath += `L${coords[0]} ${coords[1]}`));

  const intermediatePoints = data_2d
    ? data_2d
        .filter(coords => coords[3] === 1)
        .map((coords, i) => <circle key={i} cx={coords[0]} cy={coords[1]} r={18} fill='red'></circle>)
    : '';

  return (
    <div className={cl.field}>
      <svg width='100%' height='100%' viewBox='0 0 2560 2560' fill='none' preserveAspectRatio='none'>
        <path
          d={ballPath}
          stroke='#4AA0F0'
          strokeWidth='20'
          strokeLinejoin='round'
          strokeLinecap='round'></path>
        {intermediatePoints}
      </svg>
    </div>
  );
};

export default PlaysStatsField;

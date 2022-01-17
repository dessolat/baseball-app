import React, { memo } from 'react';
import cl from './PlaysBat.module.scss';

const PlaysBatHeader = ({ bat }) => {
  const { max_speed } = bat || {};

	const maxSpeedValue = max_speed ? `${max_speed} mph` : ' '
	const angleValue = max_speed ? `12.4 degrees` : ' '
  return (
    <div className={cl.header}>
      <div>
        <p className={cl.subHeader}>Max speed</p>
        <p className={cl.headerValue}>{maxSpeedValue}</p>
      </div>
      <div>
        <p className={cl.subHeader}>Attack Angle</p>
        <p className={cl.headerValue}>{angleValue}</p>
      </div>
    </div>
  );
};

export default memo(PlaysBatHeader);

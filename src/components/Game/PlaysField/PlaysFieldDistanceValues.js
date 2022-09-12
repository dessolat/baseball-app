import React from 'react';

const PlaysFieldDistanceValues = ({ currentMoment, cl }) => {
  const releaseHeight = currentMoment?.metering?.pitch?.release_height;
  const releaseSide = currentMoment?.metering?.pitch?.release_side;

  const releaseHeightValue = releaseHeight?.toFixed(1) ?? '';
  const releaseSideValue = releaseSide?.toFixed(1) ?? '';

  return (
    <div className={cl.releaseData}>
      <p className={cl.subHeader}>Release height</p>
      <p className={cl.regularValue}>{releaseHeightValue} m</p>
      <p className={cl.subHeader}>Release side</p>
      <p className={cl.regularValue}>{releaseSideValue} m</p>
    </div>
  );
};

export default PlaysFieldDistanceValues;

import React from 'react';

const PlaysFieldSpeedValues = ({ currentMoment, cl }) => {
  const initSpeed = currentMoment?.metering?.pitch?.start_speed;
  const plateSpeed = currentMoment?.metering?.pitch?.end_speed;

  const releaseValue = initSpeed?.toFixed(1) ?? '';
  const platePointValue = plateSpeed?.toFixed(1) ?? '';
  return (
    <div className={cl.speedData}>
      <p className={cl.subHeader}>
        <span className={cl.releaseSpeed}>Release speed</span>
        <span className={cl.plateTitle}>/ Plate point speed</span>
      </p>
      <span className={cl.releaseValue}>{releaseValue} mph</span>
      <span className={cl.regularValue}>/ {platePointValue} mph</span>
      <p className={cl.plateMobileHeader}>
        <span className={cl.plateTitle}>Plate point speed</span>
      </p>
      <span className={cl.regularMobileValue}>{platePointValue} mph</span>
    </div>
  );
};

export default PlaysFieldSpeedValues;

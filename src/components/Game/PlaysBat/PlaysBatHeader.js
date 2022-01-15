import React from 'react';
import cl from './PlaysBat.module.scss';

const PlaysBatHeader = ({ bat }) => {
  const { max_speed = '' } = bat || {};

  return (
    <div className={cl.header}>
      <div>
        <p className={cl.subHeader}>Max speed</p>
        <p className={cl.headerValue}>{max_speed} mph</p>
      </div>
      <div>
        <p className={cl.subHeader}>Attack Angle</p>
        <p className={cl.headerValue}>12.4 degrees</p>
      </div>
    </div>
  );
};

export default PlaysBatHeader;

import React from 'react';
import cl from './PlaysBat.module.scss';

const PlaysBatHeader = () => {
  return (
    <div className={cl.header}>
      <div>
        <p className={cl.subHeader}>Max speed</p>
        <p className={cl.headerValue}>70.3 mph</p>
      </div>
      <div>
        <p className={cl.subHeader}>Attack Angle</p>
        <p className={cl.headerValue}>12.4 degrees</p>
      </div>
    </div>
  );
};

export default PlaysBatHeader;

import React from 'react';
import cl from './Loader.module.scss';

const Loader = ({ styles = null, loadedPercents = null }) => {
  const isPercentsTitle = loadedPercents && loadedPercents >= 10;

  return (
    <div className={cl.loader} style={styles}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      {isPercentsTitle && (
        <span style={{ position: 'absolute', bottom: '-4.5rem', left: '50%', translate: '-50% 0' }}>
          {Math.round(loadedPercents)}%
        </span>
      )}
    </div>
  );
};

export default Loader;

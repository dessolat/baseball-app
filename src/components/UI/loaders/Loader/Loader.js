import React from 'react';
import cl from './Loader.module.scss';
import ProgressBar from '../ProgressBar/ProgressBar';

const Loader = ({ styles = null, loadedPercents = null }) => {
  const isPercentsTitle = loadedPercents && loadedPercents >= 10;

  const progressStyles = {
    bottom: '-4.5rem',
    left: '50%',
    translate: '-50% 0',
    borderRadius: '2px',
    height: '4px',
    width: 100,
    backgroundColor: 'white'
  };
  return (
    <div className={cl.loader} style={styles}>
      <div className={cl.leaf}></div>
      <div className={cl.leaf}></div>
      <div className={cl.leaf}></div>
      <div className={cl.leaf}></div>
      <div className={cl.leaf}></div>
      <div className={cl.leaf}></div>
      <div className={cl.leaf}></div>
      <div className={cl.leaf}></div>
      {isPercentsTitle && <ProgressBar progress={loadedPercents} style={progressStyles} />}
    </div>
  );
};

export default Loader;

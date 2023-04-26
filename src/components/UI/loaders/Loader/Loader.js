import React from 'react';
import cl from './Loader.module.scss';

// const ProgressTitle = ({ loadedPercents }) => (
//   <span style={{ position: 'absolute', bottom: '-4.5rem', left: '50%', translate: '-50% 0' }}>
//     {Math.round(loadedPercents)}%
//   </span>
// );

const ProgressBar = ({ loadedPercents }) => (
  <progress
    value={Math.round(loadedPercents)}
    max='100'
    style={{
      position: 'absolute',
      bottom: '-4.5rem',
      left: '50%',
      translate: '-50% 0',
      borderRadius: '2px',
      height: '4px',
      width: 100
    }}></progress>
);

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
      {isPercentsTitle && <ProgressBar loadedPercents={loadedPercents} />}
    </div>
  );
};

export default Loader;

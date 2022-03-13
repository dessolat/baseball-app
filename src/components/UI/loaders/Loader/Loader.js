import React from 'react';
import cl from './Loader.module.scss';

const Loader = ({ styles = null }) => {
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
    </div>
  );
};

export default Loader;

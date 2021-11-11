import React from 'react';
import cl from './Loader.module.scss';

const Loader = () => {
  return (
    <div className={cl.loader}>
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

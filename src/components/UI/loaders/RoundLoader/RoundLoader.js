import React from 'react';
import cl from './RoundLoader.module.scss';

const RoundLoader = () => {
  return (
    <div class={cl.ldsSpinner}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
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

export default RoundLoader;

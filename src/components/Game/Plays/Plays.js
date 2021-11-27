import React from 'react';
import cl from './Plays.module.scss';
import PlaysField from '../PlaysField/PlaysField';
import PlaysSpin from '../PlaysSpin/PlaysSpin';

const Plays = () => {
  return (
    <div className={cl.plays}>
      <div className={cl.events}></div>
      <div className={cl.speed}></div>
      <PlaysSpin />
      <PlaysField />
      <div className={cl.footer}></div>
    </div>
  );
};

export default Plays;

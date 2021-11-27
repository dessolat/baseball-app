import React from 'react';
import cl from './Plays.module.scss';
import PlaysField from '../PlaysField/PlaysField';
import PlaysSpin from '../PlaysSpin/PlaysSpin';
import PlaysSpeed from '../PlaysSpeed/PlaysSpeed';

const Plays = () => {
  return (
    <div className={cl.plays}>
      <div className={cl.events}></div>
      <PlaysSpeed />
      <PlaysSpin />
      <PlaysField />
      <div className={cl.footer}></div>
    </div>
  );
};

export default Plays;

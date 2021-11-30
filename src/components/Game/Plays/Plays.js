import React from 'react';
import cl from './Plays.module.scss';
import PlaysField from '../PlaysField/PlaysField';
import PlaysSpin from '../PlaysSpin/PlaysSpin';
import PlaysSpeed from '../PlaysSpeed/PlaysSpeed';
import PlaysEvents from '../PlaysEvents/PlaysEvents';
import PlaysFooter from '../PlaysFooter/PlaysFooter';

const Plays = () => {
  return (
    <div className={cl.plays}>
      <PlaysEvents />
      <PlaysSpeed />
      <PlaysSpin />
      <PlaysField />
      <PlaysFooter />
    </div>
  );
};

export default Plays;

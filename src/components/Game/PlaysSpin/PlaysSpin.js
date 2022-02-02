import React from 'react';
import cl from './PlaysSpin.module.scss';
import PlaysSpinChart from './PlaysSpinChart';
import PlaysSpinInfo from './PlaysSpinInfo';

const PlaysSpin = ({ pitch }) => (
  <div className={cl.spin}>
    <PlaysSpinChart pitch={pitch} />
    <PlaysSpinInfo pitch={pitch} />
  </div>
);

export default PlaysSpin;

import React from 'react';
import { useSelector } from 'react-redux';
import cl from './PlaysSpin.module.scss';
import PlaysSpinChart from './PlaysSpinChart';
import PlaysSpinInfo from './PlaysSpinInfo';

const PlaysSpin = ({ pitch }) => {
	const pitchState = useSelector(state => state.game.pitchState)
	
  return (
    <div className={pitchState !== 'Field' ? cl.spin : cl.spin + ' ' + cl.dnone}>
      <PlaysSpinChart pitch={pitch} />
      <PlaysSpinInfo pitch={pitch} />
    </div>
  );
};

export default PlaysSpin;

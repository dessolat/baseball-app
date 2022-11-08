import classNames from 'classnames';
import React from 'react';
import { useSelector } from 'react-redux';
import cl from './PlaysSpin.module.scss';
import PlaysSpinChart from './PlaysSpinChart';
import PlaysSpinInfo from './PlaysSpinInfo';

const PlaysSpin = ({ pitch }) => {
  const pitchState = useSelector(state => state.game.pitchState);

  const wrapperClasses = classNames(cl.spin, {
    [cl.dnone]: pitchState === 'Field'
  });
  return (
    <div className={wrapperClasses}>
      <PlaysSpinChart pitch={pitch} />
      {/* <PlaysSpinInfo pitch={pitch} /> */}
    </div>
  );
};

export default PlaysSpin;

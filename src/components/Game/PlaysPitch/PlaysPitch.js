import React from 'react';
import PlaysField from '../PlaysField/PlaysField';
import PlaysSpin from '../PlaysSpin/PlaysSpin';
import PlaysSpeed from '../PlaysSpeed/PlaysSpeed';
import { useSelector } from 'react-redux';

const PlaysPitch = () => {
	const currentMoment = useSelector(state => state.game.currentMoment)
  return (
    <>
      <PlaysSpeed currentMoment={currentMoment} />
      <PlaysSpin pitch={currentMoment?.metering?.pitch} />
      <PlaysField currentMoment={currentMoment} />
    </>
  );
};

export default PlaysPitch;

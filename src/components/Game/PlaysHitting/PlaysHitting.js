import React from 'react';
import { useSelector } from 'react-redux';
import PlaysBat from '../PlaysBat/PlaysBat';
import PlaysStats from '../PlaysStats/PlaysStats';

const PlaysHitting = () => {
	const currentMoment = useSelector(state => state.game.currentMoment)
  return (
    <>
      <PlaysBat currentMoment={currentMoment} />
      <PlaysStats hit={currentMoment.metering?.hit} />
    </>
  );
};

export default PlaysHitting;

import React from 'react';
import PlaysBat from '../PlaysBat/PlaysBat';
import PlaysStats from '../PlaysStats/PlaysStats';

const PlaysHitting = ({ currentMoment }) => {
  return (
    <>
      <PlaysBat currentMoment={currentMoment} />
      <PlaysStats hit={currentMoment.metering?.hit} />
    </>
  );
};

export default PlaysHitting;

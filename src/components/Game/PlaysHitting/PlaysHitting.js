import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import PlaysBat from '../PlaysBat/PlaysBat';
import PlaysStats from '../PlaysStats/PlaysStats';

const PlaysHitting = () => {
  const [hittingMode, setHittingMode] = useState('Bat');
  return (
    <>
      <PlaysBat currentMoment={currentMoment} />
      <PlaysStats hit={currentMoment.metering?.hit} />
    </>
  );
};

export default PlaysHitting;

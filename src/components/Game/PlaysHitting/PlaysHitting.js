import React, { useState } from 'react';
import PlaysBat from '../PlaysBat/PlaysBat';
import PlaysStats from '../PlaysStats/PlaysStats';

const PlaysHitting = ({currentMoment}) => {
  const [currentDot, setCurrentDot] = useState('');

  const handleDotClick = str => () => setCurrentDot(str);

  return (
    <>
      <PlaysBat currentDot={currentDot} handleDotClick={handleDotClick} currentMoment={currentMoment} />
      <PlaysStats />
    </>
  );
};

export default PlaysHitting;

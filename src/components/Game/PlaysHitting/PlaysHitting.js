import React, { useState } from 'react';
import PlaysBat from '../PlaysBat/PlaysBat';
import PlaysStats from '../PlaysStats/PlaysStats';

const PlaysHitting = () => {
  const [currentDot, setCurrentDot] = useState('');

  const handleDotClick = str => () => setCurrentDot(str);

  return (
    <>
      <PlaysBat currentDot={currentDot} handleDotClick={handleDotClick} />
      <PlaysStats />
    </>
  );
};

export default PlaysHitting;

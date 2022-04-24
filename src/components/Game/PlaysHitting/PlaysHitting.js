import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import PlaysBat from '../PlaysBat/PlaysBat';
import PlaysStats from '../PlaysStats/PlaysStats';

const PlaysHitting = () => {
  const [hittingMode, setHittingMode] = useState('Bat');

  const currentMoment = useSelector(state => state.game.currentMoment);
  const mobileWidth = useSelector(state => state.shared.mobileWidth);

  return (
    <>
      {(mobileWidth > 1000 || hittingMode === 'Bat') && (
        <PlaysBat currentMoment={currentMoment} setHittingMode={setHittingMode} />
      )}
      {(mobileWidth > 1000 || hittingMode === 'Stats') && (
        <PlaysStats hit={currentMoment.metering?.hit} setHittingMode={setHittingMode} />
      )}
    </>
  );
};

export default PlaysHitting;

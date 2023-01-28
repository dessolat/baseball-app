import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import HittingField from './HittingField/HittingField';
import HittingGraph from './HittingGraph';
import HittingStats from './HittingStats';
import HittingVideos from './HittingVideos/HittingVideos';

const PlaysHitting = () => {
  const [hittingMode] = useState('Field');

  const currentMoment = useSelector(state => state.game.currentMoment);
  const mobileWidth = useSelector(state => state.shared.mobileWidth);

  return (
    <>
      {(mobileWidth > 1000 || hittingMode === 'Field') && <HittingField hit={currentMoment.metering?.hit} />}
      {(mobileWidth > 1000 || hittingMode === 'Stats') && <HittingStats hit={currentMoment.metering?.hit} />}
      {(mobileWidth > 1000 || hittingMode === 'Graph') && <HittingGraph currentMoment={currentMoment} />}
      {(mobileWidth > 1000 || hittingMode === 'Videos') && <HittingVideos />}
      {/* {(mobileWidth > 1000 || hittingMode === 'Bat') && (
        <PlaysBat currentMoment={currentMoment} setHittingMode={setHittingMode} />
      )}
      {(mobileWidth > 1000 || hittingMode === 'Stats') && (
        <PlaysStats hit={currentMoment.metering?.hit} setHittingMode={setHittingMode} />
      )} */}
    </>
  );
};

export default PlaysHitting;

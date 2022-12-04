import React, { useState } from 'react';
import { useSelector } from 'react-redux';
// import PlaysBat from '../PlaysBat/PlaysBat';
// import PlaysStats from '../PlaysStats/PlaysStats';
import { HittingField } from './HittingField';
import HittingGraph from './HittingGraph';
import HittingStats from './HittingStats';
import HittingVideos from './HittingVideos/HittingVideos';

const PlaysHitting = () => {
  const [hittingMode, setHittingMode] = useState('Field');

  const currentMoment = useSelector(state => state.game.currentMoment);
  const mobileWidth = useSelector(state => state.shared.mobileWidth);

  return (
    <>
      {(mobileWidth > 1000 || hittingMode === 'Field') && (
				<HittingField />
      )}
      {(mobileWidth > 1000 || hittingMode === 'Stats') && (
				<HittingStats />
      )}
      {(mobileWidth > 1000 || hittingMode === 'Graph') && (
				<HittingGraph />
      )}
      {(mobileWidth > 1000 || hittingMode === 'Videos') && (
				<HittingVideos />
      )}
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

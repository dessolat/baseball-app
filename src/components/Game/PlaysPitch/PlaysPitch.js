import React from 'react';
import PlaysField from '../PlaysField/PlaysField';
import PlaysSpin from '../PlaysSpin/PlaysSpin';
import PlaysSpeed from '../PlaysSpeed/PlaysSpeed';
import { useSelector } from 'react-redux';
import PitchValues from './PitchValues/PitchValues';
import PitchVideos from './PitchVideo/PitchVideos';
import { DotRadiusContext } from 'context';

const PlaysPitch = () => {
  const currentMoment = useSelector(state => state.game.currentMoment);

  const { Provider } = DotRadiusContext;
  return (
    <>
      <PlaysField currentMoment={currentMoment} />
      <Provider value={4}>
        <PlaysSpeed currentMoment={currentMoment} />
        <PlaysSpin pitch={currentMoment?.metering?.pitch} />
      </Provider>
      <PitchVideos />
      <PitchValues />
    </>
  );
};

export default PlaysPitch;

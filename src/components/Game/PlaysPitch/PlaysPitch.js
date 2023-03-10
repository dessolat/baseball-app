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
    <Provider value={3}>
      <PlaysField currentMoment={currentMoment} />
      <PlaysSpeed currentMoment={currentMoment} />
      <PlaysSpin pitch={currentMoment?.metering?.pitch} />
      <PitchVideos />
      <PitchValues />
    </Provider>
  );
};

export default PlaysPitch;

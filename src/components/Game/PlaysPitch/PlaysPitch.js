import React from 'react';
import PlaysField from '../PlaysField/PlaysField';
import PlaysSpin from '../PlaysSpin/PlaysSpin';
import PlaysSpeed from '../PlaysSpeed/PlaysSpeed';
import { useSelector } from 'react-redux';
import PitchValues from './PitchValues/PitchValues';
import PitchVideos from './PitchVideo/PitchVideos';
import BroadcastPitchVideos from './PitchVideo/BroadcastPitchVideos';

const PlaysPitch = () => {
  const currentMoment = useSelector(state => state.game.currentMoment);
  const isBroadcast = useSelector(state => state.game.isBroadcast);

  return (
    <>
      <PlaysField currentMoment={currentMoment} />
      <PlaysSpeed currentMoment={currentMoment} />
      <PlaysSpin pitch={currentMoment?.metering?.pitch} />
      {!isBroadcast && <PitchVideos />}
      {isBroadcast && <BroadcastPitchVideos />}
      <PitchValues />
    </>
  );
};

export default PlaysPitch;

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
  const preview = useSelector(state => state.game.preview);

  const isInterruptedMoment =
    !isBroadcast &&
    !!preview.camera_info.broadcast_link_add_moment_from &&
    currentMoment?.inner?.id >= preview.camera_info.broadcast_link_add_moment_from;
  return (
    <>
      <PlaysField currentMoment={currentMoment} />
      <PlaysSpeed currentMoment={currentMoment} />
      <PlaysSpin pitch={currentMoment?.metering?.pitch} />
      {!isBroadcast && !isInterruptedMoment && <PitchVideos />}
      {(isBroadcast || isInterruptedMoment) && <BroadcastPitchVideos />}
      <PitchValues />
    </>
  );
};

export default PlaysPitch;

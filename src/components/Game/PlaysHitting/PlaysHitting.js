import { useRef } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import HittingField from './HittingField/HittingField';
import HittingGraph from './HittingGraph';
import HittingStats from './HittingStats';
import HittingVideos from './HittingVideos/HittingVideos';
import BroadcastHittingVideos from './HittingVideos/BroadcastHittingVideos';

const HittingFieldVideos = () => {
  const fieldVideoRef = useRef(null);

  const videoPlaybackRate = useSelector(s => s.game.videoPlaybackRate);
  const isBroadcast = useSelector(s => s.game.isBroadcast);

  const handleOnReady = target => {
    fieldVideoRef.current = target;

    target.pauseVideo();
    target.setPlaybackRate(videoPlaybackRate);
  };
  return (
    <>
      <HittingField handleOnReady={handleOnReady} />
      {!isBroadcast && <HittingVideos ref={fieldVideoRef} />}
      {isBroadcast && <BroadcastHittingVideos />}
      {/* {(mobileWidth > 1000 || hittingMode === 'Field') && <HittingField handleOnReady={handleOnReady} />} */}
      {/* {(mobileWidth > 1000 || hittingMode === 'Videos') && <HittingVideos ref={fieldVideoRef} />} */}
    </>
  );
};

const PlaysHitting = () => {
  const currentMoment = useSelector(state => state.game.currentMoment, shallowEqual);
  return (
    <>
      {/* {(mobileWidth > 1000 || hittingMode === 'Stats') && <HittingStats hit={currentMoment.metering?.hit} />} */}
      {/* {(mobileWidth > 1000 || hittingMode === 'Graph') && <HittingGraph currentMoment={currentMoment} />} */}
      <HittingFieldVideos />
      <HittingStats hit={currentMoment.metering?.hit} />
      <HittingGraph currentMoment={currentMoment} />
    </>
  );
};

export default PlaysHitting;

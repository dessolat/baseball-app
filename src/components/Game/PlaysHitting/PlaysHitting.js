import React, { useState, useRef } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import HittingField from './HittingField/HittingField';
import HittingGraph from './HittingGraph';
import HittingStats from './HittingStats';
import HittingVideos from './HittingVideos/HittingVideos';

const HittingFieldVideos = () => {
  const fieldVideoRef = useRef(null);

  // const preferredVideoState = useSelector(state => state.game.preferredVideoState);
  // const currentMoment = useSelector(state => state.game.currentMoment);
  // const videoCurrentTime = useSelector(state => state.game.videoCurrentTime);
  const videoPlaybackRate = useSelector(state => state.game.videoPlaybackRate);

  const handleOnReady = target => {
    fieldVideoRef.current = target;
    // console.log(target);
    // const isForcePlay = preferredVideoState === 1;

    // const timeStartHit = currentMoment?.metering?.hit?.time_start_hit_window;
    // const timeEndHit = currentMoment?.metering?.hit?.time_end_hit_window;
    // const seekToCurrentTime =
    //   videoCurrentTime > 0 && videoCurrentTime > timeStartHit && videoCurrentTime < timeEndHit;
    // const seekToCurrentTime = videoCurrentTime > 0 && !currentMoment.metering.hit;

    // videoHandling(true, isForcePlay, seekToCurrentTime);
		target.pauseVideo()
    target.setPlaybackRate(videoPlaybackRate);
    // position === 'top-left' && dispatch(setVideoPlaybackRate(target.getPlaybackRate()));
  };
  return (
    <>
      <HittingField handleOnReady={handleOnReady} />
      <HittingVideos ref={fieldVideoRef} />
      {/* {(mobileWidth > 1000 || hittingMode === 'Field') && <HittingField handleOnReady={handleOnReady} />} */}
      {/* {(mobileWidth > 1000 || hittingMode === 'Videos') && <HittingVideos ref={fieldVideoRef} />} */}
    </>
  );
};

const PlaysHitting = () => {
  const [hittingMode] = useState('Field');

  const currentMoment = useSelector(state => state.game.currentMoment, shallowEqual);
  // const mobileWidth = useSelector(state => state.shared.mobileWidth);
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

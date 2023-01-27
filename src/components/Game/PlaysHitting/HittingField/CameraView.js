import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import YouTube from 'react-youtube';
import cl from './HittingField.module.scss';

const CameraView = ({ camera2D }) => {
  const videoRef = useRef(null);

  const onReady = ({ target }) => {
    videoRef.current = target;
  };

  return (
    <YouTube
      videoId={'WCjLd7QAJq8'}
      // videoId={videoId}
      onReady={onReady}
      // onStateChange={onStateChange}
      // onPlaybackRateChange={onPlaybackRateChange}
      // onPlaybackQualityChange={playbackQualityHandle}
      containerClassName={cl.cameraView}
      opts={{
        width: '100%',
        height: '100%',
        playerVars: {
          autoplay: 0,
          controls: 0,
          modestbranding: 1,
          disablekb: 1
        }
      }}
    />
  );
};

export default CameraView;

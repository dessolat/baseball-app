import React from 'react';
import YouTube from 'react-youtube';
import cl from './HittingField.module.scss';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import getYouTubeID from 'get-youtube-id';

const CameraView = ({ camera2D, handleOnReady, isVisible = true }) => {
  const preview = useSelector(s => s.game.preview);

  const { camera_info: cameraInfo } = preview;

  const { ip_cam_link: ipCamLink } = cameraInfo;

	const videoId = getYouTubeID(ipCamLink) || null

  const onReady = ({ target }) => {
    handleOnReady(target);
  };

  const videoClasses = classNames(cl.cameraView, {
    [cl.hidden]: !isVisible
  });
  return (
    <YouTube
      videoId={videoId}
      // videoId={videoId}
      onReady={onReady}
      // onStateChange={onStateChange}
      // onPlaybackRateChange={onPlaybackRateChange}
      // onPlaybackQualityChange={playbackQualityHandle}
      containerClassName={videoClasses}
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

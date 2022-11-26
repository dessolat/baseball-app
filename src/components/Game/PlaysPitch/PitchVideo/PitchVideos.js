import React from 'react';
import getYouTubeID from 'get-youtube-id';
import PitchVideo from './PitchVideo';
import { useSelector } from 'react-redux';

const PitchVideos = () => {
	const { camera_info: cameraInfo } = useSelector(state => state.game.preview);

  const { left_main_link: topLeftLink, right_main_link: topRightLink, pitch_link: bottomLink } = cameraInfo;

  const videoId1 = getYouTubeID(topLeftLink) || 'WCjLd7QAJq8';
  const videoId2 = getYouTubeID(topRightLink) || null;
  const videoId3 = getYouTubeID(bottomLink) || null;
  return (
    <>
      <PitchVideo videoId={videoId1} position='top-left' />
      <PitchVideo videoId={videoId2} position='top-right' />
      <PitchVideo videoId={videoId3} position='bottom' />
    </>
  );
};

export default PitchVideos;

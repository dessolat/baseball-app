import React from 'react';
import PlaysField from '../PlaysField/PlaysField';
import PlaysSpin from '../PlaysSpin/PlaysSpin';
import PlaysSpeed from '../PlaysSpeed/PlaysSpeed';
import { useSelector } from 'react-redux';
import PitchVideo from './PitchVideo/PitchVideo';
import PitchValues from './PitchValues/PitchValues';
import getYouTubeID from 'get-youtube-id';

const PlaysPitch = () => {
  const currentMoment = useSelector(state => state.game.currentMoment);
  const { camera_info: cameraInfo } = useSelector(state => state.game.preview);

  const { left_main_link: topLeftLink, right_main_link: topRightLink, pitch_link: bottomLink } = cameraInfo;

  const videoId1 = getYouTubeID(topLeftLink) || 'WCjLd7QAJq8';
  const videoId2 = getYouTubeID(topRightLink) || null;
  const videoId3 = getYouTubeID(bottomLink) || null;

  return (
    <>
      <PlaysField currentMoment={currentMoment} />
      <PlaysSpeed currentMoment={currentMoment} />
      <PlaysSpin pitch={currentMoment?.metering?.pitch} />
      <PitchVideo videoId={videoId1} position='top-left' />
      <PitchVideo videoId={videoId2} position='top-right' />
      <PitchVideo videoId={videoId3} position='bottom' />
      <PitchValues />
    </>
  );
};

export default PlaysPitch;

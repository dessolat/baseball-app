import useCurrentEvents from 'hooks/useCurrentEvents';
import React from 'react';
import PlaysEvents from '../PlaysEvents/PlaysEvents';
import Video from '../Video/Video';
import cl from './Videos.module.scss';
import getYouTubeID from 'get-youtube-id';
import { useSelector } from 'react-redux';

const Videos = () => {
  const preview = useSelector(state => state.game.preview);
  const { pitch_link, bat_left_link, bat_right_link, left_add, left_main, right_add, right_main } =
    preview.camera_info;

  const videoId1 = getYouTubeID(pitch_link);
  return (
    <>
      <div className={cl.wrapper}>
        <Video videoId={videoId1} />
      </div>
      <div className={cl.eventsWrapper}>
        <PlaysEvents moments={useCurrentEvents()} />
      </div>
    </>
  );
};

export default Videos;

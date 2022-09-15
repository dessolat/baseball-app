import useCurrentEvents from 'hooks/useCurrentEvents';
import React from 'react';
import PlaysEvents from '../PlaysEvents/PlaysEvents';
import Video from '../Video/Video';
import cl from './Videos.module.scss';
import getYouTubeID from 'get-youtube-id';
import { useSelector } from 'react-redux';
import classNames from 'classnames';

const Videos = () => {
  const preview = useSelector(state => state.game.preview);
  const viewMode = useSelector(state => state.game.viewMode);

  const {
    pitch_link,
    bat_left_link,
    bat_right_link,
    left_add_link,
    left_main_link,
    right_add_link,
    right_main_link
  } = preview.camera_info;

  const MODE_LINKS = {
    'mode-1': [pitch_link],
    'mode-2': [bat_left_link, bat_right_link],
    'mode-3': [left_add_link, left_main_link, right_add_link, right_main_link],
    'mode-4': [left_add_link, left_main_link, right_add_link, right_main_link]
  };

  const videoId1 = getYouTubeID(MODE_LINKS[viewMode][0]);
  const videoId2 = getYouTubeID(MODE_LINKS[viewMode][1]) || null;
  const videoId3 = getYouTubeID(MODE_LINKS[viewMode][2]) || null;
  const videoId4 = getYouTubeID(MODE_LINKS[viewMode][3]) || null;

  const wrapperClasses = classNames(cl.wrapper, {
    [cl.videos1]: viewMode === 'mode-1',
    [cl.videos2]: viewMode !== 'mode-1'
  });

	const viewModeNumber = +viewMode.slice(-1)
  return (
    <>
      <div className={wrapperClasses}>
        <Video videoId={videoId1} videoNumber={1} />
        {viewModeNumber > 1 && <Video videoId={videoId2} videoNumber={2} />}
        {viewModeNumber > 2 && <Video videoId={videoId3} videoNumber={3} />}
        {viewModeNumber > 2 && <Video videoId={videoId4} videoNumber={4} />}
      </div>
      <div className={cl.eventsWrapper}>
        <PlaysEvents moments={useCurrentEvents()} />
      </div>
    </>
  );
};

export default Videos;

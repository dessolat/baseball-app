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

	const wrapperClasses = classNames(cl.wrapper, {
		[cl.videos1]: viewMode === 'mode-1',
		[cl.videos2]: viewMode !== 'mode-1'
	})
  return (
    <>
      <div className={wrapperClasses}>
      </div>
      <div className={cl.eventsWrapper}>
        <PlaysEvents moments={useCurrentEvents()} />
      </div>
    </>
  );
};

export default Videos;

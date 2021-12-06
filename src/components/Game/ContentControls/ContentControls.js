import React from 'react';
import cl from './ContentControls.module.scss';
import PlayPause from 'components/UI/buttons/PlayPause/PlayPause';
import PlayOnline from 'components/UI/buttons/PlayOnline/PlayOnline';
import { useDispatch, useSelector } from 'react-redux';
import { setPlaybackMode } from 'redux/gameReducer';

const ContentControls = () => {
	const playbackMode = useSelector(state => state.game.playbackMode)
	const dispatch = useDispatch()

	const playbackModeClick = e => {
    const newMode =
      e.currentTarget.name === 'play-pause' ? (playbackMode === 'play' ? 'pause' : 'play') : 'playOnline';
    dispatch(setPlaybackMode(newMode));
  };

  return (
    <div className={cl.controls}>
      <PlayPause
        name='play-pause'
        onClick={playbackModeClick}
        className={playbackMode !== 'playOnline' ? cl.active : ''}
        playbackMode={playbackMode}
      />
      <PlayOnline
        name='play-online'
        onClick={playbackModeClick}
        className={playbackMode === 'playOnline' ? cl.active : ''}
      />
    </div>
  );
};

export default ContentControls;

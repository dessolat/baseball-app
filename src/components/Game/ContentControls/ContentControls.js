import React from 'react';
import cl from './ContentControls.module.scss';
import PlayPause from 'components/UI/buttons/PlayPause/PlayPause';
import Repeat from 'components/UI/buttons/Repeat/Repeat';
import { useDispatch, useSelector } from 'react-redux';
import { setPlaybackMode } from 'redux/gameReducer';

const ContentControls = () => {
	const playbackMode = useSelector(state => state.game.playbackMode)
	const dispatch = useDispatch()

	const playbackModeClick = e => {
    const newMode =
      e.currentTarget.name === 'play-pause' ? (playbackMode === 'play' ? 'pause' : 'play') : 'repeat';
    dispatch(setPlaybackMode(newMode));
  };

  return (
    <div className={cl.controls}>
      <PlayPause
        name='play-pause'
        onClick={playbackModeClick}
        className={playbackMode !== 'repeat' ? cl.active : ''}
        playbackMode={playbackMode}
      />
      <Repeat
        name='repeat'
        onClick={playbackModeClick}
        className={playbackMode === 'repeat' ? cl.active : ''}
      />
    </div>
  );
};

export default ContentControls;

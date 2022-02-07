import React from 'react';
import cl from './ContentControls.module.scss';
import PlayPause from 'components/UI/buttons/PlayPause/PlayPause';
import PlayOnline from 'components/UI/buttons/PlayOnline/PlayOnline';
import { useDispatch, useSelector } from 'react-redux';
import { setPlaybackMode } from 'redux/gameReducer';

const ContentControls = (props) => {
  const playbackMode = useSelector(state => state.game.playbackMode);
  const dispatch = useDispatch();

  const playbackModeClick = e => {
    const newMode =
      e.currentTarget.name === 'play-pause' ? (playbackMode === 'play' ? 'pause' : 'play') : 'playOnline';
    dispatch(setPlaybackMode(newMode));
  };

  const getClassName = name => {
    if (
      (playbackMode !== 'playOnline' && name === 'play-pause') ||
      (playbackMode === 'playOnline' && name === 'play-online')
    )
      return cl.active;
    return '';
  };

  return (
    <div className={cl.controls} {...props}>
      <PlayPause
        name='play-pause'
        onClick={playbackModeClick}
        className={getClassName('play-pause')}
        playbackMode={playbackMode}
      />
      <PlayOnline name='play-online' onClick={playbackModeClick} className={getClassName('play-online')} />
    </div>
  );
};

export default ContentControls;

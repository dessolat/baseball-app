import React from 'react';
import cl from './ContentControls.module.scss';
import PlayOnline from 'components/UI/buttons/PlayOnline/PlayOnline';
import { useDispatch, useSelector } from 'react-redux';
import { setIsLastMomentMode, setPlaybackMode } from 'redux/gameReducer';
import ForwardRepeat from 'components/UI/buttons/ForwardRepeat/ForwardRepeat';
import FirstLastMoment from 'components/UI/buttons/FirstLastMoment/FirstLastMoment';

const ContentControls = ({ noPlayPause = false, isPlayOnline = true, ...props }) => {
  const playbackMode = useSelector(state => state.game.playbackMode);
  const isLastMomentMode = useSelector(state => state.game.isLastMomentMode);
  const dispatch = useDispatch();

  const playbackModeClick = e => {
    const newMode =
      e.currentTarget.name === 'play-pause' ? (playbackMode === 'play' ? 'pause' : 'play') : 'playOnline';
    dispatch(setPlaybackMode(newMode));
  };

  const handlefirstLastBtn = () => dispatch(setIsLastMomentMode());

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
      {!noPlayPause && (
        <>
          <ForwardRepeat
            name='play-pause'
            onClick={playbackModeClick}
            className={getClassName('play-pause')}
            playbackMode={playbackMode}
          />
          <FirstLastMoment
            onClick={handlefirstLastBtn}
						isLastMomentMode={isLastMomentMode}
          />
        </>
      )}
      {isPlayOnline && (
        <PlayOnline name='play-online' onClick={playbackModeClick} className={getClassName('play-online')} />
      )}
    </div>
  );
};

export default ContentControls;

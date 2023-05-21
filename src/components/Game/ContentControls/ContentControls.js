import React from 'react';
import cl from './ContentControls.module.scss';
import PlayOnline from 'components/UI/buttons/PlayOnline/PlayOnline';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentCard, setIsLastMomentMode, setPlaybackMode } from 'redux/gameReducer';
import ForwardRepeat from 'components/UI/buttons/ForwardRepeat/ForwardRepeat';
import FirstLastMoment from 'components/UI/buttons/FirstLastMoment/FirstLastMoment';
import { forwardRef } from 'react';

const ContentControls = ({ noPlayPause = false, isPlayOnline = true, ...props }, ref) => {
  const playbackMode = useSelector(s => s.game.playbackMode);
  const isLastMomentMode = useSelector(s => s.game.isLastMomentMode);
	const filteredCards = useSelector(s => s.game.filteredCards)

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

  const handleScrollDownClick = () => {
    ref.current.scrollTop = ref.current.scrollHeight;
		
		dispatch(setCurrentCard(filteredCards[filteredCards.length - 1]))
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
          <FirstLastMoment onClick={handlefirstLastBtn} isLastMomentMode={isLastMomentMode} />
        </>
      )}
      {isPlayOnline && (
        <PlayOnline
          name='play-online'
          onClick={handleScrollDownClick}
          className={getClassName('play-online')}
        />
      )}
    </div>
  );
};

export default forwardRef(ContentControls);

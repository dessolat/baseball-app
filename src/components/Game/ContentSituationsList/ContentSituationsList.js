import React, { forwardRef, useEffect, useRef } from 'react';
import cl from './ContentSituationsList.module.scss';
import ContentSituationsListItem from '../ContentSituationsListItem/ContentSituationsListItem';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentCard, setListScrollTop } from 'redux/gameReducer';
import useArrowNavigate from 'hooks/useArrowNavigate';
import ContentControls from '../ContentControls/ContentControls';
import MobileLandscapeTabs from './MobileLandscapeTabs';
import classNames from 'classnames';
import useGameFocus from 'hooks/useGameFocus';

const ControlsWrapper = forwardRef(({}, ref) => {
  const listScrollTop = useSelector(state => state.game.listScrollTop);

  return (
    <div className={cl.controlsWrapper} style={!listScrollTop ? { display: 'none' } : null}>
      <ContentControls noPlayPause ref={ref} />
    </div>
  );
});

const ContentSituationsList = ({ filteredCards, currentCard, beforeAfterData, isVideo, currentTab }, ref) => {
  const activeCardList = useSelector(state => state.game.activeCardList);
  const dispatch = useDispatch();
  const handleKeyDown = useArrowNavigate(filteredCards, currentCard);

  const listRef = useRef(0);
  const scrollTimeoutRef = useRef();

  useEffect(() => {
    const timeout = setTimeout(() => {
      const isListScroll =
        (listRef.current.scrollTop === 0 && listRef.current.scrollHeight > listRef.current.clientHeight) ||
        listRef.current.scrollTop > 0;
      dispatch(setListScrollTop(isListScroll));
    }, 400);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentCard, filteredCards, handleKeyDown]);

  const situationClick = player => () => {
    // playbackMode !== 'pause' && dispatch(setPlaybackMode('pause'));
    dispatch(setCurrentCard({ ...player, manualClick: true }));
  };

  const scrollHandler = e => {
    clearTimeout(scrollTimeoutRef.current);

    scrollTimeoutRef.current = setTimeout(() => {
      const isListScroll = e.target.scrollTop + e.target.clientHeight < e.target.scrollHeight;
      dispatch(setListScrollTop(isListScroll));
    }, 100);
  };

	const wrapperClasses = classNames(cl.wrapper, {
		[cl.landscapeDisplayNone]: currentTab === 'videos'
	})
  const classes = classNames(cl.blueDiv, {
    [cl.wider]: activeCardList === 'cards',
    [cl.taller]: activeCardList !== 'cards'
  });

  const listClasses = classNames(cl.list, {
    [cl.listNoVideo]: !isVideo,
    [cl.mobilePlaysListHeight]: isVideo,
    [cl.mobilePlaysListHeightVideo]: isVideo && currentTab === 'videos'
  });
  return (
    <div className={wrapperClasses} onClick={useGameFocus('list')}>
      {isVideo && currentTab !== 'videos' && <MobileLandscapeTabs cl={cl} />}
      
      <ul className={listClasses} ref={listRef} onScroll={scrollHandler}>
        {filteredCards.map((card, i) => (
          <ContentSituationsListItem
            key={i}
            cardIndex={i}
            ref={ref}
            player={card}
            situationClick={situationClick}
            currentCard={currentCard}
            beforeAfterData={beforeAfterData}
          />
        ))}
      </ul>
      <div className={classes}></div>
      {/* {!isVideo && ( */}
      <ControlsWrapper ref={listRef} />
      {/* )} */}
      {/* <PlayerFilterField /> */}
    </div>
  );
};

export default forwardRef(ContentSituationsList);

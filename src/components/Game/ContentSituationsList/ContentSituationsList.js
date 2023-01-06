import React, { forwardRef, useEffect } from 'react';
import cl from './ContentSituationsList.module.scss';
import ContentSituationsListItem from '../ContentSituationsListItem/ContentSituationsListItem';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentCard } from 'redux/gameReducer';
import useArrowNavigate from 'hooks/useArrowNavigate';
import ContentControls from '../ContentControls/ContentControls';
import MobileLandscapeTabs from './MobileLandscapeTabs';
import PlayerFilterField from '../PlayerFilterField/PlayerFilterField';
import classNames from 'classnames';
import useGameFocus from 'hooks/useGameFocus';

const ContentSituationsList = ({ filteredCards, currentCard, beforeAfterData, isVideo, currentTab }, ref) => {
  // const playbackMode = useSelector(state => state.game.playbackMode);
  const activeCardList = useSelector(state => state.game.activeCardList);
  const dispatch = useDispatch();
  const handleKeyDown = useArrowNavigate(filteredCards, currentCard);

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
    <div className={cl.wrapper} onClick={useGameFocus('list')}>
      {isVideo && currentTab !== 'videos' && <MobileLandscapeTabs cl={cl} />}
      <ul className={listClasses}>
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
      <div className={cl.controlsWrapper}>
        <ContentControls noPlayPause />
      </div>
      {/* )} */}
      <PlayerFilterField />
    </div>
  );
};

export default forwardRef(ContentSituationsList);

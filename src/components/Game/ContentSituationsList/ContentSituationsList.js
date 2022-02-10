import React, { forwardRef, useEffect } from 'react';
import cl from './ContentSituationsList.module.scss';
import ContentSituationsListItem from '../ContentSituationsListItem/ContentSituationsListItem';
import { useDispatch, useSelector } from 'react-redux';
import { setPlaybackMode, setCurrentCard } from 'redux/gameReducer';
import useArrowNavigate from 'hooks/useArrowNavigate';
import ContentControls from '../ContentControls/ContentControls';

const ContentSituationsList = ({ filteredCards, currentCard, beforeAfterData, isVideo }, ref) => {
  const playbackMode = useSelector(state => state.game.playbackMode);
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
    playbackMode !== 'pause' && dispatch(setPlaybackMode('pause'));
    dispatch(setCurrentCard({ ...player, manualClick: true }));
  };

  const classes = [cl.blueDiv];
  classes.push(activeCardList === 'cards' ? cl.wider : cl.taller);

	const controlsStyles = {position: 'absolute', right: 15, bottom: 10}
  return (
    <div className={cl.wrapper}>
      <ul className={cl.list}>
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
      <div className={classes.join(' ')}></div>
			{!isVideo && <ContentControls style={controlsStyles} noPlayPause/>}
    </div>
  );
};

export default forwardRef(ContentSituationsList);

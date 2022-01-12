import React, { forwardRef, useEffect } from 'react';
import cl from './ContentSituationsList.module.scss';
import ContentSituationsListItem from '../ContentSituationsListItem/ContentSituationsListItem';
import { useDispatch, useSelector } from 'react-redux';
import { setPlaybackMode, setCurrentCard } from 'redux/gameReducer';
import useArrowNavigate from 'hooks/useArrowNavigate';

const ContentSituationsList = ({ cards, currentCard }, ref) => {
  const playbackMode = useSelector(state => state.game.playbackMode);
  const dispatch = useDispatch();
  const handleKeyDown = useArrowNavigate(cards, currentCard);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentCard, cards, handleKeyDown]);

  const situationClick = player => () => {
    playbackMode !== 'pause' && dispatch(setPlaybackMode('pause'));
    dispatch(setCurrentCard({ ...player, manualClick: true }));
  };

  return (
    <ul className={cl.list}>
      {cards.map((card, i) => (
        <ContentSituationsListItem
          key={i}
					cardIndex={i}
					cardsCount={cards.length}
          ref={ref}
          player={card}
          situationClick={situationClick}
          currentCard={currentCard}
        />
      ))}
    </ul>
  );
};

export default forwardRef(ContentSituationsList);

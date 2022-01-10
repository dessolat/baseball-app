import React, { forwardRef } from 'react';
import cl from './ContentSituationsList.module.scss';
import ContentSituationsListItem from '../ContentSituationsListItem/ContentSituationsListItem';
import { useDispatch, useSelector } from 'react-redux';
import { setPlaybackMode, setCurrentCard } from 'redux/gameReducer';

const ContentSituationsList = ({ cards, currentCard }, ref) => {
  const playbackMode = useSelector(state => state.game.playbackMode);
  const dispatch = useDispatch();

  const situationClick = player => () => {
    playbackMode !== 'pause' && dispatch(setPlaybackMode('pause'));
    dispatch(setCurrentCard({ ...player, manualClick: true }));
    // setCurrentCard({ ...player, row_number: number });
  };

  return (
    <ul className={cl.list}>
      {cards.map((card,i) => (
        <ContentSituationsListItem
          key={i}
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

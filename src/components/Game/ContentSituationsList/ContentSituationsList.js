import React, { forwardRef } from 'react';
import cl from './ContentSituationsList.module.scss';
import { v4 as uuidv4 } from 'uuid';
import ContentSituationsListItem from '../ContentSituationsListItem/ContentSituationsListItem';
import { useDispatch, useSelector } from 'react-redux';
import { setPlaybackMode, setCurrentCard } from 'redux/gameReducer';

const ContentSituationsList = ({ cards, currentCard }, ref) => {
  const playbackMode = useSelector(state => state.game.playbackMode);
  const dispatch = useDispatch();

  const situationClick = player => () => {
    playbackMode !== 'pause' && dispatch(setPlaybackMode('pause'));
    // setCurrentCard({ ...player, row_number: number });
    dispatch(setCurrentCard({ ...player, manualClick: true }));
  };

  return (
    <ul className={cl.list}>
      {cards.map((card, i) => (
        <ContentSituationsListItem
          key={uuidv4()}
          ref={ref}
          player={card}
          number={i}
          situationClick={situationClick}
          currentCard={currentCard}
        />
      ))}
    </ul>
  );
};

export default forwardRef(ContentSituationsList);

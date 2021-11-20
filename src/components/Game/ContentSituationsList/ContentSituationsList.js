import React, { forwardRef } from 'react';
import cl from './ContentSituationsList.module.scss';
import { v4 as uuidv4 } from 'uuid';
import ContentSituationsListItem from '../ContentSituationsListItem/ContentSituationsListItem';
import { useDispatch, useSelector } from 'react-redux';
import { setPlaybackMode } from 'redux/gameReducer';

const ContentSituationsList = ({ cards, currentCard, setCurrentCard }, ref) => {
  const playbackMode = useSelector(state => state.game.playbackMode);
  const dispatch = useDispatch();

  const situationClick = player => {
    playbackMode === 'play' && dispatch(setPlaybackMode('pause'));
    // if (currentCard.row_number === number) return;
    // setCurrentCard({ ...player, row_number: number });
    setCurrentCard({ ...player});
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

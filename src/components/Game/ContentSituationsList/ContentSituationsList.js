import React, { forwardRef } from 'react';
import cl from './ContentSituationsList.module.scss';
import ContentSituationsListItem from '../ContentSituationsListItem/ContentSituationsListItem';
import { useDispatch, useSelector } from 'react-redux';
import { setPlaybackMode } from 'redux/gameReducer';

const ContentSituationsList = ({ cards, currentCard, setCurrentCard }, ref) => {
	const playbackMode = useSelector(state => state.game.playbackMode)
	const dispatch = useDispatch()

  const situationClick = (player, number) => {
		playbackMode === 'play' && dispatch(setPlaybackMode('pause'))
    if (currentCard.row_number !== number) {
      setCurrentCard({ ...player, row_number: number });
      return;
    }
    setCurrentCard({});
  };

  return (
    <ul className={cl.list}>
      {cards.map((card, i) => (
        <ContentSituationsListItem
          key={card.inning_number + ' ' + card.who}
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

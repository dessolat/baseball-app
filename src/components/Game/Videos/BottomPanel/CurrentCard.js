import cl from '../Videos.module.scss';
import ContentCardReplacement from '../../ContentCardReplacement/ContentCardReplacement';
import ContentCardComplex from '../../ContentCardComplex/ContentCardComplex';
import ContentCardSimple from '../../ContentCardSimple/ContentCardSimple';
import TimelineEventChanger from 'components/UI/buttons/TimelineEventChanger/TimelineEventChanger';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { setCurrentCard } from 'redux/gameReducer';

const CurrentCard = ({ currentCard }) => {
  const filteredCards = useSelector(s => s.game.filteredCards, shallowEqual);

  const dispatch = useDispatch();

  const changeCardBtnClick = direction => () => {
    const cardIndex = filteredCards.findIndex(
      card => card.moments[0].inner.id === currentCard.moments[0].inner.id
    );

    if (direction === 'left') {
      if (cardIndex === 0) return;

      dispatch(setCurrentCard(filteredCards[cardIndex - 1]));
    }

    if (cardIndex >= filteredCards.length - 1) return;

    dispatch(setCurrentCard(filteredCards[cardIndex + 1]));
  };

  const situationsArr = [];
  currentCard.moments?.forEach(moment => moment.icons?.rect_text && situationsArr.push(moment));

  return (
    <div className={cl.currentCardWrapper}>
      <TimelineEventChanger handleClick={changeCardBtnClick} bgColor='#D9D9D9' />

      <div className={cl.currentCard}>
        {currentCard.type === 'Replacement' ? (
          <ContentCardReplacement events={currentCard.moments[0].events} />
        ) : situationsArr.length > 0 ? (
          <ContentCardComplex
            player={currentCard}
            situationsArr={situationsArr}
            noCardTitle
            noSigns
            innerRects
          />
        ) : (
          <ContentCardSimple player={currentCard} noCardTitle noSigns />
        )}
      </div>
			
      <TimelineEventChanger direction='right' handleClick={changeCardBtnClick} bgColor='#D9D9D9' />
    </div>
  );
};

export default CurrentCard;

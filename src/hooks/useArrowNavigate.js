import { useDispatch } from 'react-redux';
import { setActiveCardList, setCurrentCard } from 'redux/gameReducer';

const KEYS = ['ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight'];

const useArrowNavigate = (cards, currentCard) => {
  const dispatch = useDispatch();

  const handleKeyDown = e => {
    if (!KEYS.includes(e.key)) return;
    e.preventDefault();

    const cardIndex = cards.findIndex(card => card.moments[0].inner.id === currentCard.moments[0].inner.id);

    switch (e.key) {
      case 'ArrowUp':
        if (cardIndex === 0) break;
        if (e.shiftKey) {
          const prevCard = cards
            .slice(0, cardIndex)
            .reverse()
            .find(card => card.who_id === currentCard.who_id);
          if (prevCard === undefined) break;
          dispatch(setCurrentCard(prevCard));
          break;
        }
        dispatch(setCurrentCard(cards[cardIndex - 1]));
        break;
      case 'ArrowDown':
        if (cardIndex >= cards.length - 1) break;
        if (e.shiftKey) {
          const nextCard = cards.slice(cardIndex + 1).find(card => card.who_id === currentCard.who_id);
          if (nextCard === undefined) break;
          dispatch(setCurrentCard(nextCard));
          break;
        }
        dispatch(setCurrentCard(cards[cardIndex + 1]));
        break;
      case 'ArrowLeft':
				dispatch(setActiveCardList('cards'))
        break;
				case 'ArrowRight':
				dispatch(setActiveCardList('events'))
        break;
      default:
        break;
    }
  };
  return handleKeyDown;
};

export default useArrowNavigate;

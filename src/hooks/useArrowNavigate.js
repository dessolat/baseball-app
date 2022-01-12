import { useDispatch } from 'react-redux';
import { setCurrentCard } from 'redux/gameReducer';

const useArrowNavigate = (cards, currentCard) => {
  const dispatch = useDispatch();

  const handleKeyDown = e => {
    if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp' && e.key !== 'ArrowLeft' && e.key !== 'ArrowRight')
      return;
    e.preventDefault();

    const cardIndex = cards.findIndex(card => card.moments[0].inner.id === currentCard.moments[0].inner.id);

    switch (e.key) {
      case 'ArrowUp':
        if (cardIndex === 0) break;
        dispatch(setCurrentCard(cards[cardIndex - 1]));
        break;
      case 'ArrowDown':
        if (cardIndex >= cards.length - 1) break;
        dispatch(setCurrentCard(cards[cardIndex + 1]));
        break;
      case 'ArrowLeft':
        const prevCard = cards
          .slice(0, cardIndex)
          .reverse()
          .find(card => card.who_id === currentCard.who_id);
        if (prevCard === undefined) break;
        dispatch(setCurrentCard(prevCard));
        break;
      case 'ArrowRight':
        const nextCard = cards.slice(cardIndex + 1).find(card => card.who_id === currentCard.who_id);
        if (nextCard === undefined) break;
        dispatch(setCurrentCard(nextCard));
        break;
      default:
        break;
    }
  };
  return handleKeyDown;
};

export default useArrowNavigate;

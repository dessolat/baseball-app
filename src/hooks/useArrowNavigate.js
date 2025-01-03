import { useDispatch, useSelector } from 'react-redux';
import { setActiveCardList, setCurrentCard, setCurrentMoment } from 'redux/gameReducer';

const KEYS = ['ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight'];

const useArrowNavigate = (cards, currentCard) => {
  const activeCardList = useSelector(state => state.game.activeCardList);
  const currentMoment = useSelector(state => state.game.currentMoment);
  const focus = useSelector(state => state.game.focus);

  // const playbackMode = useSelector(state => state.game.playbackMode);
  const dispatch = useDispatch();

  const handleKeyDown = e => {
    if (!KEYS.includes(e.key)) return;
    e.preventDefault();

    // Set playback mode to pause
    // playbackMode !== 'pause' && dispatch(setPlaybackMode('pause'));

    const cardIndex = cards.findIndex(card => card.moments[0].inner.id === currentCard.moments[0].inner.id);
    const newMoments = [];
    currentCard.type !== 'Replacement'
      ? currentCard.moments?.forEach(moment => moment.icons && newMoments.push(moment))
      : newMoments.push(currentCard.moments[0]);
    const momentIndex = newMoments?.findIndex(moment => moment.inner?.id === currentMoment?.inner?.id);

    if (focus !== 'list') return;

    switch (e.key) {
      case 'ArrowUp':
        if (cardIndex === 0 && activeCardList !== 'events') break;
        if (e.shiftKey) {
          const prevCard = cards
            .slice(0, cardIndex)
            .reverse()
            .find(card => card.who_id === currentCard.who_id);
          if (prevCard === undefined) break;
          dispatch(setCurrentCard(prevCard));
          break;
        }
        if (activeCardList === 'events') {
          if (momentIndex === 0 && cardIndex === 0) break;
          if (momentIndex === 0 || (momentIndex === -1 && cardIndex !== 0)) {
            dispatch(setCurrentCard(cards[cardIndex - 1]));
            break;
          }
          dispatch(setCurrentMoment(currentCard.moments[momentIndex - 1]));
          break;
        }
        dispatch(setCurrentCard(cards[cardIndex - 1]));
        break;
      case 'ArrowDown':
        if (cardIndex >= cards.length - 1 && activeCardList !== 'events') break;
        if (e.shiftKey) {
          const nextCard = cards.slice(cardIndex + 1).find(card => card.who_id === currentCard.who_id);
          if (nextCard === undefined) break;
          dispatch(setCurrentCard(nextCard));
          break;
        }
        if (activeCardList === 'events') {
          if (
            (momentIndex >= currentCard.moments.length - 1 && cardIndex >= cards.length - 1) ||
            momentIndex === -1
          )
            break;
          if (momentIndex >= currentCard.moments.length - 1) {
            dispatch(setCurrentCard({ ...cards[cardIndex + 1], toFirstMoment: true }));
            // dispatch(setCurrentCard({ ...cards[cardIndex + 1], manualMoment: true }));
            break;
          }

          dispatch(setCurrentMoment(currentCard.moments[momentIndex + 1]));
          break;
        }
        dispatch(setCurrentCard(cards[cardIndex + 1]));
        break;
      case 'ArrowLeft':
        dispatch(setActiveCardList('cards'));
        break;
      case 'ArrowRight':
        dispatch(setActiveCardList('events'));
        break;
      default:
        break;
    }
  };
  return handleKeyDown;
};

export default useArrowNavigate;

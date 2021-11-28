import { useMemo } from 'react';
import { useSelector } from 'react-redux';

const useCurrentEvents = () => {
  const currentCard = useSelector(state => state.game.currentCard);
  return useMemo(() => {
    const newMoments = [];
    currentCard.type !== 'Replacement'
      ? currentCard.moments?.forEach(moment => moment.icons && newMoments.push(moment))
      : newMoments.push(currentCard.moments[0]);
    return newMoments;
  }, [currentCard]);
};

export default useCurrentEvents;

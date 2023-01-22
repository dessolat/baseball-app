import { useSelector, useDispatch } from 'react-redux';
import { setCurrentCard } from 'redux/gameReducer';

const useSetMomentById = () => {
  const filteredCards = useSelector(state => state.game.filteredCards);

  const dispatch = useDispatch();

  const setMomentById = id => {
    const tempCard = filteredCards.find(card => card.moments.some(moment => moment.inner.id === id));

    tempCard && dispatch(setCurrentCard({ ...tempCard, customMoment: id }));
  };

  return setMomentById;
};

export default useSetMomentById;

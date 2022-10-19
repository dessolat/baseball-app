import React from 'react';
import { useDispatch } from 'react-redux';
import { setCount, setIsEvents, setIsStars } from 'redux/threeReducer';

const Buttons = ({ cl, count, isStars, isEvents }) => {
  const dispatch = useDispatch();

  const handleStarsBtnClick = () => dispatch(setIsStars(!isStars));
  const handleAddBtnClick = () => count < 7 && dispatch(setCount(count + 1));
  const handleRemoveBtnClick = () => count > 0 && dispatch(setCount(count - 1));
  const handleEventsClick = () => dispatch(setIsEvents(!isEvents));
  return (
    <div className={cl.buttons}>
      <button onClick={handleStarsBtnClick}>{isStars ? 'Hide' : 'Show'} stars</button>
      <button onClick={handleAddBtnClick} disabled={count > 6}>Add planet</button>
      <button onClick={handleRemoveBtnClick} disabled={count < 1}>Remove planet</button>
      <button onClick={handleEventsClick} className={cl.eventsBtn}>
        {isEvents ? 'Disable' : 'Enable'} pointer events
      </button>
    </div>
  );
};

export default Buttons;

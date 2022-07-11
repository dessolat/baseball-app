import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import PlaysEvents from '../PlaysEvents/PlaysEvents';

const MobileHeaderEvents = ({ cl }) => {
  const [moments, setMoments] = useState([]);
  const currentCard = useSelector(state => state.game.currentCard);

  useEffect(() => {
    const newMoments = [];
    currentCard.type !== 'Replacement'
      ? currentCard.moments?.forEach(moment => moment.icons && newMoments.push(moment))
      : newMoments.push(currentCard.moments[0]);
    setMoments(newMoments);
    // eslint-disable-next-line
  }, [currentCard]);
	
  return (
    <div className={cl.mobileHeaderEvents}>
      <PlaysEvents moments={moments} />
    </div>
  );
};

export default MobileHeaderEvents;

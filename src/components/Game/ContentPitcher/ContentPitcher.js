import React from 'react';
import { useSelector } from 'react-redux';
import cl from './ContentPitcher.module.scss';

const ContentPitcher = () => {
	const currentCard = useSelector(state => state.game.currentCard)
	
  const pitcherName = currentCard.moments?.slice(-1)[0]?.pitcher.pitches_name;

  return <p className={cl.playerName}>Pitcher: {currentCard.moments && <span>{pitcherName}</span>}</p>;
};

export default ContentPitcher;

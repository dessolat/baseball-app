import React from 'react';
import cl from './ContentPitcher.module.scss';

const ContentPitcher = ({ currentCard }) => {
  const pitcherName = currentCard.moments?.slice(-1)[0]?.pitcher.pitches_name;

  return <p className={cl.playerName}>Pitcher: {currentCard.moments && <span>{pitcherName}</span>}</p>;
};

export default ContentPitcher;

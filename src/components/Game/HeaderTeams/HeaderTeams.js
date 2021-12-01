import React from 'react';
import { useSelector } from 'react-redux';
import cl from './HeaderTeams.module.scss';

const HeaderTeams = ({ names }) => {
  const currentCard = useSelector(state => state.game.currentCard);
  const getShortName = name => (name.length > 8 ? name.slice(0, 7) + '…' : name);
  const guestsClasses = [cl.guests];
  const ownersClasses = [cl.owners];
  currentCard.side === 'top' ? guestsClasses.push(cl.active) : ownersClasses.push(cl.active);

  return (
    <div className={cl.teamNames}>
      <span className={guestsClasses.join(' ')}>{getShortName(names[0])}</span>
      <span className={ownersClasses.join(' ')}>{getShortName(names[1])}</span>
    </div>
  );
};

export default HeaderTeams;

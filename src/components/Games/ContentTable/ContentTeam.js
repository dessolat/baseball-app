import React from 'react';
import cl from './ContentTable.module.scss';
import LeagueImage from 'images/league_image.png';
import { useSelector } from 'react-redux';

const ContentTeam = () => {
  const currentLeague = useSelector(state => state.games.currentLeague);

  return (
    <div className={cl.teamWrapper}>
      <img src={LeagueImage} alt='league-img' />
      <h2 className={cl.teamName}>{currentLeague.name}</h2>
    </div>
  );
};

export default ContentTeam;

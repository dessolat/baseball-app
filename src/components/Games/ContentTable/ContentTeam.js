import React from 'react';
import cl from './ContentTable.module.scss';
import LeagueImage from 'images/league_image.png';
import { useSelector } from 'react-redux';

const ContentTeam = () => {
  const currentLeague = useSelector(state => state.games.currentLeague);
  const leaguesImages = useSelector(state => state.games.leaguesImages);

  return (
    <div className={cl.teamWrapper}>
      <img
        src={
          leaguesImages[
            currentLeague.id === undefined ? currentLeague.name || currentLeague.title : currentLeague.id
          ] || LeagueImage
        }
        alt='league-img'
      />
      <h2 className={cl.teamName}>{currentLeague.name}</h2>
    </div>
  );
};

export default ContentTeam;

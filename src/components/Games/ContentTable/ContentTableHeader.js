import React from 'react';
import cl from './ContentTable.module.scss';
import LeagueImage from 'images/league_image.png';
import { useSelector } from 'react-redux';
import ContentCalendars from './ContentCalendars';

const ContentTableHeader = () => {
  const currentLeague = useSelector(state => state.games.currentLeague);

  return (
    <div className={cl.header}>
      <div className={cl.teamWrapper}>
        <img src={LeagueImage} alt='league-img' />
        <h2 className={cl.teamName}>{currentLeague.name}</h2>
      </div>
      <ContentCalendars />
    </div>
  );
};

export default ContentTableHeader;

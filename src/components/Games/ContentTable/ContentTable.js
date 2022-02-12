import React from 'react';
import { useSelector } from 'react-redux';
import ContentCalendar from '../ContentCalendar/ContentCalendar';
import cl from './ContentTable.module.scss';
import LeagueImage from 'images/league_image.png';

const ContentTable = () => {
  const currentLeague = useSelector(state => state.games.currentLeague);

  return (
    <div className={cl.wrapper}>
      <div className={cl.header}>
        <div className={cl.teamWrapper}>
          <img src={LeagueImage} />
          <h2 className={cl.teamName}>{currentLeague.name}</h2>
        </div>
        <ContentCalendar />
      </div>
    </div>
  );
};

export default ContentTable;

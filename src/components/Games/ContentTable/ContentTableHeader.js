import React from 'react';
import cl from './ContentTable.module.scss';
import ContentCalendar from '../ContentCalendar/ContentCalendar';
import LeagueImage from 'images/league_image.png';
import { useSelector } from 'react-redux';
import ContentGridCalendar from '../ContentGridCalendar/ContentGridCalendar';

const ContentTableHeader = () => {
  const currentLeague = useSelector(state => state.games.currentLeague);

  return (
    <div className={cl.header}>
      <div className={cl.teamWrapper}>
        <img src={LeagueImage} alt='league-img' />
        <h2 className={cl.teamName}>{currentLeague.name}</h2>
      </div>
      <div className={cl.calendarsWrapper}>
				<ContentGridCalendar />
        <ContentCalendar />
      </div>
    </div>
  );
};

export default ContentTableHeader;

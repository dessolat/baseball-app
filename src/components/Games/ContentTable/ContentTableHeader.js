import React from 'react';
import cl from './ContentTable.module.scss';
import ContentCalendar from '../ContentCalendar/ContentCalendar';
import LeagueImage from 'images/league_image.png';
import { useSelector, useDispatch } from 'react-redux';
import ContentGridCalendar from '../ContentGridCalendar/ContentGridCalendar';
import { setCurrentDate } from 'redux/gamesReducer';

const ContentTableHeader = () => {
  const currentLeague = useSelector(state => state.games.currentLeague);
	const dispatch = useDispatch()

	const calendarChangeHandler = value => dispatch(setCurrentDate(value))
  return (
    <div className={cl.header}>
      <div className={cl.teamWrapper}>
        <img src={LeagueImage} alt='league-img' />
        <h2 className={cl.teamName}>{currentLeague.name}</h2>
      </div>
      <div className={cl.calendarsWrapper}>
				<ContentGridCalendar onChange={calendarChangeHandler} />
        <ContentCalendar onChange={calendarChangeHandler}/>
      </div>
    </div>
  );
};

export default ContentTableHeader;

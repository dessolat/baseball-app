import React from 'react';
import cl from './ContentTable.module.scss';
import ContentGridCalendar from '../ContentGridCalendar/ContentGridCalendar';
import ContentCalendar from '../ContentCalendar/ContentCalendar';
import { setCurrentDate } from 'redux/gamesReducer';
import { useSelector, useDispatch } from 'react-redux';

const ContentCalendars = () => {
  const currentDate = useSelector(state => state.games.currentDate);
  const dispatch = useDispatch();

  const calendarChangeHandler = value => {
		let newDate = value
		newDate.setHours(0, newDate.getTimezoneOffset()*-1, 0, 0)
		
    dispatch(setCurrentDate(newDate));
  };
  return (
    <div className={cl.calendarsWrapper}>
      <ContentGridCalendar value={currentDate} onChange={calendarChangeHandler} />
      <ContentCalendar onChange={calendarChangeHandler} />
    </div>
  );
};

export default ContentCalendars;

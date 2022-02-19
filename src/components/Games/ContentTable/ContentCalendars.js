import React from 'react';
import cl from './ContentTable.module.scss';
import ContentGridCalendar from '../ContentGridCalendar/ContentGridCalendar';
import ContentCalendar from '../ContentCalendar/ContentCalendar';
import { setCurrentDate } from 'redux/gamesReducer';
import { useSelector, useDispatch } from 'react-redux';

const ContentCalendars = () => {
  const currentDate = useSelector(state => state.games.currentDate);
  const dispatch = useDispatch();

  const calendarChangeHandler = value => dispatch(setCurrentDate(value));
  return (
    <div className={cl.calendarsWrapper}>
      <ContentGridCalendar value={currentDate} onChange={calendarChangeHandler} />
      <ContentCalendar onChange={calendarChangeHandler} />
    </div>
  );
};

export default ContentCalendars;

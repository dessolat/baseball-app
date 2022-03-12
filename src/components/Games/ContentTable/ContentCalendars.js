import React, { useState } from 'react';
import cl from './ContentTable.module.scss';
import ContentGridCalendar from '../ContentGridCalendar/ContentGridCalendar';
import ContentCalendar from '../ContentCalendar/ContentCalendar';
import { setCurrentDate } from 'redux/sharedReducer';
import { useSelector, useDispatch } from 'react-redux';

const ContentCalendars = () => {
  const [calendarScroll, setCalendarScroll] = useState({ isScroll: false, amount: 0 });

  const currentDate = useSelector(state => state.shared.currentDate);
  const dispatch = useDispatch();

  const calendarChangeHandler = value => {
    let newDate = value;
    newDate.setHours(0, newDate.getTimezoneOffset() * -1, 0, 0);

    dispatch(setCurrentDate(newDate));
  };

  const gridCalendarChangeHandler = value => {
    let newDate = value;
    newDate.setHours(0, newDate.getTimezoneOffset() * -1, 0, 0);

    const daysDelta = (newDate - currentDate) / 1000 / 60 / 60 / 24;
    
    setCalendarScroll({ isScroll: true, amount: daysDelta < -3 ? -4 : daysDelta > 3 ? 4 : daysDelta });
    setTimeout(() => {
      dispatch(setCurrentDate(newDate));
      setCalendarScroll({ isScroll: false, amount: 0 });
    }, 250);
  };

  return (
    <div className={cl.calendarsWrapper}>
      <ContentGridCalendar value={currentDate} onChange={gridCalendarChangeHandler} />
      <ContentCalendar onChange={calendarChangeHandler} calendarScroll={calendarScroll} />
    </div>
  );
};

export default ContentCalendars;

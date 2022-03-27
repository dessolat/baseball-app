import Arrow from 'components/UI/buttons/Arrow/Arrow';
import React, { useEffect,useLayoutEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import cl from './ContentCalendar.module.scss';
import ContentCalendarList from './ContentCalendarList';

const ContentCalendar = ({ onChange, calendarScroll }) => {
  const ref = useRef();
  const timeoutRef = useRef(null);

  const currentDate = useSelector(state => state.shared.currentDate);
  const isMobile = useSelector(state => state.shared.isMobile);

  useLayoutEffect(() => {
    ref.current.style.transition = 'none';

    ref.current.style.transform = `translate(${isMobile ? 43 : 0}px)`;

    setTimeout(() => {
      ref.current.style.transition = 'all .25s';
      timeoutRef.current = null;
    }, 30);
  }, [currentDate]);

  useEffect(() => {
    if (!calendarScroll.isScroll) return;

    ref.current.style.transform = `translate(${
      (isMobile ? 43 : 0) - (isMobile ? 43 : 60.5) * calendarScroll.amount
    }px)`;
  }, [calendarScroll]);

  const handleDateClick = date => () => {
    if (timeoutRef.current !== null) return;
    const daysDelta = (date - currentDate) / 1000 / 60 / 60 / 24;
    ref.current.style.transform = `translate(${(isMobile ? 43 : 0) - (isMobile ? 43 : 60.5) * daysDelta}px)`;
    timeoutRef.current = setTimeout(() => {
      onChange(date);
    }, 350); //250
  };

  const handleArrowClick = dir => () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + (dir === 'right' ? 1 : -1));
    handleDateClick(newDate)();
  };
  return (
    <div className={cl.calendar}>
      <Arrow onClick={handleArrowClick('left')} style={{ marginRight: isMobile ? 0 : '.3rem' }} />
      <ContentCalendarList currentDate={currentDate} handleClick={handleDateClick} ref={ref} />
      <Arrow
        direction='right'
        onClick={handleArrowClick('right')}
        style={{ marginLeft: isMobile ? 0 : '.5rem' }}
      />
    </div>
  );
};

export default ContentCalendar;

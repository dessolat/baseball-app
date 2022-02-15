import Arrow from 'components/UI/buttons/Arrow/Arrow';
import React, { useState, useEffect, useRef } from 'react';
import cl from './ContentCalendar.module.scss';
import ContentCalendarList from './ContentCalendarList'

const ContentCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const ref = useRef();
  const timeoutRef = useRef(null);

  useEffect(() => {
    ref.current.style.transition = 'none';
    ref.current.style.transform = `translate(60.5px)`;
    setTimeout(() => {
      ref.current.style.transition = 'all .4s';
      timeoutRef.current = null;
    }, 100);
  }, [currentDate]);

  const handleDateClick = date => () => {
    if (timeoutRef.current !== null) return;
    const daysDelta = (date - currentDate) / 1000 / 60 / 60 / 24;
    ref.current.style.transform = `translate(${60.5 - 60.5 * daysDelta}px)`;
    timeoutRef.current = setTimeout(() => {
      setCurrentDate(date);
    }, 400);
  };

  const handleArrowClick = dir => () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + (dir === 'right' ? 1 : -1));
    handleDateClick(newDate)();
  };
  return (
    <div className={cl.calendar}>
      {/* <button onClick={handleArrowClick('left')}>Left</button> */}
			<Arrow onClick={handleArrowClick('left')} style={{marginRight: '.3rem'}}/>
      <ContentCalendarList currentDate={currentDate} handleClick={handleDateClick} ref={ref} />
			<Arrow direction='right' onClick={handleArrowClick('right')} style={{marginLeft: '.5rem'}}/>
      {/* <button onClick={handleArrowClick('right')}>Right</button> */}
    </div>
  );
};

export default ContentCalendar;

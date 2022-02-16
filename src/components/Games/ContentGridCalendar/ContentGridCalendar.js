import React, { useState } from 'react';
import CalendarImage from 'images/calendar.png';
import Calendar from 'react-calendar';
import './style.scss';

const ContentGridCalendar = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [date, setDate] = useState(new Date());

  const toggleCalendar = () => setIsVisible(!isVisible);

  const changeHandler = e => {
    setDate(e);
    toggleCalendar();
  };
  return (
    <div className='content-grid-calendar-wrapper'>
      <img src={CalendarImage} alt='calendar' onClick={toggleCalendar}/>
      {isVisible && <Calendar onChange={changeHandler} className='gamesCalendar' locale='EN-en' />}
    </div>
  );
};

export default ContentGridCalendar;

import React, { useState } from 'react';
import CalendarImage from 'images/calendar.png';
import Calendar from 'react-calendar';
import './style.scss';

const ContentGridCalendar = ({ onChange }) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleCalendar = () => setIsVisible(!isVisible);

  const changeHandler = value => {
    onChange(value)
    toggleCalendar();
  };
  return (
    <div className='content-grid-calendar-wrapper'>
      <img src={CalendarImage} alt='calendar' onClick={toggleCalendar} />
      {isVisible && <Calendar onChange={changeHandler} className='gamesCalendar' locale='EN-en' />}
    </div>
  );
};

export default ContentGridCalendar;

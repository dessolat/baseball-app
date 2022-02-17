import React, { useState, useEffect, useRef } from 'react';
import CalendarImage from 'images/calendar.png';
import Calendar from 'react-calendar';
import './style.scss';

function listenForOutsideClicks(listening, setListening, menuRef, setIsVisible) {
  return () => {
    if (listening) return;
    if (!menuRef.current) return;
    setListening(true);
    [`click`, `touchstart`].forEach(type => {
      document.addEventListener(type, evt => {
        if (menuRef.current?.contains(evt.target)) return;
				console.log(menuRef.current);
				console.log(evt.target);
				console.log('this');
        setIsVisible(false);
      });
    });
  };
}

const ContentGridCalendar = ({ value, onChange }) => {
  const [listening, setListening] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const menuRef = useRef(null);

  useEffect(listenForOutsideClicks(listening, setListening, menuRef, setIsVisible));

  const toggleCalendar = () => setIsVisible(!isVisible);

  const changeHandler = value => {
    onChange(value);
    toggleCalendar();
  };
  return (
    <div ref={menuRef} className='content-grid-calendar-wrapper'>
      <img src={CalendarImage} alt='calendar' onClick={toggleCalendar} />
      {isVisible && <Calendar minDetail='month' value={value} onChange={changeHandler} className='gamesCalendar' locale='EN-en' />}
    </div>
  );
};

export default ContentGridCalendar;

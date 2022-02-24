import React, { useState, useEffect, useRef, useMemo } from 'react';
import CalendarImage from 'images/calendar.png';
import Calendar from 'react-calendar';
import './style.scss';
import { useSelector } from 'react-redux';

function listenForOutsideClicks(listening, setListening, menuRef, setIsVisible) {
  return () => {
    if (listening) return;
    if (!menuRef.current) return;
    setListening(true);
    [`click`, `touchstart`].forEach(type => {
      document.addEventListener(type, evt => {
        if (menuRef.current?.contains(evt.target)) return;
        setIsVisible(false);
      });
    });
  };
}

const ContentGridCalendar = ({ value, onChange }) => {
  const [listening, setListening] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const menuRef = useRef(null);

  const games = useSelector(state => state.games.games);
  const currentLeague = useSelector(state => state.games.currentLeague);
  const currentGameType = useSelector(state => state.games.currentGameType);

  useEffect(listenForOutsideClicks(listening, setListening, menuRef, setIsVisible));

  const toggleCalendar = () => setIsVisible(!isVisible);

  const changeHandler = value => {
    onChange(value);
    toggleCalendar();
  };

  //Games filtering
  let filteredData = useMemo(
    () =>
      games.filter(game =>
        currentLeague.id !== -1 ? game.league_id === currentLeague.id : currentGameType === game.game_type
      ),
    [games, currentLeague, currentGameType]
  );

  //Games sorting
  filteredData = useMemo(() => filteredData.sort((a, b) => (a.date > b.date ? -1 : 1)), [filteredData]);

  console.log(filteredData);

  return (
    <div ref={menuRef} className='content-grid-calendar-wrapper'>
      <img src={CalendarImage} alt='calendar' onClick={toggleCalendar} />
      {isVisible && (
        <Calendar
          minDetail='month'
          value={value}
          onChange={changeHandler}
          className='gamesCalendar'
          locale='EN-en'
          showNeighboringMonth={false}
          tileDisabled={({ activeStartDate, date, view }) =>
            !filteredData.some(game => {
              let tileDate = date;
              tileDate.setHours(0, tileDate.getTimezoneOffset() * -1, 0, 0);

              return game.date === tileDate.toJSON().slice(0, 10);
            })
          }
        />
      )}
    </div>
  );
};

export default ContentGridCalendar;

import { useState, useEffect, useRef, useMemo } from 'react';
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
  const currentGameType = useSelector(state => state.shared.currentGameType);
  const currentStadium = useSelector(state => state.games.currentStadium);
  const currentHome = useSelector(state => state.games.currentHome);
  const currentGuests = useSelector(state => state.games.currentGuests);

  // eslint-disable-next-line
  useEffect(listenForOutsideClicks(listening, setListening, menuRef, setIsVisible));

  const toggleCalendar = () => setIsVisible(!isVisible);

  const changeHandler = value => {
    onChange(value);
    toggleCalendar();
  };

  //Games filtering
  let filteredData = useMemo(() => {
    const filteredGames = games.filter(
      game =>
        (currentStadium !== 'All' ? game.stadium_name === currentStadium : true) &&
        (currentLeague.id !== -1 ? game.league_id === currentLeague.id : currentGameType === game.game_type)
      // 	&&
      // (currentHome !== 'All' ? game.owners_name === currentHome : true) &&
      // (currentGuests !== 'All' ? game.guests_name === currentGuests : true)
    );

    if (currentHome !== 'All' && currentGuests !== 'All') {
      return filteredGames.filter(
        game =>
          (game.owners_name === currentHome || game.owners_name === currentGuests) &&
          (game.guests_name === currentHome || game.guests_name === currentGuests)
      );
    }

    if (currentHome !== 'All')
      return filteredGames.filter(
        game => game.owners_name === currentHome || game.guests_name === currentHome
      );

    if (currentGuests !== 'All')
      return filteredGames.filter(
        game => game.owners_name === currentGuests || game.guests_name === currentGuests
      );

    return filteredGames;
  }, [games, currentLeague, currentGameType, currentStadium, currentHome, currentGuests]);

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
          // minDate={new Date(2021, 1, 1)}
          // maxDate={new Date(2022, 9, 1)}
          showNeighboringMonth={false}
          tileClassName={({ _, date }) => {
            let tileDate = date;
            tileDate.setHours(0, tileDate.getTimezoneOffset() * -1, 0, 0);

            return filteredData.some(game => game.date === tileDate.toJSON().slice(0, 10))
              ? tileDate.getDay() === 0 || tileDate.getDay() === 6
                ? 'fontBold activeWeekend'
                : 'fontBold'
              : null;
          }}
          tileDisabled={({ _, date }) =>
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

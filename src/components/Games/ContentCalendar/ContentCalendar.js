import Arrow from 'components/UI/buttons/Arrow/Arrow';
import React, { useEffect, useLayoutEffect, useRef, useMemo } from 'react';
import { useSelector } from 'react-redux';
import cl from './ContentCalendar.module.scss';
import ContentCalendarList from './ContentCalendarList';

const ContentCalendar = ({ onChange, calendarScroll }) => {
  const ref = useRef();
  const timeoutRef = useRef(null);

  const currentDate = useSelector(state => state.shared.currentDate);
  const isMobile = useSelector(state => state.shared.isMobile);
  const games = useSelector(state => state.games.games);
  const currentLeague = useSelector(state => state.games.currentLeague);
  const currentGameType = useSelector(state => state.shared.currentGameType);
  const currentStadium = useSelector(state => state.games.currentStadium);
  const currentHome = useSelector(state => state.games.currentHome);
  const currentGuests = useSelector(state => state.games.currentGuests);

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

  let availableDates = useMemo(() => {
    const filteredGames = games.filter(
      game =>
        (currentStadium !== 'All' ? game.stadium_name === currentStadium : true) &&
        (currentLeague.id !== -1
          ? game.league_id === currentLeague.id
          : currentGameType === game.game_type) &&
        (currentHome !== 'All' ? game.owners_name === currentHome : true) &&
        (currentGuests !== 'All' ? game.guests_name === currentGuests : true)
    );

    const sortedDates = filteredGames
      .reduce((sum, game) => {
        sum.push(game.date);
        return sum;
      }, [])
      .sort((a, b) => (a > b ? 1 : -1));

		const uniqueSortedDates = Array.from(new Set(sortedDates))

    return uniqueSortedDates
  }, [games, currentLeague, currentGameType, currentStadium, currentHome, currentGuests]);

  return (
    <div className={cl.calendar}>
      <Arrow onClick={handleArrowClick('left')} style={{ marginRight: isMobile ? 0 : '.3rem' }} />
      <ContentCalendarList currentDate={currentDate} handleClick={handleDateClick} availableDates={availableDates} ref={ref} />
      <Arrow
        direction='right'
        onClick={handleArrowClick('right')}
        style={{ marginLeft: isMobile ? 0 : '.5rem' }}
      />
    </div>
  );
};

export default ContentCalendar;

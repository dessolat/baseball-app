import Arrow from 'components/UI/buttons/Arrow/Arrow';
import React, { useEffect, useLayoutEffect, useRef, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentDate } from 'redux/sharedReducer';
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
  const currentYear = useSelector(state => state.shared.currentYear);

  const dispatch = useDispatch();

  useLayoutEffect(() => {
    ref.current.style.transition = 'none';

    ref.current.style.transform = `translate(${isMobile ? 43 : 0}px)`;

    setTimeout(() => {
      if (ref.current) {
        ref.current.style.transition = 'all .25s';
        timeoutRef.current = null;
      }
    }, 30);
  }, [currentDate, isMobile]);

  useEffect(() => {
    if (!calendarScroll.isScroll) return;

    ref.current.style.transform = `translate(${
      (isMobile ? 43 : 0) - (isMobile ? 43 : 60.5) * calendarScroll.amount
    }px)`;
  }, [calendarScroll, isMobile]);

  useEffect(() => {
    let filteredGames = games.filter(
      game =>
        (currentStadium !== 'All' ? game.stadium_name === currentStadium : true) &&
        (currentLeague.id !== -1 ? game.league_id === currentLeague.id : currentGameType === game.game_type)
      // 	&&
      // (currentHome !== 'All' ? game.owners_name === currentHome : true) &&
      // (currentGuests !== 'All' ? game.guests_name === currentGuests : true)
    );

    if (currentHome !== 'All' && currentGuests !== 'All') {
      filteredGames = filteredGames.filter(
        game =>
          (game.owners_name === currentHome || game.owners_name === currentGuests) &&
          (game.guests_name === currentHome || game.guests_name === currentGuests)
      );
    } else {
      filteredGames =
        currentHome !== 'All'
          ? filteredGames.filter(game => game.owners_name === currentHome || game.guests_name === currentHome)
          : currentGuests !== 'All'
          ? filteredGames.filter(
              game => game.owners_name === currentGuests || game.guests_name === currentGuests
            )
          : filteredGames;
    }

    const sortedDates = filteredGames
      .reduce((sum, game) => {
        sum.push(game.date);
        return sum;
      }, [])
      .sort((a, b) => (a > b ? 1 : -1));

    const uniqueSortedDates = Array.from(new Set(sortedDates));

    const isDate = uniqueSortedDates.find(date => date === new Date().toJSON().slice(0, 10));

    let minDateDelta = Math.abs(new Date(uniqueSortedDates[0]) - new Date());
    let minDate = new Date();

    if (!isDate) {
      minDate = new Date(uniqueSortedDates[0] || new Date().toJSON().slice(0, 10));
      uniqueSortedDates.forEach(date => {
        const tempDelta = Math.abs(new Date(date) - new Date());
        if (tempDelta < minDateDelta) {
          minDate = new Date(date);
          minDateDelta = tempDelta;
        }
      });
    }

    !isDate ? dispatch(setCurrentDate(minDate)) : dispatch(setCurrentDate(new Date()));
		// eslint-disable-next-line
  }, [currentLeague, currentYear, games, currentHome, currentGuests, currentStadium]);

  let availableDates = useMemo(() => {
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

    return currentHome !== 'All'
      ? filteredGames.filter(game => game.owners_name === currentHome || game.guests_name === currentHome)
      : currentGuests !== 'All'
      ? filteredGames.filter(game => game.owners_name === currentGuests || game.guests_name === currentGuests)
      : filteredGames;
  }, [games, currentLeague, currentGameType, currentStadium, currentHome, currentGuests]);

  availableDates = availableDates
    .reduce((sum, game) => {
      sum.push(game.date);
      return sum;
    }, [])
    .sort((a, b) => (a > b ? 1 : -1));

  availableDates = Array.from(new Set(availableDates));

  const handleDateClick = date => () => {
    if (timeoutRef.current !== null) return;

    const currentDateIndex = availableDates.findIndex(
      availDate => availDate === currentDate.toJSON().slice(0, 10)
    );
    const targetDateIndex = availableDates.findIndex(availDate => availDate === date.toJSON().slice(0, 10));

    const daysDelta = targetDateIndex - currentDateIndex;
    // const daysDelta = (date - currentDate) / 1000 / 60 / 60 / 24;
    ref.current.style.transform = `translate(${(isMobile ? 43 : 0) - (isMobile ? 43 : 60.5) * daysDelta}px)`;
    timeoutRef.current = setTimeout(() => {
      onChange(date);
    }, 350); //250
  };

  const handleArrowClick = dir => () => {
    const currentDateIndex = availableDates.findIndex(
      availDate => availDate === currentDate.toJSON().slice(0, 10)
    );
    const targetDate = availableDates[currentDateIndex + (dir === 'right' ? 1 : -1)];

    // const newDate = new Date(currentDate);
    // newDate.setDate(newDate.getDate() + (dir === 'right' ? 1 : -1));
    targetDate && handleDateClick(new Date(targetDate))();
  };

  //Arrow classes handling
  const leftArrowClasses = [cl.arrow];
  const rightArrowClasses = [cl.arrow];
  (availableDates.length === 0 || availableDates[0] === currentDate.toJSON().slice(0, 10)) &&
    leftArrowClasses.push(cl.hidden);
  (availableDates.length === 0 || availableDates.slice(-1)[0] === currentDate.toJSON().slice(0, 10)) &&
    rightArrowClasses.push(cl.hidden);
  return (
    <div className={cl.calendar}>
      <Arrow
        onClick={handleArrowClick('left')}
        style={{ marginRight: isMobile ? 0 : '.3rem' }}
        className={leftArrowClasses.join(' ')}
      />
      <ContentCalendarList
        currentDate={currentDate}
        handleClick={handleDateClick}
        availableDates={availableDates}
        ref={ref}
      />
      <Arrow
        direction='right'
        onClick={handleArrowClick('right')}
        style={{ marginLeft: isMobile ? 0 : '.5rem' }}
        className={rightArrowClasses.join(' ')}
      />
    </div>
  );
};

export default ContentCalendar;

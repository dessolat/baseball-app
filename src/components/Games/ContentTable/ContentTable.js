import classNames from 'classnames';
import Dropdown from 'components/UI/dropdown/GamesDropdown/Dropdown';
import React, { useEffect, useMemo, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentStadium } from 'redux/gamesReducer';
import cl from './ContentTable.module.scss';
import ContentTableHeader from './ContentTableHeader';
import ContentTableList from './ContentTableList';

const ContentTable = ({ games }) => {
  const currentStadium = useSelector(state => state.games.currentStadium);
  const currentLeague = useSelector(state => state.games.currentLeague);
  const currentHome = useSelector(state => state.games.currentHome);
  const currentGuests = useSelector(state => state.games.currentGuests);
  const currentGameType = useSelector(state => state.shared.currentGameType);
  const currentDate = useSelector(state => state.shared.currentDate);
  const isMobile = useSelector(state => state.shared.isMobile);
  const mobileTableMode = useSelector(state => state.games.mobileTableMode);
  const dispatch = useDispatch();

  const scrollItemRef = useRef(null);

  useEffect(() => {
    if (scrollItemRef.current === null) return;

    setTimeout(() => {
      scrollItemRef.current.parentNode.scrollTop = scrollItemRef.current.offsetTop;
    }, 100);
  }, [currentDate, currentLeague]);

  const handleStadiumDropdownClick = option => dispatch(setCurrentStadium(option));

  const filteredHeadings = games.filter(game => {
    return currentLeague.id === -1 ? currentGameType === game.game_type : game.league_id === currentLeague.id;
  });

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

    return currentHome !== 'All'
      ? filteredGames.filter(game => game.owners_name === currentHome || game.guests_name === currentHome)
      : currentGuests !== 'All'
      ? filteredGames.filter(game => game.owners_name === currentGuests || game.guests_name === currentGuests)
      : filteredGames;
  }, [games, currentStadium, currentLeague, currentGameType, currentHome, currentGuests]);

  //Games sorting
  filteredData = useMemo(
    () =>
      filteredData
        .sort((a, b) => (a.date > b.date ? 1 : -1))
        .sort((a, b) => (a.date === b.date && a.start_time < b.start_time ? -1 : 1)),
    [filteredData]
  );

  //stadiumOptions calculation
  const stadiumOptions = useMemo(
    () =>
      Array.from(
        new Set(
          filteredHeadings.reduce(
            (sum, cur) => {
              sum.push(cur.stadium_name);
              return sum;
            },
            ['All']
          )
        )
      ),
    [filteredHeadings]
  );

  const headerClasses = classNames(cl.tableHeader, {
    [cl.paddingRightOne]: currentLeague.id !== -1
  });

  return (
    <div className={cl.wrapper}>
      <ContentTableHeader games={games} />

      {(!isMobile || mobileTableMode === 'Calendar') && JSON.stringify(currentDate) !== null && (
        <div className={cl.table}>
          <div className={headerClasses}>
            <div>Time</div>
            <div>
              <Dropdown
                title={'Stadium'}
                options={stadiumOptions}
                currentOption={currentStadium}
                handleClick={handleStadiumDropdownClick}
                listStyles={{ left: '-1rem', width: 'calc(100% + 1rem)' }}
              />
            </div>
            <div>Home</div>
            <div> </div>
            <div>Guests</div>
            <div> </div>
            <div>Inn</div>
            {currentLeague.id === -1 && <div>League</div>}
          </div>
          <ContentTableList cl={cl} filteredData={filteredData} ref={scrollItemRef} />
        </div>
      )}
    </div>
  );
};

export default ContentTable;

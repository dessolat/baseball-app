import React, { forwardRef, useEffect, useRef } from 'react';
import cl from './HeaderLeagues.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import HeaderLeaguesListItem from './HeaderLeaguesListItem';
import { setMobileTableMode, setCurrentLeague } from 'redux/gamesReducer';
import { setSearchParam } from 'utils';

const HeaderLeaguesList = ({ leagues }, ref) => {
  const currentLeague = useSelector(state => state.games.currentLeague);
  const dispatch = useDispatch();

  const firstMountRef = useRef(true);

  useEffect(() => {
    if (firstMountRef.current === true) {
      firstMountRef.current = false;
      return;
    }

    setSearchParam('league_id', currentLeague.id);
    if (currentLeague.id === -1) {
      setSearchParam('mode', 'Calendar');
			dispatch(setMobileTableMode('Calendar'));
    }
		// eslint-disable-next-line
  }, [currentLeague]);

  const handleLeagueClick = league => () => {
    league.id === -1 && dispatch(setMobileTableMode('Calendar'));
    dispatch(setCurrentLeague(league));
    // setSearchParam('league_id', league.id)
  };

  return (
    <ul className={cl.leagues} ref={ref}>
      {leagues.map(league => (
        <HeaderLeaguesListItem
          key={league.id}
          league={league}
          handleClick={handleLeagueClick}
          currentLeague={currentLeague}
        />
      ))}
    </ul>
  );
};

export default forwardRef(HeaderLeaguesList);

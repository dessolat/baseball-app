import React, { useState, useEffect, useLayoutEffect, useRef, useMemo, useContext } from 'react';
import cl from './HeaderLeagues.module.scss';
import Arrow from 'components/UI/buttons/Arrow/Arrow';
import HeaderLeaguesList from './HeaderLeaguesList';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentLeaguesScroll } from 'redux/sharedReducer';
import { setCurrentLeague } from 'redux/gamesReducer';
import { useParams } from 'react-router-dom';
import { PlayerYearsContext } from 'context';

const HeaderLeagues = () => {
  const { playerYears, calculateTeamsArray } = useContext(PlayerYearsContext);

  const [isLeftScroll, setIsLeftScroll] = useState(false);
  const [isRightScroll, setIsRightScroll] = useState(true);

  const { playerName, playerSurname } = useParams();

  const leaguesRef = useRef();
  const firstMountRef = useRef(true);

  const { playerStatsData, playerCurrentTeam } = useSelector(state => state.playerStats);
  const { currentLeaguesScroll: currentScroll, isMobile } = useSelector(state => state.shared);
  const dispatch = useDispatch();

  const setScrollArrows = () => {
    setIsLeftScroll(currentScroll <= 0 ? false : true);
    setIsRightScroll(currentScroll + leaguesRef.current.clientWidth < leaguesRef.current.scrollWidth);
  };

  useLayoutEffect(() => {
    leaguesRef.current.style.scrollBehavior = 'unset';
    leaguesRef.current.scrollLeft = currentScroll;
    leaguesRef.current.style.scrollBehavior = 'smooth';

    const filteredLeagues = playerStatsData.leagues.filter(league => league.year === playerYears);
    filteredLeagues.length !== 1
      ? dispatch(setCurrentLeague({ id: -1, name: 'All' }))
      : dispatch(setCurrentLeague(filteredLeagues[0]));
    // eslint-disable-next-line
  }, []);

  useLayoutEffect(() => {
    setIsLeftScroll(currentScroll <= 0 ? false : true);
    setIsRightScroll(currentScroll + leaguesRef.current.clientWidth < leaguesRef.current.scrollWidth);
  }, [currentScroll]);

  useEffect(() => {
    if (firstMountRef.current === true) {
      return;
    }

    leaguesRef.current.scrollLeft = 0;
    dispatch(setCurrentLeaguesScroll(0));
    setScrollArrows();

    //Set currentLeague to first if leagues count === 1, else set to All
    const filteredLeagues = playerStatsData.leagues.filter(league => league.year === playerYears);
    filteredLeagues.length !== 1
      ? dispatch(setCurrentLeague({ id: -1, name: 'All' }))
      : dispatch(setCurrentLeague(filteredLeagues[0]));
    // eslint-disable-next-line
  }, [playerYears]);

  useEffect(() => {
    if (firstMountRef.current === true) {
      firstMountRef.current = false;
      return;
    }

    setIsLeftScroll(currentScroll <= 0 ? false : true);
    setIsRightScroll(currentScroll + leaguesRef.current.clientWidth < leaguesRef.current.scrollWidth);
    // eslint-disable-next-line
  }, [playerStatsData.leagues]);

  const scrollLeagues = e => {
    if (e.currentTarget.name === 'scroll-left') {
      const scrollValue = leaguesRef.current.scrollLeft - 249;
      leaguesRef.current.scrollLeft -= 249;
      dispatch(setCurrentLeaguesScroll(scrollValue));
      return;
    }
    const scrollValue = leaguesRef.current.scrollLeft + 249;
    leaguesRef.current.scrollLeft += 249;
    dispatch(setCurrentLeaguesScroll(scrollValue));
  };

  const filteredLeagues = useMemo(() => {
    const newLeagues =
      playerYears === 'All years'
        ? playerStatsData.leagues.slice()
        : playerStatsData.leagues.filter(league => league.year === playerYears);
    newLeagues.unshift({ id: -1, title: 'All' });

    return newLeagues;
    // eslint-disable-next-line
  }, [playerName, playerSurname, playerYears, playerCurrentTeam]);

  return (
    <div className={cl.leaguesWrapper}>
      <Arrow
        onClick={scrollLeagues}
        style={!isLeftScroll ? (!isMobile ? { visibility: 'hidden' } : { pointerEvents: 'none' }) : null}
        fillColor={!isLeftScroll && isMobile ? '#E5E5E5' : '#D1D1D1'}
      />
      <HeaderLeaguesList
        leagues={filteredLeagues}
        ref={leaguesRef}
        playerYears={playerYears}
        calculateTeamsArray={calculateTeamsArray}
      />
      <Arrow
        direction='right'
        onClick={scrollLeagues}
        style={!isRightScroll ? (!isMobile ? { visibility: 'hidden' } : { pointerEvents: 'none' }) : null}
        fillColor={!isRightScroll && isMobile ? '#E5E5E5' : '#D1D1D1'}
      />
    </div>
  );
};

export default HeaderLeagues;

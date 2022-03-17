import React, { useState, useEffect, useLayoutEffect, useRef, useMemo } from 'react';
import cl from './HeaderLeagues.module.scss';
import Arrow from 'components/UI/buttons/Arrow/Arrow';
import HeaderLeaguesList from './HeaderLeaguesList';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentLeague, setCurrentLeaguesScroll } from 'redux/sharedReducer';
import { useParams } from 'react-router-dom';

const HeaderLeagues = ({ playerYears }) => {
  const [isLeftScroll, setIsLeftScroll] = useState(false);
  const [isRightScroll, setIsRightScroll] = useState(true);

  const { playerName, playerSurname } = useParams();

  const leaguesRef = useRef();
  const firstMountRef = useRef(true);

  const playerStatsData = useSelector(state => state.playerStats.playerStatsData);
  // const leagues = useSelector(state => state.games.leagues);
  // const games = useSelector(state => state.games.games);
  const currentScroll = useSelector(state => state.shared.currentLeaguesScroll);
  const currentYear = useSelector(state => state.shared.currentYear);
  const dispatch = useDispatch();

  const setScrollArrows = () => {
    setIsLeftScroll(currentScroll <= 0 ? false : true);
    setIsRightScroll(currentScroll + leaguesRef.current.clientWidth < leaguesRef.current.scrollWidth);
  };

  useLayoutEffect(() => {
    leaguesRef.current.style.scrollBehavior = 'unset';
    leaguesRef.current.scrollLeft = currentScroll;
    leaguesRef.current.style.scrollBehavior = 'smooth';
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
    dispatch(setCurrentLeague({ id: -1, name: 'All' }));
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
        : playerStatsData.leagues.filter(league => league.year == playerYears);
    newLeagues.unshift({ id: -1, title: 'All' });

    return newLeagues;
    // eslint-disable-next-line
  }, [playerName, playerSurname, playerYears]);

  return (
    <div className={cl.leaguesWrapper}>
      <Arrow onClick={scrollLeagues} style={!isLeftScroll ? { visibility: 'hidden' } : null} />
      <HeaderLeaguesList leagues={filteredLeagues} ref={leaguesRef} playerYears={playerYears} />
      <Arrow
        direction='right'
        onClick={scrollLeagues}
        style={!isRightScroll ? { visibility: 'hidden' } : null}
      />
    </div>
  );
};

export default HeaderLeagues;

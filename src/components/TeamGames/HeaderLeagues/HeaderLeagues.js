import React, { useState, useEffect, useLayoutEffect, useRef, useMemo } from 'react';
import cl from './HeaderLeagues.module.scss';
import Arrow from 'components/UI/buttons/Arrow/Arrow';
import HeaderLeaguesList from './HeaderLeaguesList';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentLeaguesScroll } from 'redux/sharedReducer';
import { useParams } from 'react-router-dom';

const HeaderLeagues = () => {
  const [isLeftScroll, setIsLeftScroll] = useState(false);
  const [isRightScroll, setIsRightScroll] = useState(true);

  const { teamName } = useParams();

  const leaguesRef = useRef();
  const firstMountRef = useRef(true);

  // const leagues = useSelector(state => state.games.leagues);
  // const games = useSelector(state => state.games.games);
  const currentScroll = useSelector(state => state.shared.currentLeaguesScroll);
  const currentYear = useSelector(state => state.shared.currentYear);
  const teamData = useSelector(state => state.teamGames.teamData);
  const dispatch = useDispatch();

	const setScrollArrows = () => {
    setIsLeftScroll(currentScroll <= 0 ? false : true);
    setIsRightScroll(currentScroll + leaguesRef.current.clientWidth < leaguesRef.current.scrollWidth);
  };

  useLayoutEffect(() => {
    leaguesRef.current.style.scrollBehavior = 'unset';
    leaguesRef.current.scrollLeft = currentScroll;
    leaguesRef.current.style.scrollBehavior = 'smooth';

    setIsLeftScroll(leaguesRef.current.scrollLeft <= 0 ? false : true);
    setIsRightScroll(
      leaguesRef.current.scrollLeft + leaguesRef.current.clientWidth < leaguesRef.current.scrollWidth
    );
    dispatch(setCurrentLeaguesScroll(leaguesRef.current.scrollLeft));
    // eslint-disable-next-line
  }, []);

  useLayoutEffect(() => {
    if (firstMountRef.current === true) {
      return;
    }

    setIsLeftScroll(currentScroll <= 0 ? false : true);
    setIsRightScroll(currentScroll + leaguesRef.current.clientWidth < leaguesRef.current.scrollWidth);
  }, [currentScroll]);

  useEffect(() => {
    if (firstMountRef.current === true) {
      return;
    }

    leaguesRef.current.scrollLeft = 0;
    dispatch(setCurrentLeaguesScroll(0));
		setScrollArrows()
    // eslint-disable-next-line
  }, [currentYear]);

  useEffect(() => {
    if (firstMountRef.current === true) {
      firstMountRef.current = false;
      return;
    }

    setIsLeftScroll(currentScroll <= 0 ? false : true);
    setIsRightScroll(currentScroll + leaguesRef.current.clientWidth < leaguesRef.current.scrollWidth);
    // eslint-disable-next-line
  }, [teamData]);

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

  const leaguesArr = useMemo(() => {
    const newLeagues = [];
    teamData
      .filter(curLeague => curLeague.league.year === currentYear)
      .forEach(curLeague => newLeagues.push(curLeague.league));
    newLeagues.unshift({ id: -1, title: 'All' });
    return newLeagues;
		// eslint-disable-next-line
  }, [teamName, teamData, currentYear]);

  return (
    <div className={cl.leaguesWrapper}>
      <Arrow onClick={scrollLeagues} style={!isLeftScroll ? { visibility: 'hidden' } : null} />
      <HeaderLeaguesList leagues={leaguesArr} ref={leaguesRef} />
      <Arrow
        direction='right'
        onClick={scrollLeagues}
        style={!isRightScroll ? { visibility: 'hidden' } : null}
      />
    </div>
  );
};

export default HeaderLeagues;

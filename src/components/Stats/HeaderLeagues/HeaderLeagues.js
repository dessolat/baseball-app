import React, { useState, useEffect, useRef, useMemo } from 'react';
import cl from './HeaderLeagues.module.scss';
import Arrow from 'components/UI/buttons/Arrow/Arrow';
import HeaderLeaguesList from './HeaderLeaguesList';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentLeaguesScroll } from 'redux/sharedReducer';
import { setCurrentLeague } from 'redux/gamesReducer';

const HeaderLeagues = () => {
  const [isLeftScroll, setIsLeftScroll] = useState(false);
  const [isRightScroll, setIsRightScroll] = useState(true);

  const leaguesRef = useRef();
  const firstMountRef = useRef(true);

  const currentYear = useSelector(state => state.shared.currentYear);
  const currentGameType = useSelector(state => state.shared.currentGameType);
  const isMobile = useSelector(state => state.shared.isMobile);
  const statsData = useSelector(state => state.stats.statsData);
  const dispatch = useDispatch();

  useEffect(() => {
    const leaguesScrollDispatch = () => {
      dispatch(setCurrentLeaguesScroll(leaguesRef.current.scrollLeft));
      setIsLeftScroll(leaguesRef.current.scrollLeft <= 0 ? false : true);
      setIsRightScroll(
        leaguesRef.current.scrollLeft + leaguesRef.current.clientWidth < leaguesRef.current.scrollWidth
      );
    };

    const ref = leaguesRef.current;
    ref.addEventListener('scroll', leaguesScrollDispatch);

    setIsLeftScroll(leaguesRef.current.scrollLeft <= 0 ? false : true);
    setIsRightScroll(
      leaguesRef.current.scrollLeft + leaguesRef.current.clientWidth < leaguesRef.current.scrollWidth
    );

    return () => {
      ref.removeEventListener('scroll', leaguesScrollDispatch);
    };
		// eslint-disable-next-line
  }, []);

  // useLayoutEffect(() => {
  //   leaguesRef.current.style.scrollBehavior = 'unset';
  //   leaguesRef.current.scrollLeft = currentScroll;
  //   leaguesRef.current.style.scrollBehavior = 'smooth';
  //   // eslint-disable-next-line
  // }, []);

  // useLayoutEffect(() => {
  //   setIsLeftScroll(currentScroll <= 0 ? false : true);
  //   setIsRightScroll(currentScroll + leaguesRef.current.clientWidth < leaguesRef.current.scrollWidth);
  // }, [currentScroll]);

  useEffect(() => {
    if (firstMountRef.current === true) {
      return;
    }

    leaguesRef.current.style.scrollBehavior = 'unset';
    leaguesRef.current.scrollLeft = 0;
    leaguesRef.current.style.scrollBehavior = 'smooth';

    dispatch(setCurrentLeaguesScroll(0));

    // eslint-disable-next-line
  }, [currentYear]);
  useEffect(() => {
    if (firstMountRef.current === true) {
      return;
    }

    leaguesRef.current.style.scrollBehavior = 'unset';
    leaguesRef.current.scrollLeft = 0;
    leaguesRef.current.style.scrollBehavior = 'smooth';

    setIsLeftScroll(leaguesRef.current.scrollLeft <= 0 ? false : true);
    setIsRightScroll(
      leaguesRef.current.scrollLeft + leaguesRef.current.clientWidth < leaguesRef.current.scrollWidth
    );

    dispatch(setCurrentLeaguesScroll(0));
    dispatch(setCurrentLeague({ id: -1, name: 'All' }));
    // eslint-disable-next-line
  }, [currentGameType]);

  useEffect(() => {
    if (firstMountRef.current === true) {
      firstMountRef.current = false;
      return;
    }

    // setIsLeftScroll(currentScroll <= 0 ? false : true);
    // setIsRightScroll(currentScroll + leaguesRef.current.clientWidth < leaguesRef.current.scrollWidth);
    setIsLeftScroll(leaguesRef.current.scrollLeft <= 0 ? false : true);
    setIsRightScroll(
      leaguesRef.current.scrollLeft + leaguesRef.current.clientWidth < leaguesRef.current.scrollWidth
    );
    // eslint-disable-next-line
  }, [statsData]);

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
    const newLeagues = statsData.slice();
    newLeagues.unshift({ id: -1, title: 'All' });
    return newLeagues;
    // eslint-disable-next-line
  }, [statsData]);
  // const filteredLeagues = useMemo(() => {
  //   const newLeagues = leagues.filter(league => games.some(game => game.league_id === league.id));
  //   newLeagues.unshift({ id: -1, name: 'All' });
  //   return newLeagues;
  // 	// eslint-disable-next-line
  // }, [leagues, games, statsType]);

  return (
    <div className={cl.leaguesWrapper}>
      <Arrow
        onClick={scrollLeagues}
        style={!isLeftScroll ? (!isMobile ? { visibility: 'hidden' } : { pointerEvents: 'none' }) : null}
        fillColor={!isLeftScroll && isMobile ? '#E5E5E5' : '#D1D1D1'}
      />
      <HeaderLeaguesList leagues={leaguesArr} ref={leaguesRef} />
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

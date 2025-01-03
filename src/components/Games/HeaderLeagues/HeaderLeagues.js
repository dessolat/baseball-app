import React, { useState, useEffect, useLayoutEffect, useRef, useMemo } from 'react';
import cl from './HeaderLeagues.module.scss';
import Arrow from 'components/UI/buttons/Arrow/Arrow';
import HeaderLeaguesList from './HeaderLeaguesList';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentLeaguesScroll } from 'redux/sharedReducer';

const HeaderLeagues = () => {
  const [isLeftScroll, setIsLeftScroll] = useState(false);
  const [isRightScroll, setIsRightScroll] = useState(true);

  const leaguesRef = useRef();
  const firstMountRef = useRef(true);

  const { games, leagues } = useSelector(state => state.games);
  const { currentGameType, currentYear, isMobile } = useSelector(state => state.shared);

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

  useLayoutEffect(() => {
    // leaguesRef.current.style.scrollBehavior = 'unset';
    // leaguesRef.current.scrollLeft = currentScroll;
    // leaguesRef.current.style.scrollBehavior = 'smooth';
    // eslint-disable-next-line
  }, []);

  // useEffect(() => {
  //   setIsLeftScroll(currentScroll <= 0 ? false : true);
  //   setIsRightScroll(currentScroll + leaguesRef.current.clientWidth < leaguesRef.current.scrollWidth);
  // }, [currentScroll]);

  useEffect(() => {
    if (firstMountRef.current === true) {
      return;
    }

    leaguesRef.current.scrollLeft = 0;
    dispatch(setCurrentLeaguesScroll(0));
    // eslint-disable-next-line
  }, [currentGameType, currentYear]);

  useEffect(() => {
    if (firstMountRef.current === true) {
      firstMountRef.current = false;
      return;
    }

    setIsLeftScroll(leaguesRef.current.scrollLeft <= 0 ? false : true);
    setIsRightScroll(
      leaguesRef.current.scrollLeft + leaguesRef.current.clientWidth < leaguesRef.current.scrollWidth
    );
    // setIsLeftScroll(currentScroll <= 0 ? false : true);
    // setIsRightScroll(currentScroll + leaguesRef.current.clientWidth < leaguesRef.current.scrollWidth);
    // eslint-disable-next-line
  }, [leagues, currentGameType]);

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
    const newLeagues = leagues.filter(
      league => league.game_type === currentGameType && games.some(game => game.league_id === league.id)
    );
    newLeagues.unshift({ id: -1, name: 'All' });
    return newLeagues;
    // eslint-disable-next-line
  }, [leagues, currentGameType]);

  return (
    <div className={cl.leaguesWrapper}>
      <Arrow
        onClick={scrollLeagues}
        style={!isLeftScroll ? (!isMobile ? { visibility: 'hidden' } : { pointerEvents: 'none' }) : null}
        fillColor={!isLeftScroll && isMobile ? '#E5E5E5' : '#D1D1D1'}
      />
      <HeaderLeaguesList leagues={filteredLeagues} ref={leaguesRef} />
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

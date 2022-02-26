import React, { useState, useEffect, useRef, useMemo } from 'react';
import cl from './HeaderLeagues.module.scss';
import Arrow from 'components/UI/buttons/Arrow/Arrow';
import HeaderLeaguesList from './HeaderLeaguesList';
import { useSelector } from 'react-redux';

const HeaderLeagues = () => {
  const [currentScroll, setCurrentScroll] = useState(0);
  const [isLeftScroll, setIsLeftScroll] = useState(false);
  const [isRightScroll, setIsRightScroll] = useState(true);

  const leaguesRef = useRef();

  const currentGameType = useSelector(state => state.games.currentGameType);
  const leagues = useSelector(state => state.games.leagues);

  useEffect(() => {
    setIsLeftScroll(currentScroll <= 0 ? false : true);
    setIsRightScroll(currentScroll + leaguesRef.current.clientWidth < leaguesRef.current.scrollWidth);
  }, [currentScroll]);

  useEffect(() => {
    leaguesRef.current.scrollLeft = 0;

    setIsLeftScroll(false);
    setIsRightScroll(leaguesRef.current.clientWidth < leaguesRef.current.scrollWidth);
  }, [currentGameType, leagues]);

  const scrollLeagues = e => {
    if (e.currentTarget.name === 'scroll-left') {
      const scrollValue = leaguesRef.current.scrollLeft - 249;
      leaguesRef.current.scrollLeft -= 249;
      setCurrentScroll(scrollValue);
      return;
    }
    const scrollValue = leaguesRef.current.scrollLeft + 249;
    leaguesRef.current.scrollLeft += 249;
    setCurrentScroll(scrollValue);
  };

  const filteredLeagues = useMemo(() => {
    const newLeagues = leagues.filter(league => league.game_type === currentGameType);
    newLeagues.unshift({ id: -1, name: 'All' });
    return newLeagues;
  }, [leagues, currentGameType]);

  return (
    <div className={cl.leaguesWrapper}>
      <Arrow onClick={scrollLeagues} style={!isLeftScroll ? { visibility: 'hidden' } : null} />
      <HeaderLeaguesList leagues={filteredLeagues} ref={leaguesRef} />
      <Arrow
        direction='right'
        onClick={scrollLeagues}
        style={!isRightScroll ? { visibility: 'hidden' } : null}
      />
    </div>
  );
};

export default HeaderLeagues;

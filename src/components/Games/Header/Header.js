import React, { useState, useEffect, useRef } from 'react';
import cl from './Header.module.scss';
import HeaderWrapper from 'components/HeaderWrapper/HeaderWrapper';
import Arrow from 'components/UI/buttons/Arrow/Arrow';
import LeagueImage from 'images/league_image.png';

const Header = () => {
  const [currentScroll, setCurrentScroll] = useState(0);
  const [isLeftScroll, setIsLeftScroll] = useState(false);
  const [isRightScroll, setIsRightScroll] = useState(true);

  const leaguesRef = useRef();

  useEffect(() => {
    setIsLeftScroll(currentScroll <= 0 ? false : true);
    setIsRightScroll(currentScroll + leaguesRef.current.clientWidth < leaguesRef.current.scrollWidth);
  }, [currentScroll]);

  const scrollLeagues = e => {
    if (e.currentTarget.name === 'scroll-left') {
      const scrollValue = leaguesRef.current.scrollLeft - 248;
      leaguesRef.current.scrollLeft -= 248;
      setCurrentScroll(scrollValue);
      return;
    }
    const scrollValue = leaguesRef.current.scrollLeft + 248;
    leaguesRef.current.scrollLeft += 248;
    setCurrentScroll(scrollValue);
  };
  return (
    <HeaderWrapper>
      <div className={cl.headerContent}>
        <div className={cl.selections}>
          <ul className={cl.years}>
            <li className={cl.active}>2021</li>
            <li>2022</li>
          </ul>
          <ul className={cl.types}>
            <li>All</li>
            <li className={cl.active}>Baseball</li>
            <li>Softball</li>
          </ul>
        </div>
        <div className={cl.leaguesWrapper}>
          <Arrow onClick={scrollLeagues} style={!isLeftScroll ? { visibility: 'hidden' } : null} />
          <ul className={cl.leagues} ref={leaguesRef}>
            <li className={cl.league + ' ' + cl.active}>All</li>
            <li className={cl.league}>Russian championship</li>
            <li className={cl.league}>Russian championship</li>
            <li className={cl.league}>Russian championship</li>
            <li className={cl.league}>Russian championship</li>
            <li className={cl.league}>Russian championship</li>
            <li className={cl.league}>Russian championship</li>
            <li className={cl.league}>Russian championship</li>
            <li className={cl.league}>Russian championship</li>
          </ul>
          <Arrow
            direction='right'
            onClick={scrollLeagues}
            style={!isRightScroll ? { visibility: 'hidden' } : null}
          />
        </div>
      </div>
    </HeaderWrapper>
  );
};

export default Header;

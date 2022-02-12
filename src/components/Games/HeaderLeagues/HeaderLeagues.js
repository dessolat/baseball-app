import React, { useState, useEffect, useRef } from 'react';
import cl from './HeaderLeagues.module.scss';
import Arrow from 'components/UI/buttons/Arrow/Arrow';
import LeagueImage from 'images/league_image.png';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentLeague } from 'redux/gamesReducer';

const HeaderLeagues = ({ leagues }) => {
  const [currentScroll, setCurrentScroll] = useState(0);
  const [isLeftScroll, setIsLeftScroll] = useState(false);
  const [isRightScroll, setIsRightScroll] = useState(true);

  const leaguesRef = useRef();

  const currentLeague = useSelector(state => state.games.currentLeague);
  const dispatch = useDispatch();

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
  console.log(leagues);
  return (
    <div className={cl.leaguesWrapper}>
      <Arrow onClick={scrollLeagues} style={!isLeftScroll ? { visibility: 'hidden' } : null} />
      <ul className={cl.leagues} ref={leaguesRef}>
        {leagues.map(league => {
					console.log(league);
          return (
            <li
              key={league.id}
              className={league.id === currentLeague.id ? cl.league + ' ' + cl.active : cl.league}
              onClick={() => dispatch(setCurrentLeague({ id: league.id, name: league.name }))}>
              {league.name}
            </li>
          );
        })}
      </ul>
      <Arrow
        direction='right'
        onClick={scrollLeagues}
        style={!isRightScroll ? { visibility: 'hidden' } : null}
      />
    </div>
  );
};

export default HeaderLeagues;

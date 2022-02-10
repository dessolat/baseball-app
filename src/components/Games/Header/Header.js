import React from 'react';
import cl from './Header.module.scss';
import HeaderWrapper from 'components/HeaderWrapper/HeaderWrapper';
import Arrow from 'components/UI/buttons/Arrow/Arrow';
import LeagueImage from 'images/league_image.png';

const Header = () => {
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
          <Arrow />
          <ul className={cl.leagues}>
            <li className={cl.league + ' ' + cl.active}>
              <img src={LeagueImage} alt='league-image' />
							<p>Russian championship</p>
            </li>
            <li className={cl.league}>
              <img src={LeagueImage} alt='league-image' />
							<p>Russian championship</p>
            </li>
            <li className={cl.league}>
              <img src={LeagueImage} alt='league-image' />
							<p>Russian championship</p>
            </li>
            <li className={cl.league}>
              <img src={LeagueImage} alt='league-image' />
							<p>Russian championship</p>
            </li>
            <li className={cl.league}>
              <img src={LeagueImage} alt='league-image' />
							<p>Russian championship</p>
            </li>
          </ul>
          <Arrow direction='right' />
        </div>
      </div>
    </HeaderWrapper>
  );
};

export default Header;

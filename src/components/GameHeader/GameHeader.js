import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import cl from './GameHeader.module.scss';
import LeftLogo from '../../images/left-logo.png';
import RightLogo from '../../images/right-logo.png';

const GameHeader = () => {
  useEffect(() => {
    (function () {
      function scrollHorizontally(e) {
        e = window.event || e;
        var delta = Math.max(-1, Math.min(1, e.wheelDelta || -e.detail));
        document.getElementById('scores-table-scroll').scrollLeft += delta * 32;
        e.preventDefault();
      }
      if (document.getElementById('scores-table-scroll').addEventListener) {
        document
          .getElementById('scores-table-scroll')
          .addEventListener('mousewheel', scrollHorizontally, false);
        document
          .getElementById('scores-table-scroll')
          .addEventListener('DOMMouseScroll', scrollHorizontally, false);
      } else {
        document.getElementById('scores-table-scroll').attachEvent('onmousewheel', scrollHorizontally);
      }
    })();
  }, []);

  return (
    <header className={cl.header}>
      <div className='container'>
        <div className={cl.headerContent}>
          <div>
            <p className={cl.date}>Aug 23, 2021</p>
            <p className={cl.location}>at Moscow (Russtar Arena)</p>
            <ul className={cl.gameTabs}>
              <li>
                <NavLink to={`/game/lineup`} activeClassName={cl.active}>
                  Lineup
                </NavLink>
              </li>
              <li>
                <NavLink to={`/game/box`} activeClassName={cl.active}>
                  Box
                </NavLink>
              </li>
              <li>
                <NavLink to={`/game/plays`} activeClassName={cl.active}>
                  Plays
                </NavLink>
              </li>
              <li>
                <NavLink to={`/game/videos`} activeClassName={cl.active}>
                  Videos
                </NavLink>
              </li>
            </ul>
          </div>
          <img src={LeftLogo} className={cl.leftLogo} alt='attack-team' />
          <h2 className={cl.teamScore}>4</h2>
          <div className={cl.scoresWrapper}>
            <div className={cl.teamNames}>
              <p className={cl.teamAttack}>RusStar</p>
              <p className={cl.teamDefence}>Moskvich</p>
            </div>
            <div className={cl.scoresTable} id='scores-table-scroll'>
              <div>
                <span>1</span>
                <span>2</span>
                <span>0</span>
              </div>
              <div>
                <span>2</span>
                <span>0</span>
                <span>0</span>
              </div>
              <div>
                <span>3</span>
                <span>0</span>
                <span>0</span>
              </div>
              <div>
                <span>4</span>
                <span>0</span>
                <span>1</span>
              </div>
              <div>
                <span>5</span>
                <span>0</span>
                <span>0</span>
              </div>
              <div>
                <span>6</span>
                <span>0</span>
                <span>2</span>
              </div>
              <div>
                <span>7</span>
                <span>0</span>
                <span>3</span>
              </div>
              <div>
                <span>8</span>
                <span>0</span>
                <span>0</span>
              </div>
              <div>
                <span>9</span>
                <span>2</span>
                <span>3</span>
              </div>
              <div>
                <span>10</span>
                <span>2</span>
                <span>1</span>
              </div>
            </div>

            <div className={cl.gameInfo}>
              <div>
                <span>R</span>
                <span>4</span>
                <span>6</span>
              </div>
              <div>
                <span>H</span>
                <span>6</span>
                <span>10</span>
              </div>
              <div>
                <span>E</span>
                <span>1</span>
                <span>1</span>
              </div>
            </div>
          </div>
          <h2 className={cl.teamScore + ' ' + cl.defenceTeamScore}>6</h2>
          <img src={RightLogo} className={cl.rightLogo} alt='defence-team' />
        </div>
      </div>
    </header>
  );
};

export default GameHeader;

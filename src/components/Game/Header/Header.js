import React, { useEffect, useMemo } from 'react';
import cl from './Header.module.scss';
import LeftLogo from 'images/left-logo.png';
import RightLogo from 'images/right-logo.png';
import HeaderTabs from '../HeaderTabs/HeaderTabs';
import HeaderScoresList from '../HeaderScoresList/HeaderScoresList';
import HeaderInfo from '../HeaderInfo/HeaderInfo';
import HeaderTeams from '../HeaderTeams/HeaderTeams';
import Arrow from 'components/UI/buttons/Arrow/Arrow';
import VerticalScrollDivider from 'components/UI/dividers/VerticalScrollDivider/VerticalScrollDivider';
import useScrollHorizontally from 'hooks/useScrollHorizontally';
import useFullDate from 'hooks/useFullDate';

const Header = ({ preview, innings, inningNumber, setInningNumber }) => {
  const [scrollRef, isLeftScroll, isRightScroll, addListeners, removeListeners, scrollFixation] =
    useScrollHorizontally();

  // useEffect(() => {
  // 	scrollFixation()
  //   addListeners();
  //   return () => {
  //     removeListeners();
  //   };
  // }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollFixation();
    }
  }, [preview.innings]);

  const handleScoresItemClick = inningNumber => {
    setInningNumber(prev => prev === inningNumber ? null : inningNumber);
  };

  const scrollHorizontally = e => {
    const start = scrollRef.current.scrollLeft,
      change = 120,
      increment = 10;
    let currentTime = 0;

    Math.easeInOutQuad = function (t, b, c, d) {
      t /= d / 2;
      if (t < 1) return (c / 2) * t * t + b;
      t--;
      return (-c / 2) * (t * (t - 2) - 1) + b;
    };

    const animateScroll = function (name) {
      currentTime += increment;
      const val = Math.easeInOutQuad(currentTime, start, name === 'scroll-left' ? -change : change, 300);
      scrollRef.current.scrollLeft = val;
      if (currentTime < 300) {
        setTimeout(() => animateScroll(name), increment);
      }
    };

    animateScroll(e.currentTarget.name);
  };

	

  return (
    <header className={cl.header}>
			
      <div className='container'>
        <div className={cl.headerContent}>
          <div>
            <p className={cl.date}>{useFullDate(preview.game_date)}</p>
            <p className={cl.location}>at Moscow ({preview.stadium_name})</p>
            <HeaderTabs />
          </div>
          <img src={LeftLogo} className={cl.leftLogo} alt='attack-team' />
          <h2 className={cl.teamScore}>{preview.guests_score}</h2>
          <div className={cl.scoresWrapper}>
            <HeaderTeams names={[preview.guests, preview.owners]} />
            <div className={cl.scoresListWrapper}>
              {isLeftScroll ? (
                <>
                  <Arrow onClick={scrollHorizontally} />
                  <VerticalScrollDivider />
                </>
              ) : (
                <>
                  <Arrow style={{ visibility: 'hidden' }} />
                  <VerticalScrollDivider style={{ visibility: 'hidden' }} />
                </>
              )}
              <HeaderScoresList
                ref={scrollRef}
                innings={innings}
                inningNumber={inningNumber}
                handleClick={handleScoresItemClick}
              />
              {isRightScroll ? (
                <>
                  <VerticalScrollDivider direction='right' />
                  <Arrow direction='right' onClick={scrollHorizontally} />
                </>
              ) : (
                <>
                  <VerticalScrollDivider style={{ visibility: 'hidden' }} />
                  <Arrow style={{ visibility: 'hidden' }} />
                </>
              )}
            </div>
            <HeaderInfo innings={innings} inningNumber={inningNumber}/>
          </div>
          <h2 className={cl.teamScore + ' ' + cl.defenceTeamScore}>{preview.owners_score}</h2>
          <img src={RightLogo} className={cl.rightLogo} alt='defence-team' />
        </div>
      </div>
    </header>
  );
};

export default Header;

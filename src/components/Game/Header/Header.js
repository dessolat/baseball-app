import React, { useEffect } from 'react';
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

const Header = ({ inningsData, gameInfoData, teamNames, inningNumber, setInningNumber }) => {
  const [
    scrollRef,
    leftScrollDelta,
    setLeftScrollDelta,
    fullScrollWidth,
    addListeners,
    removeListeners,
    scrollFixation
  ] = useScrollHorizontally();

  useEffect(() => {
    const scroll = scrollRef.current;
    addListeners(scroll);
    return () => {
      removeListeners(scroll);
    };
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollFixation();
    }
  }, [inningsData]);

  const handleScoresItemClick = inningNumber => {
    setInningNumber(inningNumber);
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
      } else {
        setLeftScrollDelta(scrollRef.current.scrollLeft);
      }
    };

    animateScroll(e.currentTarget.name);
  };

  return (
    <header className={cl.header}>
      <div className='container'>
        <div className={cl.headerContent}>
          <div>
            <p className={cl.date}>Aug 23, 2021</p>
            <p className={cl.location}>at Moscow (Russtar Arena)</p>
            <HeaderTabs />
          </div>
          <img src={LeftLogo} className={cl.leftLogo} alt='attack-team' />
          <h2 className={cl.teamScore}>44</h2>
          <div className={cl.scoresWrapper}>
            <HeaderTeams names={teamNames} />
            <div className={cl.scoresListWrapper}>
              {leftScrollDelta > 0 ? (
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
                data={inningsData}
                inningNumber={inningNumber}
                handleClick={handleScoresItemClick}
              />
              {leftScrollDelta + scrollRef.current?.clientWidth < fullScrollWidth ? (
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
            <HeaderInfo data={gameInfoData} />
          </div>
          <h2 className={cl.teamScore + ' ' + cl.defenceTeamScore}>44</h2>
          <img src={RightLogo} className={cl.rightLogo} alt='defence-team' />
        </div>
      </div>
    </header>
  );
};

export default Header;

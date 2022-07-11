import Arrow from 'components/UI/buttons/Arrow/Arrow';
import VerticalScrollDivider from 'components/UI/dividers/VerticalScrollDivider/VerticalScrollDivider';
import useScrollHorizontally from 'hooks/useScrollHorizontally';
import React from 'react';
import { useSelector } from 'react-redux';
import HeaderInfo from '../HeaderInfo/HeaderInfo';
import HeaderScoresList from '../HeaderScoresList/HeaderScoresList';
import HeaderTeams from '../HeaderTeams/HeaderTeams';

const LandscapeScores = ({ cl, currentTab }) => {
  const [scrollRef, isLeftScroll, isRightScroll] =
    useScrollHorizontally();
  const innings = useSelector(state => state.game.innings);
  const preview = useSelector(state => state.game.preview);


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

  const leftArrowGroup = isLeftScroll ? (
    <>
      <Arrow onClick={scrollHorizontally} />
      <VerticalScrollDivider />
    </>
  ) : (
    <>
      <Arrow style={{ visibility: 'hidden' }} />
      <VerticalScrollDivider style={{ visibility: 'hidden' }} />
    </>
  );

  const rightArrowGroup = isRightScroll ? (
    <>
      <VerticalScrollDivider direction='right' />
      <Arrow direction='right' onClick={scrollHorizontally} />
    </>
  ) : (
    <>
      <VerticalScrollDivider style={{ visibility: 'hidden' }} />
      <Arrow style={{ visibility: 'hidden' }} />
    </>
  );
  return (
    <div className={cl.landscapeScoresWrapper}>
      <HeaderTeams names={[preview.guests.name, preview.owners.name]} currentTab={currentTab} />
      <div className={cl.scoresListWrapper}>
        <div className={cl.arrowGroup}>{leftArrowGroup}</div>
        <HeaderScoresList ref={scrollRef} innings={innings} currentTab={currentTab} />
        <div className={cl.arrowGroup}>{rightArrowGroup}</div>
      </div>
      <HeaderInfo innings={innings} />
    </div>
  );
};

export default LandscapeScores;

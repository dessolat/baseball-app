import cl from './InfoDropdown.module.scss';
import CrossClose from 'components/UI/buttons/CrossClose/CrossClose';
import HeaderTeams from 'components/Game/HeaderTeams/HeaderTeams';
import HeaderScoresList from 'components/Game/HeaderScoresList/HeaderScoresList';
import HeaderInfo from 'components/Game/HeaderInfo/HeaderInfo';
import { shallowEqual, useSelector } from 'react-redux';
import { useEffect } from 'react';
import useScrollHorizontally from 'hooks/useScrollHorizontally';
import Arrow from 'components/UI/buttons/Arrow/Arrow';
import VerticalScrollDivider from 'components/UI/dividers/VerticalScrollDivider/VerticalScrollDivider';
import classNames from 'classnames';

const InfoPanel = ({ panelStyles, setIsOpen }) => {
  const innings = useSelector(s => s.game.innings, shallowEqual);
  const preview = useSelector(s => s.game.preview, shallowEqual);

  const [scrollRef, isLeftScroll, isRightScroll, addListeners, removeListeners, scrollFixation] =
    useScrollHorizontally();

  useEffect(() => {
    const ref = scrollRef.current;
    scrollFixation();
    addListeners();
    return () => {
      removeListeners(ref);
    };
  }, [scrollFixation, addListeners, removeListeners, scrollRef]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollFixation();
    }
  }, [innings, scrollRef, scrollFixation]);

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

  const handleCrossClick = () => setIsOpen(false);

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

  const scoresWrapperClasses = classNames(cl.scoresWrapper);
  return (
    <div className={cl.infoPanel} style={panelStyles}>
      <div className={scoresWrapperClasses}>
        <HeaderTeams names={[preview.guests.name, preview.owners.name]} currentTab={null} />
        <div className={cl.scoresListWrapper}>
          <div className={cl.arrowGroup}>{leftArrowGroup}</div>
          <HeaderScoresList ref={scrollRef} innings={innings} currentTab={null} />
          <div className={cl.arrowGroup}>{rightArrowGroup}</div>
        </div>
        <HeaderInfo innings={innings} />
      </div>

      <CrossClose handleCrossClick={handleCrossClick} style={{ left: 10, top: 10, width: 30, height: 30 }} />
    </div>
  );
};

export default InfoPanel;

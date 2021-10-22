import React, { useState, useEffect, useRef } from 'react';
import GameSituationsList from '../GameSituationsList/GameSituationsList';
import LeftArrow from '../UI/buttons/LeftArrow';
import RightArrow from '../UI/buttons/RightArrow';
import cl from './GameFiltersPanel.module.scss';

const GameFiltersPanel = ({ situationFilter, setSituationFilter, situationsList }) => {
  const [situations, setSituations] = useState(situationsList);
  const [remWidth, setRemWidth] = useState(null);
  const scrollRef = useRef();

  useEffect(() => {
    function scrollHorizontally(e) {
      e = window.event || e;
      var delta = Math.max(-1, Math.min(1, e.wheelDelta || -e.detail));
      scrollRef.current.scrollLeft += delta * 32;
      e.preventDefault();
    }

    const scroll = scrollRef.current;

    if (scroll.addEventListener) {
      scroll.addEventListener('mousewheel', scrollHorizontally, false);
      scroll.addEventListener('DOMMouseScroll', scrollHorizontally, false);
    } else {
      scroll.attachEvent('onmousewheel', scrollHorizontally);
    }

    return () => {
      if (scroll.removeEventListener) {
        scroll.removeEventListener('mousewheel', scrollHorizontally, false);
        scroll.removeEventListener('DOMMouseScroll', scrollHorizontally, false);
      } else {
        scroll.detachEvent('onmousewheel', scrollHorizontally);
      }
    };
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      const fontSize = window.getComputedStyle(document.documentElement).fontSize;
      const remWidth = scrollRef.current.clientWidth / parseInt(fontSize);
      setRemWidth(remWidth);
    }
  }, [situations]);

  const handleClick = e => {
    setSituationFilter(e.currentTarget.name);
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
    <section>
      <div className='container'>
        <div className={cl.filtersPanel}>
          <div className={cl.situationsWrapper}>
            {remWidth >= 63.5 && <LeftArrow cl={cl} scroll={scrollHorizontally} />}
            <GameSituationsList
              ref={scrollRef}
              situationFilter={situationFilter}
              situations={situations}
              handleClick={handleClick}
            />
            {remWidth >= 63.5 && <RightArrow cl={cl} scroll={scrollHorizontally} />}
          </div>
          <div className={cl.viewModes}></div>
        </div>
      </div>
    </section>
  );
};

export default GameFiltersPanel;

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

		const scroll = scrollRef.current

    if (scrollRef.current.addEventListener) {
      scrollRef.current.addEventListener('mousewheel', scrollHorizontally, false);
      scrollRef.current.addEventListener('DOMMouseScroll', scrollHorizontally, false);
    } else {
      scrollRef.current.attachEvent('onmousewheel', scrollHorizontally);
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

  function scrollHorizontally(e) {
    e.currentTarget.name === 'scroll-left'
      ? (scrollRef.current.scrollLeft -= 32)
      : (scrollRef.current.scrollLeft += 32);
  }

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

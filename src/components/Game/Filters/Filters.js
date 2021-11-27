import React, { useEffect } from 'react';
import FiltersSituationsList from '../FiltersSituationsList/FiltersSituationsList';
import FiltersViewModes from '../FiltersViewModes/FiltersViewModes';
import Arrow from 'components/UI/buttons/Arrow/Arrow';
import cl from './Filters.module.scss';
import useScrollHorizontally from 'hooks/useScrollHorizontally';
import { useSearchParams } from 'react-router-dom';
import useTabs from 'hooks/useTabs';
import { useSelector } from 'react-redux';

const Filters = () => {
  const [searchParams] = useSearchParams();
  const tab = searchParams.get('tab');
  const situations = useSelector(state => state.game.situations);
  const [scrollRef, isLeftScroll, isRightScroll, addListeners, removeListeners, scrollFixation] =
    useScrollHorizontally();

  useEffect(() => {
    const ref = scrollRef.current;
    setTimeout(scrollFixation, 300);
    addListeners();
    return () => {
      removeListeners(ref);
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollFixation();
    }
    // eslint-disable-next-line
  }, [situations]);

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
    <section className='container'>
      <div className={cl.filters}>
        <div className={cl.situationsWrapper}>
          {isLeftScroll ? <Arrow onClick={scrollHorizontally} /> : <Arrow style={{ visibility: 'hidden' }} />}
          <FiltersSituationsList ref={scrollRef} situations={situations} />
          {isRightScroll ? (
            <Arrow direction='right' onClick={scrollHorizontally} />
          ) : (
            <Arrow style={{ visibility: 'hidden' }} />
          )}
        </div>
        {tab === 'videos' && <FiltersViewModes />}
      </div>
    </section>
  );
};

export default Filters;

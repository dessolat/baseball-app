import React, { useEffect } from 'react';
import cl from './Filters.module.scss';
import FiltersSituationsList from '../FiltersSituationsList/FiltersSituationsList';
import FiltersViewModes from '../FiltersViewModes/FiltersViewModes';
import Arrow from 'components/UI/buttons/Arrow/Arrow';
import useScrollHorizontally from 'hooks/useScrollHorizontally';
import { useSelector } from 'react-redux';
import { getSearchParam } from 'utils';

const Filters = () => {
  const tab = getSearchParam('tab');
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
      change = 580,
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

  const renderScrollArrow = (flag, direction = 'left') => (
    <Arrow
      direction={direction}
      onClick={flag ? scrollHorizontally : null}
      style={flag ? (direction === 'right' ? { marginLeft: '.3125rem' } : null) : { visibility: 'hidden' }}
    />
  );

  return (
    <section className={'container ' + cl.filtersContainer}>
      <div className={cl.filters}>
        <div className={cl.situationsWrapper}>
          {renderScrollArrow(isLeftScroll)}
          <FiltersSituationsList ref={scrollRef} situations={situations} />
          {renderScrollArrow(isRightScroll, 'right')}
        </div>
        {tab === 'videos' && <FiltersViewModes />}
      </div>
    </section>
  );
};

export default Filters;

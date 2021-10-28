import React, { useEffect } from 'react';
import FiltersSituationsList from '../FiltersSituationsList/FiltersSituationsList';
import FiltersViewModes from '../FiltersViewModes/FiltersViewModes';
import Arrow from 'components/UI/buttons/Arrow/Arrow';
import cl from './Filters.module.scss';
import useScrollHorizontally from 'hooks/useScrollHorizontally';
import useQuery from 'hooks/useQuery';

const Filters = ({ situationFilter, setSituationFilter, viewMode, setViewMode, situations }) => {
  const query = useQuery()
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
			removeListeners(scroll)
    };
		// eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollFixation()
    }
		// eslint-disable-next-line
  }, [situations]);

  const handleSituationClick = e => {
    setSituationFilter(e.currentTarget.name);
  };

  const handleModeClick = e => {
    setViewMode(e.currentTarget.name);
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
    <section className='container'>
      <div className={cl.filters}>
        <div className={cl.situationsWrapper}>
          {leftScrollDelta > 0 ? (
            <Arrow onClick={scrollHorizontally} />
          ) : (
            <Arrow style={{ visibility: 'hidden' }} />
          )}
          <FiltersSituationsList
            ref={scrollRef}
            situationFilter={situationFilter}
            situations={situations}
            handleClick={handleSituationClick}
          />
          {leftScrollDelta + scrollRef.current?.clientWidth < fullScrollWidth ? (
            <Arrow direction='right' onClick={scrollHorizontally} />
          ) : (
            <Arrow style={{ visibility: 'hidden' }} />
          )}
        </div>
        {query.get('tab') === 'videos' && <FiltersViewModes handleModeClick={handleModeClick} viewMode={viewMode} />}
      </div>
    </section>
  );
};

export default Filters;

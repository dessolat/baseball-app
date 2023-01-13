import React, { useState, useRef, useEffect } from 'react';
import cl from './PlaysEvents.module.scss';
import PlaysEventsItem from './PlaysEventsItem';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentMoment } from 'redux/gameReducer';

const PlaysEventsList = ({ moments }) => {
  const activeCardList = useSelector(state => state.game.activeCardList);
  const currentMoment = useSelector(state => state.game.currentMoment);
	const isVideo = useSelector(state => state.game.isVideo)
  const dispatch = useDispatch();
  const [classes, setClasses] = useState([cl.list]);
  const [animationClass, setAnimationClass] = useState('');
  const ref = useRef();
  const eventsChildRef = useRef(null);
  const animationRef = useRef(false);

  useEffect(() => {
		isVideo && setClasses(prev => [...prev, cl.isVideosList])
		
    setTimeout(() => {
      if (eventsChildRef.current) {
        eventsChildRef.current.parentNode.scrollTop =
          eventsChildRef.current.offsetTop + eventsChildRef.current.clientHeight / 2 - 320;
      }
    }, 0);
		// eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (ref.current === null) return;

    const classes = [cl.list];
		isVideo && classes.push(cl.isVideosList)
		!isVideo && classes.push(cl.noVideo)
    ref.current.scrollHeight > ref.current.clientHeight
      ? classes.push(...[cl.listBottomShadow, cl.beforeBlue])
      : classes.push([cl.beforeBlue]);

    const shadowsArr = [];
    if (ref.current.scrollLeft > 0) {
      shadowsArr.push('8px 0 8px -8px inset rgba(0,0,0, .7)');
    }

    if (ref.current.scrollWidth > (ref.current.scrollLeft + ref.current.clientWidth)) {
      shadowsArr.push('-8px 0 8px -8px inset rgba(0,0,0, .7)');
    }

      ref.current.style.boxShadow = shadowsArr.length > 0 ? shadowsArr.join(',') : 'none';

    activeCardList === 'events' && classes.push(cl.blueTopLoad);
    setClasses(classes);
    // eslint-disable-next-line
  }, [moments]);

  useEffect(() => {
    if (!animationRef.current) {
      animationRef.current = true;
      return;
    }

    const animation = activeCardList === 'cards' ? cl.taller : cl.wider;
    setAnimationClass(animation);
  }, [activeCardList]);

  useEffect(() => {
    if (!eventsChildRef.current) return;

    eventsChildRef.current.parentNode.scrollTop =
      eventsChildRef.current.offsetTop + eventsChildRef.current.clientHeight / 2 - 320;
    eventsChildRef.current.parentNode.scrollLeft =
      eventsChildRef.current.offsetLeft + eventsChildRef.current.clientWidth / 2 - 150;
  }, [currentMoment]);

  const handleMomentClick = moment => () => {
    // dispatch(setPlaybackMode('pause'));
    dispatch(setCurrentMoment({...moment, manualClick: true}));
  };

	const scrollHandle = e => {
		const shadowsArr = []
		if (e.target.scrollLeft > 0) {
			shadowsArr.push('8px 0 8px -8px inset rgba(0,0,0, .7)')
		}
		if (e.target.scrollWidth > (e.target.scrollLeft + e.target.clientWidth)) {
			shadowsArr.push('-8px 0 8px -8px inset rgba(0,0,0, .7)')
		}
		e.target.style.boxShadow = shadowsArr.length > 0 ? shadowsArr.join(',') : 'none';
	}
  return (
    <ul
      className={classes.join(' ') + ' ' + animationClass}
      ref={ref}
      onScroll={e => scrollHandle(e)}>
      {moments.length !== 0 &&
        moments.map((moment, i) => (
          <PlaysEventsItem
            key={i}
            moment={moment}
            currentMoment={currentMoment}
            handleClick={handleMomentClick}
						isVideo={isVideo}
            ref={eventsChildRef}
          />
        ))}
    </ul>
  );
};

export default PlaysEventsList;

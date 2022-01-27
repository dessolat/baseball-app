import React, { useState, useRef, useEffect } from 'react';
import cl from './PlaysEvents.module.scss';
import PlaysEventsItem from './PlaysEventsItem';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentMoment } from 'redux/gameReducer';

const PlaysEventsList = ({ moments }) => {
  const activeCardList = useSelector(state => state.game.activeCardList);
  const currentMoment = useSelector(state => state.game.currentMoment);
  const dispatch = useDispatch();
  const [classes, setClasses] = useState([cl.list]);
  const [animationClass, setAnimationClass] = useState('');
  const ref = useRef();
  const eventsChildRef = useRef(null);
  const animationRef = useRef(false);

  useEffect(() => {
    setTimeout(() => {
      if (eventsChildRef.current) {
        eventsChildRef.current.parentNode.scrollTop =
          eventsChildRef.current.offsetTop + eventsChildRef.current.clientHeight / 2 - 320;
      }
    }, 0);
  }, []);

  useEffect(() => {
    if (ref.current === null) return;

    const classes = [cl.list];
    ref.current.scrollHeight > ref.current.clientHeight
      ? classes.push(...[cl.listBottomShadow, cl.beforeBlue])
      : classes.push([cl.beforeBlue]);
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
    // if (currentCard.manualClick || !situationsChildRef.current) return;
    if (!eventsChildRef.current) return;

    eventsChildRef.current.parentNode.scrollTop =
      eventsChildRef.current.offsetTop + eventsChildRef.current.clientHeight / 2 - 320;
  }, [currentMoment]);

  const handleMomentClick = moment => () => dispatch(setCurrentMoment(moment));
  return (
    <ul className={classes.join(' ') + ' ' + animationClass} ref={ref}>
      {moments.length !== 0 &&
        moments.map((moment, i) => (
          <PlaysEventsItem
            key={i}
            moment={moment}
            currentMoment={currentMoment}
            handleClick={handleMomentClick}
            ref={eventsChildRef}
          />
        ))}
    </ul>
  );
};

export default PlaysEventsList;

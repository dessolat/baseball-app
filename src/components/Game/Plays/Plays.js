import React, { useEffect, useState } from 'react';
import cl from './Plays.module.scss';
import PlaysEvents from '../PlaysEvents/PlaysEvents';
import PlaysFooter from '../PlaysFooter/PlaysFooter';
import PlaysContent from '../PlaysContent/PlaysContent';
import { useSelector } from 'react-redux';
import { StringParam, useQueryParam } from 'use-query-params';

const Plays = () => {
  const [tab] = useQueryParam('ptab', StringParam);
  const [moments, setMoments] = useState([]);
  const [currentMoment, setCurrentMoment] = useState({});
  const currentCard = useSelector(state => state.game.currentCard);

  useEffect(() => {
    const newMoments = [];
    currentCard.type !== 'Replacement'
      ? currentCard.moments?.forEach(moment => moment.icons && newMoments.push(moment))
      : newMoments.push(currentCard.moments[0]);
    setMoments(newMoments);
    setCurrentMoment(newMoments[0] || {});
  }, [currentCard]);

  const classes = [cl.plays];
  classes.push(tab === 'hitting' ? cl.hitting : tab === 'running' ? cl.running : cl.pitch);

  const handleMomentClick = moment => setCurrentMoment(moment);

  return (
    <div className={classes.join(' ')}>
      <PlaysEvents moments={moments} currentMoment={currentMoment} handleClick={handleMomentClick} />
      <PlaysContent currentMoment={currentMoment} moments={moments} />
      <PlaysFooter />
    </div>
  );
};

export default Plays;

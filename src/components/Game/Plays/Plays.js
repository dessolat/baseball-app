import React, { useEffect, useState } from 'react';
import cl from './Plays.module.scss';
import PlaysEvents from '../PlaysEvents/PlaysEvents';
import PlaysFooter from '../PlaysFooter/PlaysFooter';
import PlaysContent from '../PlaysContent/PlaysContent';
import { useSelector } from 'react-redux';

const Plays = () => {
  const [footerTab, setFooterTab] = useState('pitch');
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

  const classes = [cl.plays, cl.pitch];
  // footerTab === 'pitch' && classes.push(cl.pitch)

  const handleMomentClick = moment => setCurrentMoment(moment);

  return (
    <div className={classes.join(' ')}>
      <PlaysEvents moments={moments} currentMoment={currentMoment} handleClick={handleMomentClick} />
      <PlaysContent footerTab={footerTab} currentMoment={currentMoment}/>
      <PlaysFooter footerTab={footerTab} setFooterTab={setFooterTab} />
    </div>
  );
};

export default Plays;

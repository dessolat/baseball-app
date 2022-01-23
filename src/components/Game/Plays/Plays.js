import React, { useEffect, useState } from 'react';
import cl from './Plays.module.scss';
import PlaysEvents from '../PlaysEvents/PlaysEvents';
import PlaysFooter from '../PlaysFooter/PlaysFooter';
import PlaysContent from '../PlaysContent/PlaysContent';
import { useSelector } from 'react-redux';
import { getSearchParam, setSearchParam } from 'utils';

const Plays = () => {
	const ptab = getSearchParam('ptab')
	const defaultPtab = ['pitch', 'hitting', 'running'].includes(ptab) ? ptab : 'pitch'
  const [currentTab, setCurrentTab] = useState(defaultPtab);
  const [moments, setMoments] = useState([]);
  const currentCard = useSelector(state => state.game.currentCard);

  useEffect(() => {
    const newMoments = [];
    currentCard.type !== 'Replacement'
      ? currentCard.moments?.forEach(moment => moment.icons && newMoments.push(moment))
      : newMoments.push(currentCard.moments[0]);
    setMoments(newMoments);
		// eslint-disable-next-line
  }, [currentCard]);

  const classes = [cl.plays];
  classes.push(currentTab === 'hitting' ? cl.hitting : currentTab === 'running' ? cl.running : cl.pitch);

  const handleTabClick = e => {
    setSearchParam('ptab', e.target.name);
    setCurrentTab(e.target.name);
  };

  return (
    <div className={classes.join(' ')}>
      <PlaysEvents moments={moments} />
      <PlaysContent moments={moments} currentTab={currentTab}/>
      <PlaysFooter currentTab={currentTab} handleClick={handleTabClick} />
    </div>
  );
};

export default Plays;

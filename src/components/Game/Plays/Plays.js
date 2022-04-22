import React, { useEffect, useState } from 'react';
import cl from './Plays.module.scss';
import PlaysEvents from '../PlaysEvents/PlaysEvents';
import PlaysFooter from '../PlaysFooter/PlaysFooter';
import PlaysContent from '../PlaysContent/PlaysContent';
import { useDispatch, useSelector } from 'react-redux';
import { getSearchParam, setSearchParam } from 'utils';
import { setPitchState } from 'redux/gameReducer';
// import MobilePitcherFilters from '../Content/MobilePitcherFilters';

const Plays = ({ isVideo }) => {
  const ptab = getSearchParam('ptab');
  const defaultPtab = ['pitch', 'hitting', 'running'].includes(ptab) ? ptab : 'pitch';
  const [currentTab, setCurrentTab] = useState(defaultPtab);
  const [moments, setMoments] = useState([]);
  const currentCard = useSelector(state => state.game.currentCard);
	const dispatch = useDispatch()

  useEffect(() => {
    const newMoments = [];
    currentCard.type !== 'Replacement'
      ? currentCard.moments?.forEach(moment => moment.icons && newMoments.push(moment))
      : newMoments.push(currentCard.moments[0]);
    setMoments(newMoments);
    // eslint-disable-next-line
  }, [currentCard]);

  const classes = [cl.plays];
  classes.push(
    !isVideo
      ? cl.playsNoVideo
      : currentTab === 'hitting'
      ? cl.hitting
      : currentTab === 'running'
      ? cl.running
      : cl.pitch
  );

  const handleTabClick = e => {
    setSearchParam('ptab', e.target.name);
    setCurrentTab(e.target.name);
		dispatch(setPitchState('Field'))
  };

  return (
    <div className={classes.join(' ')}>
      {isVideo && (
				<>
          <PlaysFooter currentTab={currentTab} handleClick={handleTabClick} />
          <PlaysContent moments={moments} currentTab={currentTab} />
        </>
      )}
			<PlaysEvents moments={moments} />
			{/* <MobilePitcherFilters /> */}
    </div>
  );
};

export default Plays;

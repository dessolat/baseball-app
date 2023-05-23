import React, { useLayoutEffect } from 'react';
import cl from './Plays.module.scss';
// import PlaysEvents from '../PlaysEvents/PlaysEvents';
// import PlaysFooter from '../PlaysFooter/PlaysFooter';
import PlaysContent from '../PlaysContent/PlaysContent';
import { useDispatch, useSelector } from 'react-redux';
import { getSearchParam } from 'utils';
// import { setSearchParam } from 'utils';
import { setCurrentTab } from 'redux/gameReducer';
import classNames from 'classnames';
// import { setPitchState } from 'redux/gameReducer';
// import MobilePitcherFilters from '../Content/MobilePitcherFilters';

const Plays = ({ isVideo }) => {
  // const ptab = getSearchParam('ptab');
  // const defaultPtab = ['pitch', 'hitting', 'running'].includes(ptab) ? ptab : 'pitch';
  // const [currentTab, setCurrentTab] = useState(defaultPtab);
  // const [moments, setMoments] = useState([]);
  // const currentCard = useSelector(state => state.game.currentCard);
  const currentTab = useSelector(state => state.game.currentTab);
  const pitchState = useSelector(state => state.game.pitchState);

  const dispatch = useDispatch();

  useLayoutEffect(() => {
    const tab = getSearchParam('tab');
    const defaultPtab = ['pitch', 'hitting', 'running'].includes(tab) ? tab : 'pitch';
    dispatch(setCurrentTab(defaultPtab));
    // const ptab = getSearchParam('ptab');
    // const defaultPtab = ['pitch', 'hitting', 'running'].includes(ptab) ? ptab : 'pitch';
    // dispatch(setCurrentTab(defaultPtab))
    // eslint-disable-next-line
  }, []);

  // useEffect(() => {
  //   const newMoments = [];
  //   currentCard.type !== 'Replacement'
  //     ? currentCard.moments?.forEach(moment => moment.icons && newMoments.push(moment))
  //     : newMoments.push(currentCard.moments[0]);
  //   setMoments(newMoments);
  //   // eslint-disable-next-line
  // }, [currentCard]);

  // const handleTabClick = e => {
		//   setSearchParam('ptab', e.target.name);
		//   dispatch(setCurrentTab(e.target.name));
		//   dispatch(setPitchState('Field'))
		// };
		
		const playsClasses = classNames(cl.plays, {
			[cl.playsNoVideo]: !isVideo,
			[cl.hitting]: isVideo && currentTab === 'hitting',
			[cl.running]: isVideo && currentTab === 'running',
			[cl.pitch]: isVideo && currentTab !== 'hitting' && currentTab !== 'running',
			[cl.videosGrid]: pitchState === 'Videos'
		});
  return (
    <div className={playsClasses}>
      {isVideo && (
        <>
          {/* <div className={cl.landscapeDisplayNone}>
            <PlaysFooter currentTab={currentTab} handleClick={handleTabClick} />
          </div> */}
          {/* <PlaysFooter currentTab={currentTab} handleClick={handleTabClick} /> */}
          <PlaysContent currentTab={currentTab} />
        </>
      )}
      {/* <div className={cl.landscapeDisplayNone}>
      </div> */}
      {/* <div className={cl.onlyMobileLandscape}>
        <PlaysEvents />
      </div> */}
    </div>
  );
};

export default Plays;

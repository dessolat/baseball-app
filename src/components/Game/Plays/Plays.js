import React, { useLayoutEffect } from 'react';
import cl from './Plays.module.scss';
// import PlaysEvents from '../PlaysEvents/PlaysEvents';
// import PlaysFooter from '../PlaysFooter/PlaysFooter';
import PlaysContent from '../PlaysContent/PlaysContent';
import { useDispatch, useSelector } from 'react-redux';
import { getSearchParam } from 'utils';
// import { setSearchParam } from 'utils';
import { setCurrentTab, setHitState, setPitchState } from 'redux/gameReducer';
import classNames from 'classnames';
import Arrow from 'components/UI/buttons/Arrow/Arrow';
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
  const hitState = useSelector(state => state.game.hitState);

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

  const handleLeftArrowClick = () => {
    if (currentTab === 'pitch') {
      const prevState = pitchState === 'SpeedSpinInfo' ? 'Videos' : 'Field';
			dispatch(setPitchState(prevState));
    }
    if (currentTab === 'hitting') dispatch(setHitState('Field'));
  };
  const handleRightArrowClick = () => {
    if (currentTab === 'pitch') {
      const nextState = pitchState === 'Field' ? 'Videos' : 'SpeedSpinInfo';
      dispatch(setPitchState(nextState));
    }
    if (currentTab === 'hitting') dispatch(setHitState('Videos'));
  };

  const isLeftArrow =
    (currentTab === 'pitch' && pitchState !== 'Field') || (currentTab === 'hitting' && hitState !== 'Field');
  const isRightArrow =
    (currentTab === 'pitch' && pitchState !== 'SpeedSpinInfo') ||
    (currentTab === 'hitting' && hitState !== 'Videos');

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

          {isLeftArrow && (
            <div className={cl.arrowWrapper + ' ' + cl.leftArrow}>
              <Arrow direction='left' onClick={handleLeftArrowClick} />
            </div>
          )}
          {isRightArrow && (
            <div className={cl.arrowWrapper + ' ' + cl.rightArrow}>
              <Arrow direction='right' onClick={handleRightArrowClick} />
            </div>
          )}
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

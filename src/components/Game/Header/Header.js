import React, { useEffect } from 'react';
import cl from './Header.module.scss';
// import axios from 'axios';
import HeaderTabs from '../HeaderTabs/HeaderTabs';
import HeaderScoresList from '../HeaderScoresList/HeaderScoresList';
import HeaderInfo from '../HeaderInfo/HeaderInfo';
import HeaderTeams from '../HeaderTeams/HeaderTeams';
import Arrow from 'components/UI/buttons/Arrow/Arrow';
import VerticalScrollDivider from 'components/UI/dividers/VerticalScrollDivider/VerticalScrollDivider';
import useScrollHorizontally from 'hooks/useScrollHorizontally';
import useFullDate from 'hooks/useFullDate';
import { useDispatch, useSelector } from 'react-redux';
// import { setImagesData } from 'redux/gameReducer';
import HeaderLogo from '../HeaderLogo/HeaderLogo';
import Dropdown from 'components/UI/dropdown/GamesDropdown/Dropdown';
import { getSearchParam, getShortName } from 'utils';
import { setBoxActiveButton } from 'redux/gameReducer';
import MobileHeaderEvents from './MobileHeaderEvents';
import MobilePitcherFilters from '../Content/MobilePitcherFilters';
import MobileFilters from './MobileFilters';

const Header = ({ currentTab, handleTabClick }) => {
  const [scrollRef, isLeftScroll, isRightScroll, addListeners, removeListeners, scrollFixation] =
    useScrollHorizontally();
  const innings = useSelector(state => state.game.innings);
  const preview = useSelector(state => state.game.preview);
  const imagesData = useSelector(state => state.game.imagesData);
  const inningNumber = useSelector(state => state.game.inningNumber);
  const playbackMode = useSelector(state => state.game.playbackMode);
  const isVideo = useSelector(state => state.game.isVideo);
  const boxActiveButton = useSelector(state => state.game.boxActiveButton);
  const currentCard = useSelector(state => state.game.currentCard);

  const dispatch = useDispatch();

  // const dispatch = useDispatch();

  // useEffect(() => {
  //   const fetchImage = async (teamName, url) => {
  //     try {
  //       const response = await axios.get(`http://baseball-gametrack.ru/api/logo/${url}`, {
  //         responseType: 'arraybuffer',
  //         timeout: 2500
  //       });

  //       dispatch(
  //         setImagesData({
  //           [teamName]: 'data:image/jpg;base64, ' + Buffer.from(response.data, 'binary').toString('base64')
  //         })
  //       );
  //     } catch (err) {
  //       // err.message === 'Request failed with status code 523' &&
  //       setTimeout(() => fetchImage(teamName, url), 2500);
  //       console.log(err.message);
  //     }
  //   };

  //   !imagesData[preview.guests.name] &&
  //     preview.guests.logo !== '' &&
  //     fetchImage(preview.guests.name, preview.guests.logo);
  //   !imagesData[preview.owners.name] &&
  //     preview.owners.logo !== '' &&
  //     fetchImage(preview.owners.name, preview.owners.logo);
  //   // eslint-disable-next-line
  // }, []);

  useEffect(() => {
    const ref = scrollRef.current;
    scrollFixation();
    addListeners();
    return () => {
      removeListeners(ref);
    };
  }, [scrollFixation, addListeners, removeListeners, scrollRef]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollFixation();
    }
  }, [innings, scrollRef, scrollFixation]);

  useEffect(() => {
    if (playbackMode !== 'playOnline' || inningNumber < 10) return;
    scrollRef.current.scrollLeft = (inningNumber - 9) * 30;
  }, [playbackMode, inningNumber, scrollRef]);

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
      }
    };

    animateScroll(e.currentTarget.name);
  };

  const guestsClasses = [cl.guests];
  const ownersClasses = [cl.owners];
  currentTab === 'box'
    ? boxActiveButton === 'guests'
      ? guestsClasses.push(cl.active)
      : ownersClasses.push(cl.active)
    : currentCard.side === 'top'
    ? guestsClasses.push(cl.active)
    : ownersClasses.push(cl.active);

  const handleTeamClick = name => () => dispatch(setBoxActiveButton(name));

  const leftArrowGroup = isLeftScroll ? (
    <>
      <Arrow onClick={scrollHorizontally} />
      <VerticalScrollDivider />
    </>
  ) : (
    <>
      <Arrow style={{ visibility: 'hidden' }} />
      <VerticalScrollDivider style={{ visibility: 'hidden' }} />
    </>
  );

  const rightArrowGroup = isRightScroll ? (
    <>
      <VerticalScrollDivider direction='right' />
      <Arrow direction='right' onClick={scrollHorizontally} />
    </>
  ) : (
    <>
      <VerticalScrollDivider style={{ visibility: 'hidden' }} />
      <Arrow style={{ visibility: 'hidden' }} />
    </>
  );

  const defenceScoreClasses = [cl.teamScore, cl.defenceTeamScore];
  const scoresWrapperClasses = [cl.scoresWrapper];
  const teamTotalScoresWrapperClasses = [cl.teamTotalScoresWrapper];
  (getSearchParam('tab') === 'box' || isVideo) && scoresWrapperClasses.push(cl.landscapeDisplayNone);
  getSearchParam('tab') !== 'box' && teamTotalScoresWrapperClasses.push(cl.landscapeDisplayNone);
  const tabsArr = isVideo ? ['Box', 'Videos', 'Pitch', 'Hit', 'Run'] : ['Box', 'Plays'];
  // const tabsArr = isVideo ? ['Box', 'Plays', 'Videos'] : ['Box', 'Plays'];

  const tabsCurrentOption =
    currentTab === 'hitting'
      ? 'Hit'
      : currentTab === 'running'
      ? 'Run'
      : currentTab[0].toUpperCase() + currentTab.slice(1);
  return (
    <header className={cl.header}>
      <div className='container'>
        <div className={cl.headerContent}>
          <div className={cl.geo}>
            <p className={cl.leagueName}>{preview.league_name}</p>
            <p className={cl.date}>{useFullDate(preview.game_date)}</p>
            <p className={cl.location}>at Moscow ({preview.stadium_name})</p>
            <HeaderTabs currentTab={currentTab} handleClick={handleTabClick} />
            <div className={cl.mainModeSelector}>
              <Dropdown
                title={tabsCurrentOption}
                options={tabsArr}
                currentOption={tabsCurrentOption}
                handleClick={handleTabClick}
              />
            </div>
            <div className={teamTotalScoresWrapperClasses.join(' ')}>
              <button className={guestsClasses.join(' ')} onClick={handleTeamClick('guests')}>
                {getShortName(preview.guests.name, 14)}
              </button>
              <div className={cl.scores}>
                {preview.guests.score}
                 - 
                {preview.owners.score}
              </div>
              <button className={ownersClasses.join(' ')} onClick={handleTeamClick('owners')}>
                {getShortName(preview.owners.name, 14)}
              </button>
            </div>
            <MobileFilters />
            {/* <div className={cl.dateLocation}>
              {`${useFullDate(preview.game_date)} At MOSCOW (${preview.stadium_name.toUpperCase()})`}
            </div> */}
            <div className={cl.geoPitcherWrapper}>
              {getSearchParam('tab') !== 'box' && <MobilePitcherFilters />}
            </div>
          </div>
          <HeaderLogo teamName={preview.guests.name} side='left' images={imagesData} />
          <h2 className={cl.teamScore}>{preview.guests.score}</h2>
          <div className={scoresWrapperClasses.join(' ')}>
            <HeaderTeams names={[preview.guests.name, preview.owners.name]} currentTab={currentTab} />
            <div className={cl.scoresListWrapper}>
              <div className={cl.arrowGroup}>{leftArrowGroup}</div>
              <HeaderScoresList ref={scrollRef} innings={innings} currentTab={currentTab} />
              <div className={cl.arrowGroup}>{rightArrowGroup}</div>
            </div>
            <HeaderInfo innings={innings} />
            {!isVideo && <MobileHeaderEvents cl={cl} />}
          </div>
          <h2 className={defenceScoreClasses.join(' ')}>{preview.owners.score}</h2>
          <HeaderLogo teamName={preview.owners.name} side='right' images={imagesData} />
        </div>
      </div>
    </header>
  );
};

export default Header;

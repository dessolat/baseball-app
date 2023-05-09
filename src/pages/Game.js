import React, { useState, useEffect } from 'react';
import Header from 'components/Game/Header/Header';
import Filters from 'components/Game/Filters/Filters';
import Content from 'components/Game/Content/Content';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import Loader from 'components/UI/loaders/Loader/Loader';
import ErrorLoader from 'components/UI/loaders/ErrorLoader/ErrorLoader';
import useGameFetch from 'hooks/useGameFetch';
import { resetData, setCurrentTab as setCurrentSubTab, setIsFullscreen } from 'redux/gameReducer';
import { useParams } from 'react-router-dom';
import { getSearchParam, setSearchParam } from 'utils';
import { setMobileWidth } from 'redux/sharedReducer';

const Game = () => {
  const tab = getSearchParam('tab');
  const defaultTab = ['box', 'videos', 'pitch', 'hitting', 'running', 'plays'].includes(tab) ? tab : 'pitch';

  const [currentTab, setCurrentTab] = useState(defaultTab);
  const { gameId } = useParams();


  const innings = useSelector(state => state.game.innings, shallowEqual);
  

  const errorMsg = useSelector(state => state.game.errorMsg, shallowEqual);

  const dispatch = useDispatch();
  const [error, isLoading, cancelTokenRef, loadedPercents, intervalRef, getFullData] = useGameFetch(
    `http://baseball-gametrack.ru/api/game_${gameId}`
  );

  useEffect(() => {
    // axios
    //   .get(`http://baseball-gametrack.ru/api/game_${gameId}`, {
    //     timeout: 10000
    //   })
    //   .then(() => {
    //     dispatch(getFullData(true));
    //     dispatch(setCurrentGameId(gameId));
    //   })
    //   .catch(() => {
    //     dispatch(setCurrentGameId(gameId));
    //     navigate('/games');
    //   });

    dispatch(getFullData(true));

    const resizeHandle = () => {
      dispatch(setMobileWidth(window.innerWidth));
    };

    const toggleFullscreen = ({ matches }) => dispatch(setIsFullscreen(matches ? true : false));

    resizeHandle();
    window.addEventListener('resize', resizeHandle);

    window.matchMedia('(display-mode: fullscreen)').addEventListener('change', toggleFullscreen);

    return () => {
      // eslint-disable-next-line
      typeof cancelTokenRef.current != 'undefined' && cancelTokenRef.current.cancel(null);
      // eslint-disable-next-line
      clearTimeout(intervalRef.current);
      dispatch(resetData());
      window.removeEventListener('resize', resizeHandle);
      window.matchMedia('(display-mode: fullscreen)').removeEventListener('change', toggleFullscreen);
    };
    // eslint-disable-next-line
  }, []);

  // useEffect(() => {
  //   if (currentGameId === null) return;

  //   typeof cancelTokenRef.current != 'undefined' && cancelTokenRef.current.cancel(null);
  //   dispatch(setCurrentCard({}));
  //   dispatch(setCurrentGameId(gameId));
  //   dispatch(setSituationFilter('All'));
  //   clearInterval(intervalRef.current);
  //   dispatch(getFullData(true, 'http://baseball-gametrack.ru/api/game_' + gameId));
  //   // eslint-disable-next-line
  // }, [gameId]);

  // useEffect(() => {
  // 	console.log(error);
  // }, [error])

  const handleTabClick = e => {
    const tabText = e.target ? e.target.name : e.toLowerCase();
    const resultTabText = tabText === 'hit' ? 'hitting' : tabText === 'run' ? 'running' : tabText;

    setSearchParam('tab', resultTabText);
    setCurrentTab(resultTabText);

    dispatch(setCurrentSubTab(resultTabText));
  };

  const isFilters = currentTab !== 'box';
  return (
    <>
      {errorMsg !== null 
			&& innings.length === 0 
			? (
        <ErrorLoader error={error} />
      ) : isLoading ? (
        <Loader loadedPercents={loadedPercents} />
      ) : 
			innings.length > 0 
			// false
			? (
        <>
          <Header currentTab={currentTab} handleTabClick={handleTabClick} />
          {isFilters && <Filters />}
          <Content currentTab={currentTab} />
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default Game;

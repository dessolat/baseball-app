import React, { useState, useEffect } from 'react';
import Header from 'components/Game/Header/Header';
import Filters from 'components/Game/Filters/Filters';
import Content from 'components/Game/Content/Content';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import Loader from 'components/UI/loaders/Loader/Loader';
import ErrorLoader from 'components/UI/loaders/ErrorLoader/ErrorLoader';
import useGameFetch from 'hooks/useGameFetch';
import { resetData, setCurrentTab as setCurrentSubTab, setIsFullscreen } from 'redux/gameReducer';
import { useParams, useSearchParams } from 'react-router-dom';
import { getSearchParam, setSearchParam } from 'utils';
import { setMobileWidth } from 'redux/sharedReducer';

const Game = () => {
  const tab = getSearchParam('tab');
  const defaultTab = ['box', 'videos', 'pitch', 'hitting', 'running', 'plays'].includes(tab) ? tab : 'pitch';

  const [currentTab, setCurrentTab] = useState(defaultTab);
  const { gameId } = useParams();
  const [searchParams] = useSearchParams();

  const innings = useSelector(state => state.game.innings, shallowEqual);
  const errorMsg = useSelector(state => state.game.errorMsg, shallowEqual);

  const dispatch = useDispatch();

  const [error, isLoading, loadedPercents, getFullData] = useGameFetch(
    `http://baseball-gametrack.ru/api/game_${gameId}`
  );

  useEffect(() => {
    dispatch(getFullData(true));
    dispatch(setCurrentSubTab(searchParams.get('tab')));

    const resizeHandle = () => {
      dispatch(setMobileWidth(window.innerWidth));
    };

    const toggleFullscreen = ({ matches }) => dispatch(setIsFullscreen(matches ? true : false));

    resizeHandle();
    window.addEventListener('resize', resizeHandle);

    window.matchMedia('(display-mode: fullscreen)').addEventListener('change', toggleFullscreen);

    return () => {
      dispatch(resetData());
      window.removeEventListener('resize', resizeHandle);
      window.matchMedia('(display-mode: fullscreen)').removeEventListener('change', toggleFullscreen);
    };

    // eslint-disable-next-line
  }, []);

  const handleTabClick = e => {
    const tabText = e.target ? e.target.name : e.toLowerCase();
    const resultTabText = tabText === 'hit' ? 'hitting' : tabText === 'run' ? 'running' : tabText;

    setSearchParam('tab', resultTabText);
    setCurrentTab(resultTabText);

    dispatch(setCurrentSubTab(resultTabText));
  };

  const isFilters = currentTab !== 'box';

  // Error handling render
  if (errorMsg !== null && innings.length === 0) return <ErrorLoader error={error} />;

  // Loading render
  if (isLoading) return <Loader loadedPercents={loadedPercents} />;

  // Empty innings render
  if (innings.length === 0) return <></>;

  // Main render
  return (
    <>
      <Header currentTab={currentTab} handleTabClick={handleTabClick} />
      {isFilters && <Filters />}
      <Content currentTab={currentTab} />
    </>
  );
};

export default Game;

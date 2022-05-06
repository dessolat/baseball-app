import React, { useState, useEffect } from 'react';
import Header from 'components/Game/Header/Header';
import Filters from 'components/Game/Filters/Filters';
import Content from 'components/Game/Content/Content';
import { useSelector, useDispatch } from 'react-redux';
import Loader from 'components/UI/loaders/Loader/Loader';
import ErrorLoader from 'components/UI/loaders/ErrorLoader/ErrorLoader';
import useGameFetch from 'hooks/useGameFetch';
// import GameIdForm from 'components/Game/GameIdForm/GameIdForm';
import { setCurrentCard, setSituationFilter, setCurrentGameId, resetData } from 'redux/gameReducer';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getSearchParam, setSearchParam } from 'utils';
import { setMobileWidth } from 'redux/sharedReducer';
// import Skeleton from 'components/Game/Skeleton/Skeleton';

const Game = () => {
  const tab = getSearchParam('tab');
  const defaultTab = ['box', 'plays', 'videos'].includes(tab) ? tab : 'plays';
  const [currentTab, setCurrentTab] = useState(defaultTab);
  const { gameId } = useParams();
  const navigate = useNavigate();
  const innings = useSelector(state => state.game.innings);
  const currentGameId = useSelector(state => state.game.currentGameId);
  const dispatch = useDispatch();
  const [error, isLoading, cancelTokenRef, intervalRef, getFullData] = useGameFetch(
    `http://51.250.71.224:3030/game_${gameId}`
  );

  useEffect(() => {
    axios
      .get(`http://51.250.71.224:3030/game_${gameId}`, {
        timeout: 7000
      })
      .then(() => {
        dispatch(getFullData(true));
        dispatch(setCurrentGameId(gameId));
      })
      .catch(() => {
        dispatch(setCurrentGameId(gameId));
        navigate('/games');
      });

    const resizeHandle = () => {
      dispatch(setMobileWidth(window.innerWidth))
    };

		resizeHandle()
    window.addEventListener('resize', resizeHandle);

    return () => {
      // eslint-disable-next-line
      typeof cancelTokenRef.current != 'undefined' && cancelTokenRef.current.cancel(null);
      // eslint-disable-next-line
      clearInterval(intervalRef.current);
      dispatch(resetData());
			window.removeEventListener('resize', resizeHandle)
      // dispatch(setCurrentCard({}));
      // dispatch(setCurrentGameId(null));
      // dispatch(setSituationFilter('All'));
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (currentGameId === null) return;

    typeof cancelTokenRef.current != 'undefined' && cancelTokenRef.current.cancel(null);
    dispatch(setCurrentCard({}));
    dispatch(setCurrentGameId(gameId));
    dispatch(setSituationFilter('All'));
    clearInterval(intervalRef.current);
    dispatch(getFullData(true, 'http://51.250.71.224:3030/game_' + gameId));
    // eslint-disable-next-line
  }, [gameId]);

  const handleTabClick = e => {
    setSearchParam('tab', e.target ? e.target.name : e.toLowerCase());
    setCurrentTab(e.target ? e.target.name : e.toLowerCase());
  };

  const isFilters = currentTab !== 'box';
  return (
    <>
      {/* <GameIdForm isLoading={isLoading} /> */}
      {error ? (
        <ErrorLoader error={error} />
      ) : isLoading ? (
        <Loader />
      ) : // <Skeleton />
      innings.length > 0 ? (
        <div>
          <Header currentTab={currentTab} handleTabClick={handleTabClick} />
          {isFilters && <Filters />}
          <Content currentTab={currentTab} />
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Game;

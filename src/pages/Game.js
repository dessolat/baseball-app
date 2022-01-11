import React, { useState, useEffect } from 'react';
import Header from 'components/Game/Header/Header';
import Filters from 'components/Game/Filters/Filters';
import Content from 'components/Game/Content/Content';
import { useSelector, useDispatch } from 'react-redux';
import Loader from 'components/UI/loaders/Loader/Loader';
import ErrorLoader from 'components/UI/loaders/ErrorLoader/ErrorLoader';
import useGameFetch from 'hooks/useGameFetch';
import GameIdForm from 'components/Game/GameIdForm/GameIdForm';
import { setCurrentCard, setSituationFilter, setCurrentGameId } from 'redux/gameReducer';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getSearchParam, setSearchParam } from 'utils';
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
    `http://51.250.11.151:3030/game_${gameId}`
  );

  useEffect(() => {
    axios
      .get(`http://51.250.11.151:3030/game_${gameId}`, {
        timeout: 5000
      })
      .then(() => {
        dispatch(getFullData(true));
        dispatch(setCurrentGameId(gameId));
      })
      .catch(() => {
        dispatch(setCurrentGameId(gameId));
        navigate('/game/359');
      });

    return () => {
      // eslint-disable-next-line
      clearInterval(intervalRef.current);
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
    dispatch(getFullData(true, 'http://51.250.11.151:3030/game_' + gameId));
    // eslint-disable-next-line
  }, [gameId]);

  const handleTabClick = e => {
    setSearchParam('tab', e.target.name);
    setCurrentTab(e.target.name);
  };

  return (
    <>
      <GameIdForm isLoading={isLoading} />
      {error ? (
        <ErrorLoader error={error} />
      ) : isLoading ? (
        <Loader />
      ) : // <Skeleton />
      innings.length > 0 ? (
        <>
          <Header currentTab={currentTab} handleTabClick={handleTabClick} />
          <Filters />
          <Content currentTab={currentTab} />
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default Game;

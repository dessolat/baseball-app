import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Header from 'components/Game/Header/Header';
import Filters from 'components/Game/Filters/Filters';
import Content from 'components/Game/Content/Content';
import { useSelector, useDispatch } from 'react-redux';
import { setFullData } from 'redux/gameReducer';
import Loader from 'components/UI/loaders/Loader/Loader';
import ErrorLoader from 'components/UI/loaders/ErrorLoader/ErrorLoader';

const Game = () => {
  const [situations, setSituations] = useState(['All']);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const innings = useSelector(state => state.game.innings);
  const preview = useSelector(state => state.game.preview);
  const dispatch = useDispatch();
  const ref = useRef();

  useEffect(() => {
    const getFullData = async () => {
      try {
        const resp = await axios.get('http://84.201.172.216:3030/game_280');
        dispatch(setFullData(resp.data));
      } catch (err) {
        setError(err.message);
      }
    };

    setIsLoading(true);

    axios
      .get('http://84.201.172.216:3030/game_280')
      .then(resp => {
        dispatch(setFullData(resp.data));
      })
      .catch(err => setError(err.message))
      .finally(() => {
        setIsLoading(false);
        ref.current = setInterval(getFullData, 4000);
      });

    return () => {
      clearInterval(ref.current);
    };
  }, []);

  useEffect(() => {
    error && setError(null);
  }, [innings, preview]);

  return (
    <>
      {error ? (
        <ErrorLoader error={error} />
      ) : isLoading ? (
        <Loader />
      ) : innings.length > 0 ? (
        <>
          <Header />
          <Filters situations={situations} />
          <Content setSituations={setSituations} />
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default Game;

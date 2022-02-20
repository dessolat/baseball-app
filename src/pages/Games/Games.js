import React, { useState, useEffect, useRef } from 'react';
// import cl from './Games.module.scss';
import axios from 'axios';
import Content from 'components/Games/Content/Content';
import Header from 'components/Games/Header/Header';
// import Loader from 'components/UI/loaders/Loader/Loader';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentLeague } from 'redux/gamesReducer';

const LEAGUES = [
  { id: 1, name: 'All' },
  { id: 2, name: 'Pervenstvo Russian Unior (19 years)' },
  { id: 3, name: 'Russian championship' },
  { id: 4, name: 'Russian championship' },
  { id: 5, name: 'Russian championship' },
  { id: 6, name: 'Russian championship' },
  { id: 7, name: 'Russian championship' },
  { id: 8, name: 'Russian championship' },
  { id: 9, name: 'Russian championship' }
];

const Games = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [gamesData, setGamesData] = useState(null);

  const cancelTokenRef = useRef();

  const currentYear = useSelector(state => state.games.currentYear);
	const dispatch = useDispatch()

  useEffect(() => {
    const fetchGamesData = async () => {
      cancelTokenRef.current = axios.CancelToken.source();

      try {
        setIsLoading(true);
        const response = await axios.get(`http://51.250.11.151:3030/main/year-${currentYear}`, {
          cancelToken: cancelTokenRef.current.token
        });
        console.log(response.data);
        setGamesData(response.data);
				dispatch(setCurrentLeague({id: -1, name: 'All'}))
      } catch (err) {
        err.message !== null && console.log(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchGamesData();

    return () => {
      cancelTokenRef.current.cancel(null);
    };
  }, [currentYear]);

  return (
    <>
      {/* {isLoading ? (
        <Loader />
      ) :  */}
			{gamesData === null ? (
        <></>
      ) : (
        <>
          <Header leagues={gamesData.leagues} />
          <Content />
        </>
      )}
    </>
  );
};

export default Games;

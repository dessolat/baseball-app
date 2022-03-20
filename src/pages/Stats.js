import React, { useState, useEffect, useRef } from 'react';
import ErrorLoader from 'components/UI/loaders/ErrorLoader/ErrorLoader';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setCurrentLeague } from 'redux/sharedReducer';
import axios from 'axios';
import Header from 'components/Stats/Header/Header';
import Content from 'components/Stats/Content/Content';
import { setStatsData } from 'redux/statsReducer';
import Loader from 'components/UI/loaders/Loader/Loader';

const Stats = () => {
  const [isStatsLoading, setIsStatsLoading] = useState(false);
  const [error, setError] = useState('');

  const firstMountRef = useRef(true);
  const cancelStatsTokenRef = useRef();

  const statsData = useSelector(state => state.stats.statsData);
  const currentYear = useSelector(state => state.shared.currentYear);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchStats = async () => {
      cancelStatsTokenRef.current = axios.CancelToken.source();

      try {
        setIsStatsLoading(true);
        const response = await axios.get(`http://51.250.11.151:3030/stats/year-${currentYear}`, {
          cancelToken: cancelStatsTokenRef.current.token,
          timeout: 5000
        });
        console.log(response.data);
        setError('');
        dispatch(setStatsData(response.data));
      } catch (err) {
        if (err.message === null) return;
        console.log(err.message);
        setError(err.message);
      } finally {
        setIsStatsLoading(false);
      }
    };
    fetchStats();

    // if (firstMountRef.current === true) {
    //   firstMountRef.current = false;
    //   return;
    // }

    dispatch(setCurrentLeague({ id: -1, name: 'All' }));

    return () => {
      cancelStatsTokenRef.current.cancel(null);
    };
    // eslint-disable-next-line
  }, [currentYear]);
  // useEffect(() => {
  //   const fetchGamesData = async () => {
  //     cancelTokenRef.current = axios.CancelToken.source();

  //     try {
  //       setIsLoading(true);
  //       const response = await axios.get(`http://51.250.11.151:3030/main/year-${currentYear}`, {
  //         cancelToken: cancelTokenRef.current.token,
  //         timeout: 5000
  //       });
  //       console.log(response.data);
  //       setError('');
  //       dispatch(setGamesAndLeagues(response.data));

  //       if (games === null) {
  //         console.log('dispatched after fetching');
  //         dispatch(setCurrentLeague({ id: -1, name: 'All' }));
  //       }
  //     } catch (err) {
  //       if (err.message === null) return;
  //       console.log(err.message);
  //       setError(err.message);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };
  //   fetchGamesData();

  //   if (firstMountRef.current === true) {
  //     firstMountRef.current = false;
  //     return;
  //   }

  //   dispatch(setCurrentLeague({ id: -1, name: 'All' }));

  //   return () => {
  //     cancelTokenRef.current.cancel(null);
  //   };
  // 	// eslint-disable-next-line
  // }, [currentYear]);

  return (
    <>
      {error !== '' ? (
        <ErrorLoader error={error} />
      ) : isStatsLoading && statsData.length === 0 ? (
        <Loader />
      ) : (
        <>
          <Header />
          <Content />
        </>
      )}
    </>
  );
};

export default Stats;

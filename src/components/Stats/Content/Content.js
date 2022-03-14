import React, { useState, useEffect, useRef } from 'react';
import cl from './Content.module.scss';
import { useParams } from 'react-router-dom';
import ContentTeamTable from '../ContentTeamTable/ContentTeamTable';
import ContentPlayerTable from '../ContentPlayerTable/ContentPlayerTable';
import { useDispatch, useSelector } from 'react-redux';
import ErrorLoader from 'components/UI/loaders/ErrorLoader/ErrorLoader';
import Loader from 'components/UI/loaders/Loader/Loader';
import axios from 'axios';
import { setStatsData } from 'redux/statsReducer';

const Content = ({ games }) => {
  const [isStatsLoading, setIsStatsLoading] = useState(false);
  const [error, setError] = useState('');

  const { statsType } = useParams();

  const cancelStatsTokenRef = useRef();

  const currentYear = useSelector(state => state.shared.currentYear);
  const statsData = useSelector(state => state.stats.statsData);
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

    return () => {
      cancelStatsTokenRef.current.cancel(null);
    };
    // eslint-disable-next-line
  }, [currentYear]);

  return (
    <section>
      <div className='container'>
        <div className={cl.content}>
          {error !== '' ? (
            <ErrorLoader />
          ) : isStatsLoading ? (
            <Loader />
          ) : statsData.length === 0 ? (
            <></>
          ) : statsType !== 'player' ? (
            <ContentTeamTable />
          ) : (
            <ContentPlayerTable />
          )}
        </div>
      </div>
    </section>
  );
};

export default Content;

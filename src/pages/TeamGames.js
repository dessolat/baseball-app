import React, { useState, useEffect, useRef } from 'react';
import ErrorLoader from 'components/UI/loaders/ErrorLoader/ErrorLoader';
import Header from 'components/TeamGames/Header/Header';
import Content from 'components/TeamGames/Content/Content';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setTeamData } from 'redux/teamGamesReducer';
import { useParams } from 'react-router-dom';
import Loader from 'components/UI/loaders/Loader/Loader';

const TeamGames = () => {
  const [isTeamLoading, setIsTeamLoading] = useState(false);
  const [error, setError] = useState('');

  const { teamName } = useParams();

  const teamData = useSelector(state => state.teamGames.teamData);
  const dispatch = useDispatch();

  const cancelTeamTokenRef = useRef();

  useEffect(() => {
    const fetchGamesData = async () => {
      cancelTeamTokenRef.current = axios.CancelToken.source();

      try {
        setIsTeamLoading(true);
        const response = await axios.get(`http://51.250.11.151:3030/team/${teamName}`, {
          cancelToken: cancelTeamTokenRef.current.token,
          timeout: 5000
        });
        console.log(response.data);
        setError('');
        dispatch(setTeamData(response.data));
      } catch (err) {
        if (err.message === null) return;
        console.log(err.message);
        setError(err.message);
      } finally {
        setIsTeamLoading(false);
      }
    };
    fetchGamesData();

    return () => {
      cancelTeamTokenRef.current.cancel(null);
    };
    // eslint-disable-next-line
  }, [teamName]);

  return (
    <>
      {error !== '' ? (
        <ErrorLoader error={error} />
      ) : isTeamLoading && teamData.length === 0 ? (
        <Loader />
      ) : teamData.length === 0 ? (
        <></>
      ) : (
        <>
          <Header />
          <Content />
        </>
      )}
    </>
  );
};

export default TeamGames;

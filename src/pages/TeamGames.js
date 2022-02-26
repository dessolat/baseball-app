import React, { useState } from 'react';
import ErrorLoader from 'components/UI/loaders/ErrorLoader/ErrorLoader';
import { useSelector } from 'react-redux';

const TeamGames = () => {
  const [error, setError] = useState('');

	const games = useSelector(state => state.games.games);
  return (
    <>
      {/* {isLoading ? (
        <Loader />
      ) :  */}
      {error && games === null ? (
        <ErrorLoader error={error} />
      ) : games === null ? (
        <></>
      ) : (
        <>
          {/* <Header /> */}
          {/* <Content games={games} /> */}
        </>
      )}
    </>
  );
};

export default TeamGames;

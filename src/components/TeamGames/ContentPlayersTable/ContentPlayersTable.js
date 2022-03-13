import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import cl from './ContentPlayersTable.module.scss';
import axios from 'axios';
import { setTeamData } from 'redux/teamGamesReducer';
import ErrorLoader from 'components/UI/loaders/ErrorLoader/ErrorLoader';
import Loader from 'components/UI/loaders/Loader/Loader';

const ContentPlayersTable = () => {
  const teamData = useSelector(state => state.teamGames.teamData);
  const currentYear = useSelector(state => state.shared.currentYear);
  const currentLeague = useSelector(state => state.shared.currentLeague);
  const dispatch = useDispatch();

  const [isTeamLoading, setIsTeamLoading] = useState(false);
  const [error, setError] = useState('');
  const { teamName } = useParams();
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

  const PLAYERS_DATA =
    currentLeague.id !== -1
      ? teamData.find(item => item.league.id === currentLeague.id)?.roster
      : teamData.reduce((sum, cur) => {
          if (cur.league.year === currentYear) {
            cur.roster.forEach(
              curPlayer =>
                !sum.find(
                  sumPlayer => sumPlayer.surname === curPlayer.surname && sumPlayer.name === curPlayer.name
                ) && sum.push(curPlayer)
            );
          }
          return sum;
        }, []);

  return (
    <div className={cl.wrapper}>
      {error ? (
        <ErrorLoader error={error} styles={{ marginTop: 0 }} />
      ) : isTeamLoading ? (
        <div style={{ height: '100px', display: 'grid', placeItems: 'center' }}>
          <Loader styles={{margin: 0}} />
        </div>
      ) : (
        <>
          <div className={cl.table}>
            <div className={cl.tableHeader}>
              <div>#</div>
              <div>Player</div>
              <div>POS</div>
              <div>B/T</div>
              <div>HT</div>
              <div>WT</div>
              <div>YOB</div>
            </div>
            <ul className={cl.rows}>
              {PLAYERS_DATA.map((player, index) => (
                <li key={index} className={cl.tableRow}>
                  <div>{index + 1}</div>
                  <div className={cl.underlineHover}>
                    <Link to={`/stats/player/${player.name}/${player.surname}`}>
                      {player.name + ' ' + player.surname}
                    </Link>
                  </div>
                  <div>{player.pos ?? '—'}</div>
                  <div>
                    {player.bat_hand}/{player.throw_hand}
                  </div>
                  <div>{player.height}</div>
                  <div>{player.weight}</div>
                  <div>{player.yob}</div>
                </li>
              ))}
            </ul>
          </div>
          <div className={cl.linkWrapper}>
            <Link to='/stats/player'>Go to Player Stat</Link>
          </div>
        </>
      )}
    </div>
  );
};

export default ContentPlayersTable;

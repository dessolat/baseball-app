import React, { useMemo } from 'react';
import cl from './ContentGamesTable.module.scss';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getShortName } from 'utils';

const MONTHS = {
  '01': 'jan',
  '02': 'feb',
  '03': 'mar',
  '04': 'apr',
  '05': 'may',
  '06': 'jun',
  '07': 'jul',
  '08': 'aug',
  '09': 'sep',
  10: 'oct',
  11: 'nov',
  12: 'dec'
};

const ContentGamesTable = () => {
  const { teamName } = useParams();

  const currentLeague = useSelector(state => state.shared.currentLeague);
  const currentYear = useSelector(state => state.shared.currentYear);
  const teamData = useSelector(state => state.teamGames.teamData);

  //Filtering teamData leagues by current year
  const currentYearLeagues = useMemo(
    () => teamData.filter(curLeague => curLeague.league.year === currentYear),
    [teamData, currentYear]
  );

  //Games summary by currentLeague
  const gamesArray = useMemo(
    () =>
      currentLeague.id === -1
        ? currentYearLeagues.reduce((sum, curLeague) => {
            curLeague.games.forEach(game => sum.push(game));
            return sum;
          }, [])
        : currentYearLeagues.find(curLeague => curLeague.league.id === currentLeague.id).games,
    [currentYearLeagues, currentLeague]
  );

  //Games filtering
  // let filteredData = useMemo(
  //   () =>
  //     teamData.filter(
  //       game =>
  //         (currentLeague.id !== -1 ? game.league_id === currentLeague.id : true) &&
  //         (game.owners_name === teamName || game.guests_name === teamName)
  //     ),
  //   // eslint-disable-next-line
  //   [teamData, currentLeague, teamName]
  // );

  //Games sorting
  const sortedGamesArray = useMemo(() => gamesArray.sort((a, b) => (a.date > b.date ? 1 : -1)), [gamesArray]);
  return (
    <div className={cl.wrapper}>
      <div className={cl.table}>
        <div className={cl.tableHeader}>
          <div>Data</div>
          <div>Home</div>
          <div> </div>
          <div>Guests</div>
          <div> </div>
          <div>Inn</div>
        </div>
        <ul className={cl.rows}>
          {sortedGamesArray.map((game, index) => (
            <li key={game.id} className={cl.tableRow}>
              <div>{game.date.slice(8, 10) + ' ' + MONTHS[game.date.slice(5, 7)]}</div>
              <div className={cl.underlineHover}>
                <Link to={`/games/team/${game.homies.name}`}> {getShortName(game.homies.name, 22)}</Link>
              </div>
              <div>
                {game.homies.score} - {game.visitors.score}
              </div>
              <div className={cl.underlineHover}>
                <Link to={`/games/team/${game.visitors.name}`}> {getShortName(game.visitors.name, 22)}</Link>
              </div>
              <div className={cl.links}>
                <div>
                  <Link to={`/game/${game.id}?tab=box`}>Box</Link>
                  <Link to={`/game/${game.id}?tab=plays`}>Plays</Link>
                  {game.has_records && <Link to={`/game/${game.id}?tab=videos`}>Videos</Link>}
                </div>
              </div>
              <div>{game.inn !== null ? `${game.last_inn} inn` : '—'} </div>
            </li>
          ))}
        </ul>
      </div>
      <div className={cl.linkWrapper}>
        <Link to='/stats/team'>Go to Team Stat</Link>
      </div>
    </div>
  );
};

export default ContentGamesTable;

import { useSelector } from 'react-redux';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { getShortName } from 'utils';
import cl from '../ContentSideTables.module.scss';

const REPLACES = { 'FLD%': 'FLD', '%SB': 'SB_pr' };

const TableBody = ({ tableMode, dropdownValue }) => {
  const currentGameType = useSelector(state => state.shared.currentGameType);
  const players = useSelector(state => state.games.players);
  const currentLeague = useSelector(state => state.games.currentLeague);

  const league = players.find(
    curLeague => curLeague.title === currentLeague.title || curLeague.title === currentLeague.name
  );

  const sortedPlayers = useMemo(() => {
    if (league) {
      const sortField = REPLACES[dropdownValue[tableMode]] || dropdownValue[tableMode];
      return league.players[tableMode].toSorted((a, b) => (a[sortField] > b[sortField] ? -1 : 1)).slice(0, 5);
    }

    return [];
  }, [league, tableMode, dropdownValue]);

  const isToFixed = ['AVG', 'SLG', 'OBP', 'OPS', 'ERA', '%SB', 'FLD%'].includes(dropdownValue[tableMode]);
  return (
    <div className={cl.tableBody}>
      {sortedPlayers.map(row => {
        const teams = row.teams.map((team, i, arr) => {
          if (i !== 0)
            return (
              <>
                /
                <Link key={i} to={`/games/team/${currentGameType.toLowerCase()}/${team.name}`}>
                  {getShortName(team.name, arr.length > 1 ? 3 : 6)}
                </Link>
              </>
            );
          return (
            <Link key={i} to={`/games/team/${currentGameType.toLowerCase()}/${team.name}`}>
              {getShortName(team.name, arr.length > 1 ? 3 : 6)}
            </Link>
          );
        });

        return (
          <div key={row.id} className={cl.tableRow}>
            <div className={cl.underlineHover}>
              <Link to={`/stats/player/${row.id}`}>
                {row.surname} {row.name}
              </Link>
            </div>
            <div>
              <div>{teams}</div>
              <div>
                {REPLACES[dropdownValue[tableMode]]
                  ? !isToFixed
                    ? row[REPLACES[dropdownValue[tableMode]]]
                    : row[REPLACES[dropdownValue[tableMode]]].toFixed(3)
                  : !isToFixed
                  ? row[dropdownValue[tableMode]]
                  : row[dropdownValue[tableMode]].toFixed(3)}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TableBody;

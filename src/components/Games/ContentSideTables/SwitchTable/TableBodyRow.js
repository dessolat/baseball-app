import cl from '../ContentSideTables.module.scss';
import { Link } from 'react-router-dom';
import { getShortName } from 'utils';

const TableBodyRow = ({ row, tableMode, dropdownValue, REPLACES, currentGameType, isToFixed }) => {
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
    <div className={cl.tableRow}>
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
};

export default TableBodyRow;

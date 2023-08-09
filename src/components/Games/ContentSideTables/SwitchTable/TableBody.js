import { useSelector } from 'react-redux';
import { useMemo } from 'react';
import cl from '../ContentSideTables.module.scss';
import TableBodyRow from './TableBodyRow';

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
      {sortedPlayers.map(row => (
        <TableBodyRow
          key={row.id}
					row={row}
          tableMode={tableMode}
          dropdownValue={dropdownValue}
          REPLACES={REPLACES}
          currentGameType={currentGameType}
					isToFixed={isToFixed}
        />
      ))}
    </div>
  );
};

export default TableBody;

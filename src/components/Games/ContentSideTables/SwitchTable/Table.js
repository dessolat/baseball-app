import { useSelector } from 'react-redux';
import cl from '../ContentSideTables.module.scss';
import TableHeader from './TableHeader';
import TableBody from './TableBody';

const Table = ({ tableMode }) => {
  const dropdownValue = useSelector(state => state.games.currentSwitchDropdownValue);

  return (
    <div className={cl.switchTable}>
      <TableHeader tableMode={tableMode} dropdownValue={dropdownValue} />
      <TableBody tableMode={tableMode} dropdownValue={dropdownValue} />
    </div>
  );
};

export default Table;

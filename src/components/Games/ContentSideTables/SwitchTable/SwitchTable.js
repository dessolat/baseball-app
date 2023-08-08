import cl from '../ContentSideTables.module.scss';
import { useSelector } from 'react-redux';
import Header from './Header';
import Table from './Table';

const SwitchTable = () => {
  const tableMode = useSelector(state => state.games.currentSwitchTableMode);
  
  return (
    <div className={cl.switchWrapper}>
      <Header tableMode={tableMode} />
      <Table tableMode={tableMode} />
    </div>
  );
};

export default SwitchTable;

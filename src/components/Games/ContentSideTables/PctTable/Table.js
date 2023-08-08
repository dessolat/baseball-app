import cl from '../ContentSideTables.module.scss';
import TableBody from './TableBody';
import TableHeader from './TableHeader';

const Table = () => {
  
  return (
    <div className={cl.pctTable}>
      <TableHeader />
      <TableBody />
    </div>
  );
};

export default Table;

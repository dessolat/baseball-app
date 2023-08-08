import cl from '../ContentSideTables.module.scss';

const TableHeader = () => {
  return (
    <div className={cl.tableHeader}>
      <div>Team</div>
      <div>
        <div>W</div>
        <div>L</div>
        <div>PCT</div>
      </div>
    </div>
  );
};

export default TableHeader;

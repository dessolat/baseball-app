import cl from '../ContentSideTables.module.scss';
import Header from './Header';
import Table from './Table';

const PctTable = () => (
  <div className={cl.pctWrapper}>
    <Header />
    <Table />
  </div>
);

export default PctTable;

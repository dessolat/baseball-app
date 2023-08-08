import { Link } from 'react-router-dom';
import cl from '../ContentSideTables.module.scss';

const Header = () => {
  return (
    <div className={cl.header}>
      <Link to='/stats/team'>Go to Team Stat</Link>
    </div>
  );
};

export default Header;

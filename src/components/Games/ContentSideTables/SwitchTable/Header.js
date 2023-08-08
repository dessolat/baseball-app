import cl from '../ContentSideTables.module.scss';
import { setCurrentSwitchTableMode } from 'redux/gamesReducer';
import Dropdown from 'components/UI/dropdown/GamesDropdown/Dropdown';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

const Header = ({ tableMode }) => {
  const dispatch = useDispatch();

  const handleTableModeClick = mode => dispatch(setCurrentSwitchTableMode(mode.toLowerCase()));
  const tableModeValue = tableMode[0].toUpperCase() + tableMode.slice(1);

  return (
    <div className={cl.header}>
      <div className={cl.drop}>
        <Dropdown
          title={tableModeValue}
          options={['Batting', 'Fielding', 'Running', 'Pitching']}
          currentOption={tableModeValue}
          handleClick={handleTableModeClick}
          listWrapperClass={cl.mobileTablemodeDropdownClass}
          listStyles={{ left: '-1rem', width: 'calc(100% + 1rem)' }}
        />
      </div>
      <Link to='/stats/player'>Go to Player Stat</Link>
    </div>
  );
};

export default Header;

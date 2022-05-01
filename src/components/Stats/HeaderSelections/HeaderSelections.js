import React from 'react';
import cl from './HeaderSelections.module.scss';
import Dropdown from 'components/UI/dropdown/GamesDropdown/Dropdown';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentYear, setCurrentDate, setCurrentGameType } from 'redux/sharedReducer';
import { Link, useParams } from 'react-router-dom';
import { setTableMode } from 'redux/statsReducer';

const YEARS = [2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014];
const TABLE_MODES = ['Batting', 'Fielding / Running', 'Pitching'];

const HeaderSelections = () => {
  const { statsType } = useParams();

  const currentYear = useSelector(state => state.shared.currentYear);
  const currentGameType = useSelector(state => state.shared.currentGameType);
  const tableMode = useSelector(state => state.stats.tableMode);
  const dispatch = useDispatch();

  const handleClick = option => {
    const tempDate = new Date(option, 0, 1);
    tempDate.setHours(0, tempDate.getTimezoneOffset() * -1, 0, 0);

    dispatch(setCurrentDate(tempDate));
    dispatch(setCurrentYear(option));
  };

  const getClassName = name =>
    name === statsType || (name === 'player' && statsType !== 'team') ? cl.active : '';

  const handleModeClick = mode => dispatch(setTableMode(mode));
  const handleGameTypeClick = gameType => dispatch(setCurrentGameType(gameType));
  return (
    <div className={cl.selections}>
      <div className={cl.types}>
        <Link to={'/stats/player'} className={getClassName('player')}>
          Player
        </Link>
        <Link to={'/stats/team'} className={getClassName('team')}>
          Team
        </Link>
				<div className={cl.gameTypes}>
          <Dropdown
            title={currentGameType}
            options={['Baseball', 'Softball']}
            currentOption={currentGameType}
            handleClick={handleGameTypeClick}
            listStyles={{ marginLeft: '-.75rem', width: '115%' }}
            itemStyles={{ padding: '.3rem 0', textAlign: 'center' }}
          />
        </div>
      </div>
      <div className={cl.bottom}>
        <div className={cl.batting}>
          <Dropdown
            title={tableMode === 'Fielding / Running' ? 'Fld / Run' : tableMode}
            options={TABLE_MODES}
            currentOption={tableMode}
            handleClick={handleModeClick}
            listStyles={{ marginLeft: '-.75rem', width: '115%' }}
            itemStyles={{ padding: '.3rem 0', textAlign: 'center' }}
          />
        </div>
        <div className={cl.years}>
          <Dropdown
            title={currentYear}
            options={YEARS}
            currentOption={currentYear}
            handleClick={handleClick}
          />
        </div>
      </div>
    </div>
  );
};

export default HeaderSelections;

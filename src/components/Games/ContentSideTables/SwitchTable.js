import React, { useMemo } from 'react';
import cl from './ContentSideTables.module.scss';
import { Link } from 'react-router-dom';
import Dropdown from 'components/UI/dropdown/GamesDropdown/Dropdown';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentSwitchDropdownValue, setCurrentSwitchTableMode } from 'redux/gamesReducer';
import { getShortName } from 'utils';

const DROPDOWN_VALUES = {
  batting: [
    'AB',
    'R',
    'H',
    '2B',
    '3B',
    'HR',
    'RBI',
    'GDP',
    'BB',
    'IBB',
    'HP',
    'SH',
    'SF',
    'SO',
    'TB',
    'AVG',
    'SLG',
    'OBP',
    'OPS'
  ],
  running: ['SB', 'CS', '%SB', 'LOB'],
  fielding: ['CH', 'PO', 'A', 'E', 'DP', 'FLD%'],
  pitching: [
    'IP',
    'PA',
    'R',
    'ER',
    'H',
    '2B',
    '3B',
    'HR',
    'BB',
    'IBB',
    'HP',
    'SH',
    'SF',
    'SO',
    'WP',
    'BK',
    'ERA',
    'NP',
    'NS',
    'NB'
  ]
};

const REPLACES = { 'FLD%': 'FLD', '%SB': 'SB_pr' };

const SwitchTable = () => {
  const players = useSelector(state => state.games.players);
  const currentLeague = useSelector(state => state.games.currentLeague);
  const tableMode = useSelector(state => state.games.currentSwitchTableMode);
  const dropdownValue = useSelector(state => state.games.currentSwitchDropdownValue);
  const currentGameType = useSelector(state => state.shared.currentGameType);

  const dispatch = useDispatch();

  const handleTableModeClick = mode => dispatch(setCurrentSwitchTableMode(mode.toLowerCase()));
  const handleDropdownClick = value => dispatch(setCurrentSwitchDropdownValue(value));

  const tableModeValue = tableMode[0].toUpperCase() + tableMode.slice(1);

  const league = players.find(
    curLeague => curLeague.title === currentLeague.title || curLeague.title === currentLeague.name
  );

  const sortedPlayers = useMemo(() => {
    if (league) {
      const sortField = REPLACES[dropdownValue[tableMode]] || dropdownValue[tableMode];
      return league.players[tableMode]
        .slice()
        .sort((a, b) => (a[sortField] > b[sortField] ? -1 : 1))
        .slice(0, 5);
    }

    return [];
  }, [league, tableMode, dropdownValue]);

  return (
    <div className={cl.switchWrapper}>
      <div className={cl.header}>
        <div className={cl.drop}>
          <Dropdown
            title={tableModeValue}
            options={['Batting', 'Fielding', 'Running', 'Pitching']}
            currentOption={tableModeValue}
            handleClick={handleTableModeClick}
            listStyles={{ left: '-1rem', width: 'calc(100% + 1rem)' }}
          />
        </div>
        <Link to='/stats/player'>Go to Player Stat</Link>
      </div>
      <div className={cl.switchTable}>
        <div className={cl.tableHeader}>
          <div>Name</div>
          <div>
            <div>Team</div>
            <div className={cl.avr}>
              <Dropdown
                title={dropdownValue[tableMode]}
                options={DROPDOWN_VALUES[tableMode]}
                currentOption={dropdownValue[tableMode]}
                handleClick={handleDropdownClick}
                listStyles={{ left: '-4px', width: 'calc(100% + .5rem)' }}
                itemStyles={{ lineHeight: '.7rem', padding: '.2rem .5rem' }}
              />
            </div>
          </div>
        </div>
        <div className={cl.tableBody}>
          {sortedPlayers.map(row => {
            const teams = row.teams.map((team, i, arr) => {
              if (i !== 0)
                return (
                  <>
                    /
                    <Link key={i} to={`/games/team/${currentGameType.toLowerCase()}/${team.name}`}>
                      {getShortName(team.name, arr.length > 1 ? 3 : 7)}
                    </Link>
                  </>
                );
              return (
                <Link key={i} to={`/games/team/${currentGameType.toLowerCase()}/${team.name}`}>
                  {getShortName(team.name, arr.length > 1 ? 3 : 7)}
                </Link>
              );
            });

            return (
              <div key={row.id} className={cl.tableRow}>
                <div className={cl.underlineHover}>
                  <Link to={`/stats/player/${row.id}`}>
                    {row.surname} {row.name}
                  </Link>
                </div>
                <div>
                  <div>{teams}</div>
                  <div>{row[REPLACES[dropdownValue[tableMode]]] || row[dropdownValue[tableMode]]}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SwitchTable;

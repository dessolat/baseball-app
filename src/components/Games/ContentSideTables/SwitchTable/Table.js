import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import Dropdown from 'components/UI/dropdown/GamesDropdown/Dropdown';
import { setCurrentSwitchDropdownValue } from 'redux/gamesReducer';
import { getShortName } from 'utils';
import { useDispatch, useSelector } from 'react-redux';
import cl from '../ContentSideTables.module.scss';

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

const Table = ({ tableMode }) => {
  const players = useSelector(state => state.games.players);
  const currentLeague = useSelector(state => state.games.currentLeague);
  const dropdownValue = useSelector(state => state.games.currentSwitchDropdownValue);
  const currentGameType = useSelector(state => state.shared.currentGameType);

  const dispatch = useDispatch();

  const handleDropdownClick = value => dispatch(setCurrentSwitchDropdownValue(value));

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
              listWrapperClass={cl.mobileValueDropdownClass}
              listStyles={{ left: '-4px', width: 'calc(100% + .5rem)', top: '80%', maxHeight: '30vh' }}
              itemStyles={{ lineHeight: 0, padding: '.1rem .5rem' }}
              itemTextStyles={{ lineHeight: 1.1, display: 'inline-block' }}
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
                    {getShortName(team.name, arr.length > 1 ? 3 : 6)}
                  </Link>
                </>
              );
            return (
              <Link key={i} to={`/games/team/${currentGameType.toLowerCase()}/${team.name}`}>
                {getShortName(team.name, arr.length > 1 ? 3 : 6)}
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
                <div>
                  {REPLACES[dropdownValue[tableMode]]
                    ? !isToFixed
                      ? row[REPLACES[dropdownValue[tableMode]]]
                      : row[REPLACES[dropdownValue[tableMode]]].toFixed(3)
                    : !isToFixed
                    ? row[dropdownValue[tableMode]]
                    : row[dropdownValue[tableMode]].toFixed(3)}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Table;

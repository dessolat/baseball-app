import Dropdown from 'components/UI/dropdown/GamesDropdown/Dropdown';
import cl from '../ContentSideTables.module.scss';
import { setCurrentSwitchDropdownValue } from 'redux/gamesReducer';
import { useDispatch } from 'react-redux';

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

const TableHeader = ({ tableMode, dropdownValue }) => {
  const dispatch = useDispatch();

  const handleDropdownClick = value => dispatch(setCurrentSwitchDropdownValue(value));

  return (
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
  );
};

export default TableHeader;

import Dropdown from 'components/UI/dropdown/GamesDropdown/Dropdown';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setCurrentGuests, setCurrentHome, setCurrentStadium } from 'redux/gamesReducer';
import cl from './ContentTable.module.scss';
import ContentTableHeader from './ContentTableHeader';

const ROWS_DATA = [
  {
    id: 260,
    time: '08:00',
    stadium: 'Russtar Arena',
    home: 'Moskvich',
    score: '6 : 4',
    guests: 'RusStar-Yuth',
    isVideo: false,
    inn: 9
  },
  {
    id: 277,
    time: '09:00',
    stadium: 'Russtar Arena',
    home: 'RusStar-Yuth',
    score: '5 : 16',
    guests: 'Moskvich',
    isVideo: false,
    inn: 8
  },
  {
    id: 278,
    time: '10:00',
    stadium: 'Russtar Arena',
    home: 'Wolves (SSHOR No. 42)',
    score: '1 : 16',
    guests: 'RusStar',
    isVideo: false,
    inn: 8
  },
  {
    id: 279,
    time: '11:00',
    stadium: 'Russtar Arena',
    home: 'Wolves (SSHOR No. 42)',
    score: '1 : 12',
    guests: 'RusStar',
    isVideo: false,
    inn: 8
  },
  {
    id: 280,
    time: '12:00',
    stadium: 'Russtar Arena',
    home: 'CVS Catawba Valley Stars',
    score: '1 : 8',
    guests: 'RUS RUSSIA',
    isVideo: false,
    inn: 3
  },
  {
    id: 359,
    time: '13:00',
    stadium: 'Russtar Arena',
    home: 'Wolves (SSHOR No. 42)',
    score: '1 : 12',
    guests: 'RusStar',
    isVideo: true,
    inn: 8
  },
  {
    id: 380,
    time: '14:00',
    stadium: 'Russtar Arena',
    home: 'Moskvich',
    score: '6 : 4',
    guests: 'RusStar-Yuth',
    isVideo: false,
    inn: 9
  },
  {
    id: 383,
    time: '15:00',
    stadium: 'Russtar Arena',
    home: 'SPB St. Petersburg National Team',
    score: '6 : 4',
    guests: 'Sharks',
    isVideo: false,
    inn: 1
  }
];

const ContentTable = () => {
  const currentStadium = useSelector(state => state.games.currentStadium);
  const currentHome = useSelector(state => state.games.currentHome);
  const currentGuests = useSelector(state => state.games.currentGuests);
  const dispatch = useDispatch();

  const handleStadiumDropdownClick = option => dispatch(setCurrentStadium(option));
  const handleHomeDropdownClick = option => dispatch(setCurrentHome(option));
  const handleGuestsDropdownClick = option => dispatch(setCurrentGuests(option));

  const stadiumOptions = Array.from(
    new Set(
      ROWS_DATA.reduce(
        (sum, cur) => {
          sum.push(cur.stadium);
          return sum;
        },
        ['All']
      )
    )
  );
  const homeOptions = Array.from(
    new Set(
      ROWS_DATA.reduce(
        (sum, cur) => {
          sum.push(cur.home);
          return sum;
        },
        ['All']
      )
    )
  );
  const guestsOptions = Array.from(
    new Set(
      ROWS_DATA.reduce(
        (sum, cur) => {
          sum.push(cur.guests);
          return sum;
        },
        ['All']
      )
    )
  );

  const filteredData = ROWS_DATA.filter(row => {
    return (
      (currentStadium !== 'All' ? row.stadium === currentStadium : true) &&
      (currentHome !== 'All' ? row.home === currentHome : true) &&
      (currentGuests !== 'All' ? row.guests === currentGuests : true)
    );
  });

  return (
    <div className={cl.wrapper}>
      <ContentTableHeader />

      <table className={cl.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Time</th>
            <th>
              <Dropdown
                title={'Stadium'}
                options={stadiumOptions}
                currentOption={currentStadium}
                handleClick={handleStadiumDropdownClick}
                listStyles={{ left: '-1rem', width: 'calc(100% + 1rem)' }}
              />
            </th>
            <th>
              <Dropdown
                title={'Home'}
                options={homeOptions}
                currentOption={currentHome}
                handleClick={handleHomeDropdownClick}
                listStyles={{ left: '-1rem', width: 'calc(100% + 1rem)' }}
              />
            </th>
            <th> </th>
            <th>
              <Dropdown
                title={'Guests'}
                options={guestsOptions}
                currentOption={currentGuests}
                handleClick={handleGuestsDropdownClick}
                listStyles={{ left: '-1rem', width: 'calc(100% + 1rem)' }}
              />
            </th>
            <th> </th>
            <th>Inn</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map(row => (
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>{row.time}</td>
              <td>{row.stadium}</td>
              <td>{row.home}</td>
              <td>{row.score}</td>
              <td>{row.guests}</td>
              <td className={cl.links}>
                <div>
                  <Link to={`/game/${row.id}?tab=box`}>Box</Link>
                  <Link to={`/game/${row.id}?tab=plays`}>Plays</Link>
                  {row.isVideo && <Link to={`/game/${row.id}?tab=videos`}>Videos</Link>}
                </div>
              </td>
              <td>{row.inn} inn</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContentTable;

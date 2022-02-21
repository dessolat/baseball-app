import Dropdown from 'components/UI/dropdown/GamesDropdown/Dropdown';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setCurrentGuests, setCurrentHome, setCurrentStadium, resetTableFilters } from 'redux/gamesReducer';
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

const ContentTable = ({ games }) => {
  const currentStadium = useSelector(state => state.games.currentStadium);
  const currentLeague = useSelector(state => state.games.currentLeague);
  const currentHome = useSelector(state => state.games.currentHome);
  const currentGuests = useSelector(state => state.games.currentGuests);
  const currentGameType = useSelector(state => state.games.currentGameType);
  const currentYear = useSelector(state => state.games.currentYear);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetTableFilters());
  }, [currentGameType, currentYear, currentLeague]);

  const handleStadiumDropdownClick = option => dispatch(setCurrentStadium(option));
  const handleHomeDropdownClick = option => dispatch(setCurrentHome(option));
  const handleGuestsDropdownClick = option => dispatch(setCurrentGuests(option));

  const filteredHeadings = games.filter(game => {
    return currentLeague.id !== -1 ? game.league_id === currentLeague.id : currentGameType === game.game_type;
  });

  const filteredData = games.filter(game => {
    return (
      (currentStadium !== 'All' ? game.stadium_name === currentStadium : true) &&
      (currentLeague.id !== -1 ? game.league_id === currentLeague.id : currentGameType === game.game_type) &&
      (currentHome !== 'All' ? game.owners_name === currentHome : true) &&
      (currentGuests !== 'All' ? game.guests_name === currentGuests : true)
    );
  });

  const stadiumOptions = Array.from(
    new Set(
      filteredHeadings.reduce(
        (sum, cur) => {
          sum.push(cur.stadium_name);
          return sum;
        },
        ['All']
      )
    )
  );
  const homeOptions = Array.from(
    new Set(
      filteredHeadings.reduce(
        (sum, cur) => {
          sum.push(cur.owners_name);
          return sum;
        },
        ['All']
      )
    )
  );
  const guestsOptions = Array.from(
    new Set(
      filteredHeadings.reduce(
        (sum, cur) => {
          sum.push(cur.guests_name);
          return sum;
        },
        ['All']
      )
    )
  );

  return (
    <div className={cl.wrapper}>
      <ContentTableHeader />

      <table className={cl.table}>
        <thead>
          <tr>
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
          {filteredData.map(game => (
            <tr key={game.id}>
              <td>{game.start_time.slice(0, 8)}</td>
              <td>{game.stadium_name}</td>
              <td>{game.owners_name}</td>
              <td>
                {game.score_owners} - {game.score_guests}
              </td>
              <td>{game.guests_name}</td>
              <td className={cl.links}>
                <div>
                  <Link to={`/game/${game.id}?tab=box`}>Box</Link>
                  <Link to={`/game/${game.id}?tab=plays`}>Plays</Link>
                  {game.hasVideos && <Link to={`/game/${game.id}?tab=videos`}>Videos</Link>}
                </div>
              </td>
              <td>{game.inn} inn</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContentTable;

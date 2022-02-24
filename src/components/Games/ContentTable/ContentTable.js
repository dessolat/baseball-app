import Dropdown from 'components/UI/dropdown/GamesDropdown/Dropdown';
import React, { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setCurrentGuests, setCurrentHome, setCurrentStadium, resetTableFilters } from 'redux/gamesReducer';
import cl from './ContentTable.module.scss';
import ContentTableHeader from './ContentTableHeader';

const MONTHS = {
  '01': 'january',
  '02': 'february',
  '03': 'march',
  '04': 'april',
  '05': 'may',
  '06': 'june',
  '07': 'july',
  '08': 'august',
  '09': 'september',
  '10': 'october',
  '11': 'november',
  '12': 'december'
};

const ContentTable = ({ games }) => {
  const currentStadium = useSelector(state => state.games.currentStadium);
  const currentLeague = useSelector(state => state.games.currentLeague);
  const currentHome = useSelector(state => state.games.currentHome);
  const currentGuests = useSelector(state => state.games.currentGuests);
  const currentGameType = useSelector(state => state.games.currentGameType);
  const currentYear = useSelector(state => state.games.currentYear);
  const currentDate = useSelector(state => state.games.currentDate);
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

  //Games filtering
  let filteredData = useMemo(
    () =>
      games.filter(
        game =>
          (currentStadium !== 'All' ? game.stadium_name === currentStadium : true) &&
          (currentLeague.id !== -1
            ? game.league_id === currentLeague.id
            : currentGameType === game.game_type) &&
          (currentHome !== 'All' ? game.owners_name === currentHome : true) &&
          (currentGuests !== 'All' ? game.guests_name === currentGuests : true)
      ),
    [games, currentStadium, currentLeague, currentGameType, currentHome, currentGuests]
  );

  //Games sorting
  filteredData = useMemo(() => filteredData.sort((a, b) => (a.date > b.date ? -1 : 1)), [filteredData]);

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
          {filteredData.map((game, index) => (
            <tr
              key={game.id}
              style={currentDate.toJSON().slice(0, 10) === game.date ? { backgroundColor: '#E0F0FF' } : null}
              className={
                index === 0 || filteredData[index].date !== filteredData[index - 1].date ? cl.withDate : ''
              }>
              <td
                data-before={
                  index === 0 || filteredData[index].date !== filteredData[index - 1].date
                    ? game.date.slice(8, 10) + ' ' + MONTHS[game.date.slice(5, 7)]
                    : null
                }>
                {game.start_time.slice(0, 5)}
              </td>
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
              <td>{game.inn !== null ? `${game.inn} inn` : '—'} </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContentTable;

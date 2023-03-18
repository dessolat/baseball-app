import { useMemo } from 'react';
import classNames from 'classnames';
import Dropdown from 'components/UI/dropdown/GamesDropdown/Dropdown';
import cl from './ContentTable.module.scss';
import { setCurrentStadium } from 'redux/gamesReducer';
import { useDispatch, useSelector } from 'react-redux';

const ContentTableSubHeader = ({ curLeagueId, games }) => {
  const { currentStadium, currentLeague } = useSelector(state => state.games);
  const { currentGameType } = useSelector(state => state.shared);
  const dispatch = useDispatch();

  const handleStadiumDropdownClick = option => dispatch(setCurrentStadium(option));

  const filteredHeadings = games.filter(game => {
    return currentLeague.id === -1 ? currentGameType === game.game_type : game.league_id === currentLeague.id;
  });

  //stadiumOptions calculation
  const stadiumOptions = useMemo(
    () =>
      Array.from(
        new Set(
          filteredHeadings.reduce(
            (sum, cur) => {
              sum.push(cur.stadium_name);
              return sum;
            },
            ['All']
          )
        )
      ),
    [filteredHeadings]
  );

  const headerClasses = classNames(cl.tableHeader, {
    [cl.paddingRightOne]: curLeagueId !== -1
  });

  return (
    <div className={headerClasses}>
      <div>Time</div>
      <div>
        <Dropdown
          title={'Stadium'}
          options={stadiumOptions}
          currentOption={currentStadium}
          handleClick={handleStadiumDropdownClick}
          listStyles={{ left: '-1rem', width: 'calc(100% + 1rem)' }}
        />
      </div>
      <div>Home</div>
      <div> </div>
      <div>Guests</div>
      <div> </div>
      <div>Inn</div>
      {curLeagueId === -1 && <div>League</div>}
    </div>
  );
};

export default ContentTableSubHeader;

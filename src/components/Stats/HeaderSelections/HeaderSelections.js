import React, { useMemo, useState } from 'react';
import cl from './HeaderSelections.module.scss';
import Dropdown from 'components/UI/dropdown/GamesDropdown/Dropdown';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentYear, setCurrentDate, setCurrentGameType } from 'redux/sharedReducer';
import { setCurrentLeague } from 'redux/gamesReducer';
import { setTableMode } from 'redux/statsReducer';
import { Link, useParams } from 'react-router-dom';
import ContentPlayerFilterField from '../ContentPlayerTable/ContentPlayerFilterField';
import { getSearchParam, setSearchParam } from 'utils';

const TABLE_MODES = ['Batting', 'Fielding / Running', 'Pitching'];

const HeaderSelections = () => {
  const { statsType } = useParams();

	const [currentTeam, setCurrentTeam] = useState(getSearchParam('team') || 'All');

  const currentYear = useSelector(state => state.shared.currentYear);
  const currentGameType = useSelector(state => state.shared.currentGameType);

  const tableMode = useSelector(state => state.stats.tableMode);
  const statsData = useSelector(state => state.stats.statsData);

	const currentLeague = useSelector(state => state.games.currentLeague);

  const dispatch = useDispatch();

  const handleClick = option => {
    const tempDate = new Date(option, 0, 1);
    tempDate.setHours(0, tempDate.getTimezoneOffset() * -1, 0, 0);

		dispatch(setCurrentLeague({ id: -1, name: 'All' }));
    dispatch(setCurrentDate(tempDate));
    dispatch(setCurrentYear(option));
  };

  const getClassName = name =>
    name === statsType || (name === 'player' && statsType !== 'team') ? cl.active : '';

  const handleModeClick = mode => dispatch(setTableMode(mode));
  const handleGameTypeClick = gameType => dispatch(setCurrentGameType(gameType));

	const yearsArr = Object.keys(statsData)
    .map(year => +year)
    .reverse();

		// Team selections
		const handleTeamClick = team => {
			setCurrentTeam(team);
			setSearchParam('team', team);
		};

		let filteredStatsData = useMemo(
			() =>
				currentLeague.id !== -1
					? statsData[currentYear]?.find(
							item =>
								(item.title === currentLeague.name || item.title === currentLeague.title) &&
								item.type === currentGameType
						)?.players[tableMode.toLowerCase()] || []
					: statsData[currentYear]?.find(item => item.title === 'All leagues' && item.type === currentGameType)
							?.players[tableMode.toLowerCase()] || [],
	
			[currentLeague, statsData, tableMode, currentGameType, currentYear]
		);
	
		const teamOptions = useMemo(
			() =>
				Array.from(
					new Set(
						filteredStatsData.reduce((sum, cur) => {
							cur.teams.forEach(team => sum.push(team.name));
							return sum;
						}, [])
					)
				),
			[filteredStatsData]
		);
	
		const sortedTeamOptions = useMemo(() => {
			const sortedTeamsArr = teamOptions.sort((a, b) => (a > b ? 1 : -1));
			sortedTeamsArr.unshift('All');
	
			return sortedTeamsArr;
		}, [teamOptions]);
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
						listWrapperClass={cl.mobileListTypesDropdown}
            listStyles={{ marginLeft: '-.75rem', width: '115%' }}
            itemStyles={{ padding: '.3rem 0', textAlign: 'center' }}
          />
        </div>
      </div>
      {statsType === 'player' && (
        <div className={cl.filterFieldWrapper}>
          <ContentPlayerFilterField />
					<Dropdown
          title={currentTeam}
          options={sortedTeamOptions}
          currentOption={currentTeam}
          handleClick={handleTeamClick}
          // wrapperStyles={{ position: 'initial' }}
          wrapperStyles={{
            position: 'absolute',
            right: '25%',
            top: '50%',
            transform: 'translate(50%, -50%)',
            width: '45%',
						zIndex: 10000
          }}
					listWrapperStyles={{
						right: 0,
						left: 'unset',
						width: '50vw'
					}}
          listStyles={{
            // maxWidth: 125,
						// width: '100%',
            // left: '125px',
						left: 'unset',
						right: 0,
            top: '68px',
            maxHeight: '50vh',
            overflowY: 'scroll'
          }}
          itemStyles={{ fontSize: '12px', padding: '0.2rem 0.5rem' }}
          shortNames={13}
          searchField={true}
        />
        </div>
      )}
      <div className={cl.bottom}>
        <div className={cl.batting}>
          <Dropdown
            title={tableMode === 'Fielding / Running' ? 'Fld / Run' : tableMode}
            options={TABLE_MODES}
            currentOption={tableMode}
            handleClick={handleModeClick}
						listWrapperClass={cl.mobileTableModesDropdown}
            listStyles={{ marginLeft: '-.75rem', width: '115%' }}
            itemStyles={{ padding: '.3rem 0', textAlign: 'center' }}
          />
        </div>
        <div className={cl.years}>
          <Dropdown
            title={currentYear}
            options={yearsArr}
            currentOption={currentYear}
            handleClick={handleClick}
          />
        </div>
      </div>
    </div>
  );
};

export default HeaderSelections;

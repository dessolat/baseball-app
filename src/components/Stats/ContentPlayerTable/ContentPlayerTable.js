import React, { useState, useLayoutEffect, useMemo, useRef } from 'react';
import cl from './ContentPlayerTable.module.scss';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getObjectsSum, getShortName } from 'utils';
import Dropdown from 'components/UI/dropdown/GamesDropdown/Dropdown';
import TeamLogo from 'images/team_logo.png';

const ContentPlayerTable = ({ getTableHeaders, getTableRows, getSortedStatsData }) => {
  const [currentTeam, setCurrentTeam] = useState('All');
  const [sortField, setSortField] = useState('AB');
  const [sortDirection, setSortDirection] = useState('desc');

  const [scrollPosition, setScrollPosition] = useState(0);

	// const scrollPosition = useRef(0)
  const headerScroll = useRef(null);
  const rowsScroll = useRef(null);

  const isMobile = useSelector(state => state.shared.isMobile);

  // useEffect(() => {
  //   if (!isMobile) return;

  //   const handleHeaderScroll = e => {
  //     if (isScrolling.current) return;
  //     isScrolling.current = true;
  //     rowsScroll.current.scrollLeft = e.target.scrollLeft;
  //     setTimeout(() => (isScrolling.current = false), 200);
  //   };

  //   const handleRowsScroll = e => {
  //     if (isScrolling.current) return;
  //     isScrolling.current = true;
  //     headerScroll.current.scrollLeft = e.target.scrollLeft;
  //     setTimeout(() => (isScrolling.current = false), 200);
  //   };

  //   headerScroll.current.addEventListener('scroll', handleHeaderScroll);
  //   rowsScroll.current.addEventListener('scroll', handleRowsScroll);

  //   return () => {
  //     headerScroll.current.removeEventListener('scroll', handleHeaderScroll);
  //     rowsScroll.current.removeEventListener('scroll', handleRowsScroll);
  //   };
  // }, [isMobile]);

  useLayoutEffect(() => {
    if (headerScroll.current === null) return;
    // console.log(scrollPosition);
    // console.log(headerScroll.current);
    // console.log(headerScroll.current.style.scrollBehavior);
    // console.log(headerScroll.current.leftScroll);
    // headerScroll.current.style.scrollBehavior	= 'smooth';

      headerScroll.current.scrollLeft = scrollPosition;
      // rowsScroll.current.leftScroll = scrollPosition;

  }, [scrollPosition]);

  const tableMode = useSelector(state => state.stats.tableMode);
  const statsData = useSelector(state => state.stats.statsData);
  const currentLeague = useSelector(state => state.shared.currentLeague);

  const handleTeamClick = team => setCurrentTeam(team);

  const handleFieldClick = field => () => {
    sortField !== field ? setSortField(field) : setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
  };

  let filteredStatsData = useMemo(
    () =>
      currentLeague.id !== -1
        ? statsData.find(item => item.title === currentLeague.name)?.players[tableMode.toLowerCase()] || []
        : statsData.reduce((sum, league) => {
            league.players[tableMode.toLowerCase()].forEach(player => {
              const playerIndex = sum.findIndex(sumPlayer => sumPlayer.id === player.id);

              if (playerIndex !== -1) {
                sum[playerIndex] = getObjectsSum(sum[playerIndex], player, [
                  'name',
                  'surname',
                  'teams',
                  'id'
                ]);
              } else {
                sum.push(player);
              }
            });

            return sum;
          }, []) || [],
    [currentLeague, statsData, tableMode]
  );
  const teamOptions = useMemo(
    () =>
      Array.from(
        new Set(
          filteredStatsData.reduce(
            (sum, cur) => {
              cur.teams.forEach(team => sum.push(team.name));
              // sum.push(cur.owners_name);
              return sum;
            },
            ['All']
          )
        )
      ),
    [filteredStatsData]
  );
  //Filtering by team
  filteredStatsData = useMemo(
    () =>
      currentTeam !== 'All'
        ? filteredStatsData.filter(player => player.teams.find(team => team.name === currentTeam))
        : filteredStatsData,
    [filteredStatsData, currentTeam]
  );

  return (
    <>
      {isMobile ? (
        <div className={cl.mobileWrapper}>
          <div className={cl.fullHeader}>
            <div className={cl.leftHeader}>
              <div>Players</div>
              <div>POS</div>
              <div>
                <Dropdown
                  title={'Team'}
                  options={teamOptions}
                  currentOption={currentTeam}
                  handleClick={handleTeamClick}
                  listStyles={{ left: '-.3rem', width: 'calc(100% + 4rem)' }}
                  itemStyles={{ fontSize: '12px', padding: '0.2rem 0.5rem' }}
                  shortNames={13}
                />
              </div>
            </div>
            <div
              className={cl.rightHeader}
              ref={headerScroll}
              onScroll={e => setScrollPosition(e.target.scrollLeft)}>
              {getTableHeaders(sortField, sortDirection, handleFieldClick, cl, {
                top: '.1rem',
                transform: 'translateX(-50%) scale(0.7)'
              })}
            </div>
          </div>
          <div className={cl.sides}>
            <div className={cl.leftRows}>
              {getSortedStatsData(filteredStatsData, sortField, sortDirection).map((row, index) => {
                return (
                  <div key={index} className={cl.tableRow}>
                    <div>
                      <Link to={`/stats/player/${row.name}/${row.surname}`}>
                        {' '}
                        <span>
                          {row.name} {row.surname}
                        </span>
                      </Link>
                    </div>
                    <div>{index}</div>
                    <div>
                      <img src={TeamLogo} alt='team-logo' />
                    </div>
                  </div>
                );
              })}
            </div>
            <div
              className={cl.rightRows}
              onScroll={e => {
                if (anotherScroll.current) return;
                anotherScroll.current = true;
                headerScroll.current.scrollLeft = e.target.scrollLeft;
                anotherScroll.current = false;
              }}
              // onScroll={e => setScrollPosition(e.target.scrollLeft)}
              ref={rowsScroll}>
              {getSortedStatsData(filteredStatsData, sortField, sortDirection).map((row, index) => {
                return (
                  <div key={index} className={cl.tableRow}>
                    {getTableRows(row, cl, sortField)}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <div className={cl.wrapper}>
          <div>
            <div className={cl.tableHeader}>
              <div></div>
              <div>POS</div>
              <div>
                <Dropdown
                  title={'Team'}
                  options={teamOptions}
                  currentOption={currentTeam}
                  handleClick={handleTeamClick}
                  listStyles={{ left: '-1rem', width: 'calc(100% + 1rem)' }}
                />
              </div>
              {getTableHeaders(sortField, sortDirection, handleFieldClick, cl)}
            </div>
            <ul className={cl.rows}>
              {getSortedStatsData(filteredStatsData, sortField, sortDirection).map((row, index) => {
                return (
                  <li key={index} className={cl.tableRow}>
                    <div>
                      <Link to={`/stats/player/${row.name}/${row.surname}`}>
                        {' '}
                        <span className={cl.fullName}>
                          {row.name} {row.surname}
                        </span>
                      </Link>
                    </div>
                    <div>{index}</div>
                    <div className={cl.teamNames}>
                      <Link to={`/games/team/${row.teams[0].name}`}>
                        {getShortName(row.teams[0].name, row.teams[1] ? 12 : 28)}
                      </Link>
                      {row.teams[1] && (
                        <>
                           /{' '}
                          <Link to={`/games/team/${row.teams[1].name}`}>
                            {getShortName(row.teams[1].name, 12)}
                          </Link>
                        </>
                      )}
                      {row.teams[2] && (
                        <>
                           / <Link to={`/games/team/${row.teams[2].name}`}>{row.teams[2].name}</Link>
                        </>
                      )}
                    </div>
                    {getTableRows(row, cl, sortField)}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default ContentPlayerTable;

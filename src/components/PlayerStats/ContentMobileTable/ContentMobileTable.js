import React, { useState, useRef, useEffect } from 'react';
import cl from './ContentMobileTable.module.scss';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setSortField } from 'redux/playerStatsReducer';
import ContentMobileTableHeader from './ContentMobileTableHeader';
import ContentMobileTableBody from './ContentMobileTableBody';

const ContentMobileTable = ({ filteredLeagues, filteredLeague, playerYears, MONTHS, handleLeagueClick }) => {
  const [sortDirection, setSortDirection] = useState('asc');
  const [isScrollable, setIsScrollable] = useState(true);

  const currentLeague = useSelector(state => state.games.currentLeague);
  const tableMode = useSelector(state => state.playerStats.tableType);
  const currentTeam = useSelector(state => state.playerStats.playerCurrentTeam);
  const sortField = useSelector(state => state.playerStats.sortField);
  const mobileOrientation = useSelector(state => state.shared.mobileOrientation);

  const dispatch = useDispatch();

  const headerScroll = useRef(null);
  const rowScrollRef = useRef();

  useEffect(() => {
    if (rowScrollRef.current === null) return;

    setTimeout(
      () => setIsScrollable(rowScrollRef.current?.clientWidth < rowScrollRef.current?.scrollWidth),
      500
    );
  }, []);

  useEffect(() => {
    setIsScrollable(rowScrollRef.current.clientWidth < rowScrollRef.current.scrollWidth);

    if (currentLeague.id !== -1 && sortField[tableMode] === 'G') {
      const defaultSortFields = { Batting: 'AB', Fielding: 'CH', Running: 'SB', Pitching: 'GS' };
      dispatch(setSortField(defaultSortFields[tableMode]));
    }
    // eslint-disable-next-line
  }, [tableMode, currentLeague.id]);

  useEffect(() => {
    if (rowScrollRef.current === null) return;

    setTimeout(() => {
      setIsScrollable(rowScrollRef.current.clientWidth < rowScrollRef.current.scrollWidth);
    }, 150);
  }, [mobileOrientation]);

  const fieldsInfo = [
    { name: 'AB', type: 'batting' },
    { name: 'R', type: 'batting' },
    { name: 'H', type: 'batting' },
    { name: '2B', type: 'batting' },
    { name: '3B', type: 'batting' },
    { name: 'HR', type: 'batting' },
    { name: 'RBI', type: 'batting' },
    { name: 'GDP', type: 'batting' },
    { name: 'BB', type: 'batting' },
    { name: 'IBB', type: 'batting' },
    { name: 'HP', type: 'batting' },
    { name: 'SH', type: 'batting' },
    { name: 'SF', type: 'batting' },
    { name: 'SO', type: 'batting' },
    { name: 'TB', type: 'batting' },
    { name: 'AVG', type: 'batting', fixed: 3, addedClass: cl.wider },
    { name: 'SLG', type: 'batting', fixed: 3, addedClass: cl.wider },
    { name: 'OBP', type: 'batting', fixed: 3, addedClass: cl.wider },
    { name: 'OPS', type: 'batting', fixed: 3, addedClass: cl.wider },
    { name: 'SB', type: 'running' },
    { name: 'CS', type: 'running' },
    { name: 'SB_pr', type: 'running', fixed: 3, childField: '%SB' },
    { name: 'LOB', type: 'running' },
    { name: 'CH', type: 'fielding' },
    { name: 'PO', type: 'fielding' },
    { name: 'A', type: 'fielding' },
    { name: 'E', type: 'fielding' },
    { name: 'DP', type: 'fielding' },
    { name: 'FLD', type: 'fielding', fixed: 3, addedClass: cl.wider },
    { name: 'GS', type: 'pitching' },
    { name: 'W', type: 'pitching' },
    { name: 'L', type: 'pitching' },
    { name: 'CG', type: 'pitching' },
    { name: 'SV', type: 'pitching' },
    { name: 'IP', type: 'pitching', fixed: 1 },
    { name: 'PA', type: 'pitching' },
    { name: 'R', type: 'pitching' },
    { name: 'ER', type: 'pitching' },
    { name: 'H', type: 'pitching' },
    { name: '2B', type: 'pitching' },
    { name: '3B', type: 'pitching' },
    { name: 'HR', type: 'pitching' },
    { name: 'BB', type: 'pitching' },
    { name: 'IBB', type: 'pitching' },
    { name: 'HP', type: 'pitching' },
    { name: 'SH', type: 'pitching' },
    { name: 'SF', type: 'pitching' },
    { name: 'SO', type: 'pitching' },
    { name: 'WP', type: 'pitching' },
    { name: 'BK', type: 'pitching' },
    { name: 'ERA', type: 'pitching', fixed: 2, addedClass: cl.wider },
    { name: 'NP', type: 'pitching' },
    { name: 'NS', type: 'pitching' },
    { name: 'NB', type: 'pitching' }
  ];

  return (
    <div className={cl.mobileWrapper}>
      <ContentMobileTableHeader
        cl={cl}
        playerYears={playerYears}
        currentLeague={currentLeague}
        isScrollable={isScrollable}
        sortField={sortField}
        sortDirection={sortDirection}
        setSortDirection={setSortDirection}
        fieldsInfo={fieldsInfo}
        ref={headerScroll}
      />
      <ContentMobileTableBody
        cl={cl}
        isScrollable={isScrollable}
        currentLeague={currentLeague}
        currentTeam={currentTeam}
        fieldsInfo={fieldsInfo}
        filteredLeagues={filteredLeagues}
        filteredLeague={filteredLeague}
				MONTHS={MONTHS}
				handleLeagueClick={handleLeagueClick}
				sortDirection={sortDirection}
				playerYears={playerYears}
        headerScroll={headerScroll}
				rowScrollRef={rowScrollRef}
      />
    </div>
  );
};

export default ContentMobileTable;

import React from 'react';
import cl from './ContentTables.module.scss';
import ContentBattingTable from '../ContentBattingTable/ContentBattingTable';
import ContentPitchingTable from '../ContentPitchingTable/ContentPitchingTable';
import ContentMobileTable from '../ContentMobileTable/ContentMobileTable';
import { useSelector } from 'react-redux';

const MONTHS = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];

const ContentTables = ({
  getSortedTableOptions,
  filteredLeagues,
  filteredLeague,
  handleTableOptionClick,
  playerYears,
  handleLeagueClick
}) => {
  const isMobile = useSelector(state => state.shared.isMobile);
  const tableType = useSelector(state => state.playerStats.tableType);

  return (
    <>
      {getSortedTableOptions().length === 0 ? (
        <p className={cl.noDataFound}>No data found for current options.</p>
      ) : isMobile ? (
        <ContentMobileTable
          filteredLeagues={filteredLeagues}
          filteredLeague={filteredLeague}
          playerYears={playerYears}
          MONTHS={MONTHS}
          handleLeagueClick={handleLeagueClick}
        />
      ) : tableType === 'Batting' ? (
        <ContentBattingTable
          filteredLeagues={filteredLeagues}
          filteredLeague={filteredLeague}
          playerYears={playerYears}
          MONTHS={MONTHS}
          handleLeagueClick={handleLeagueClick}
          getSortedTableOptions={getSortedTableOptions}
          handleTableOptionClick={handleTableOptionClick}
        />
      ) : (
        <ContentPitchingTable
          filteredLeagues={filteredLeagues}
          filteredLeague={filteredLeague}
          playerYears={playerYears}
          MONTHS={MONTHS}
          handleLeagueClick={handleLeagueClick}
          getSortedTableOptions={getSortedTableOptions}
          handleTableOptionClick={handleTableOptionClick}
        />
      )}
    </>
  );
};

export default ContentTables;

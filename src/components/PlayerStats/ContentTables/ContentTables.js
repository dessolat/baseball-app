import React from 'react';
import ContentBattingTable from '../ContentBattingTable/ContentBattingTable';
import ContentPitchingTable from '../ContentPitchingTable/ContentPitchingTable';
import ContentMobileTable from '../ContentMobileTable/ContentMobileTable';
import { useSelector } from 'react-redux';
import NoDataMessage from 'components/NoDataMessage/NoDataMessage';

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

  const isStatsEmpty = getSortedTableOptions().length === 0;

	// Rendering
  if (isStatsEmpty) return <NoDataMessage text='There are no statistics for selected options.' />;

  if (isMobile)
    return (
      <ContentMobileTable
        filteredLeagues={filteredLeagues}
        filteredLeague={filteredLeague}
        playerYears={playerYears}
        MONTHS={MONTHS}
        handleLeagueClick={handleLeagueClick}
      />
    );

  return (
    <>
      {tableType === 'Batting' ? (
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

import React, { useState } from 'react';
import cl from './ContentBattingTable.module.scss';
import { useSelector } from 'react-redux';
import ContentBattingTableHeader from './ContentBattingTableHeader';
import ContentBattingTableBody from './ContentBattingTableBody';

const fieldsInfo = [
	{ name: 'AB', type: 'batting', fixed: null, addedClass: cl.wide },
	{ name: 'R', type: 'batting', fixed: null, addedClass: cl.tall },
	{ name: 'H', type: 'batting', fixed: null, addedClass: cl.tall },
	{ name: '2B', type: 'batting', fixed: null, addedClass: cl.tall },
	{ name: '3B', type: 'batting', fixed: null, addedClass: cl.tall },
	{ name: 'HR', type: 'batting', fixed: null, addedClass: cl.tall },
	{ name: 'RBI', type: 'batting', fixed: null, addedClass: null },
	{ name: 'GDP', type: 'batting', fixed: null, addedClass: cl.wide },
	{ name: 'BB', type: 'batting', fixed: null, addedClass: null },
	{ name: 'IBB', type: 'batting', fixed: null, addedClass: null },
	{ name: 'HP', type: 'batting', fixed: null, addedClass: cl.tall },
	{ name: 'SH', type: 'batting', fixed: null, addedClass: cl.tall },
	{ name: 'SF', type: 'batting', fixed: null, addedClass: cl.tall },
	{ name: 'SO', type: 'batting', fixed: null, addedClass: cl.tall },
	{ name: 'TB', type: 'batting', fixed: null, addedClass: cl.wide },
	{ name: 'AVG', type: 'batting', fixed: 3, addedClass: cl.wider },
	{ name: 'SLG', type: 'batting', fixed: 3, addedClass: cl.wider },
	{ name: 'OBP', type: 'batting', fixed: 3, addedClass: cl.wider },
	{ name: 'OPS', type: 'batting', fixed: 3, addedClass: cl.wider },
	{ name: 'SB', type: 'running', fixed: null, addedClass: cl.tall },
	{ name: 'CS', type: 'running', fixed: null, addedClass: cl.tall },
	{ name: 'SB_pr', type: 'running', fixed: null, addedClass: cl.wider },
	{ name: 'LOB', type: 'running', fixed: null, addedClass: null },
	{ name: 'CH', type: 'fielding', fixed: null, addedClass: cl.wide },
	{ name: 'PO', type: 'fielding', fixed: null, addedClass: null },
	{ name: 'A', type: 'fielding', fixed: null, addedClass: null },
	{ name: 'E', type: 'fielding', fixed: null, addedClass: cl.tall },
	{ name: 'DP', type: 'fielding', fixed: null, addedClass: cl.tall },
	{ name: 'FLD', type: 'fielding', fixed: 3, addedClass: cl.wider }
];

const ContentBattingTable = ({
  filteredLeagues = [],
  filteredLeague,
  playerYears,
  MONTHS,
  handleLeagueClick,
  getSortedTableOptions,
  handleTableOptionClick
}) => {
  const [sortField, setSortField] = useState('AB');
  const [sortDirection, setSortDirection] = useState('asc');

  const currentLeague = useSelector(state => state.games.currentLeague);

  const handleFieldClick = field => () => {
    sortField !== field ? setSortField(field) : setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
  };

  return (
    <div className={cl.wrapper}>
      <div>
        <ContentBattingTableHeader
          cl={cl}
          playerYears={playerYears}
          currentLeague={currentLeague}
          getSortedTableOptions={getSortedTableOptions}
          handleTableOptionClick={handleTableOptionClick}
          sortField={sortField}
          sortDirection={sortDirection}
          handleFieldClick={handleFieldClick}
					fieldsInfo={fieldsInfo}
        />
        <ContentBattingTableBody
          cl={cl}
          currentLeague={currentLeague}
          playerYears={playerYears}
          filteredLeague={filteredLeague}
					filteredLeagues={filteredLeagues}
          sortField={sortField}
					sortDirection={sortDirection}
					handleLeagueClick={handleLeagueClick}
					MONTHS={MONTHS}
					fieldsInfo={fieldsInfo}
        />
      </div>
    </div>
  );
};

export default ContentBattingTable;

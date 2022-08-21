import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import cl from './ContentPitchingTable.module.scss';
import ContentPitchingTableBody from './ContentPitchingTableBody';
import ContentPitchingTableHeader from './ContentPitchingTableHeader';

const fieldsInfo = [
	{ name: 'GS', type: 'pitching', fixed: null, addedClass: null },
	{ name: 'W', type: 'pitching', fixed: null, addedClass: null },
	{ name: 'L', type: 'pitching', fixed: null, addedClass: null },
	{ name: 'CG', type: 'pitching', fixed: null, addedClass: null },
	{ name: 'SV', type: 'pitching', fixed: null, addedClass: null },
	{ name: 'IP', type: 'pitching', fixed: null, addedClass: cl.wide2 },
	{ name: 'PA', type: 'pitching', fixed: null, addedClass: cl.wide },
	{ name: 'R', type: 'pitching', fixed: null, addedClass: null },
	{ name: 'ER', type: 'pitching', fixed: null, addedClass: null },
	{ name: 'H', type: 'pitching', fixed: null, addedClass: null },
	{ name: '2B', type: 'pitching', fixed: null, addedClass: null },
	{ name: '3B', type: 'pitching', fixed: null, addedClass: null },
	{ name: 'HR', type: 'pitching', fixed: null, addedClass: null },
	{ name: 'BB', type: 'pitching', fixed: null, addedClass: null },
	{ name: 'IBB', type: 'pitching', fixed: null, addedClass: null },
	{ name: 'HP', type: 'pitching', fixed: null, addedClass: null },
	{ name: 'SH', type: 'pitching', fixed: null, addedClass: null },
	{ name: 'SF', type: 'pitching', fixed: null, addedClass: null },
	{ name: 'SO', type: 'pitching', fixed: null, addedClass: null },
	{ name: 'WP', type: 'pitching', fixed: null, addedClass: null },
	{ name: 'BK', type: 'pitching', fixed: null, addedClass: null },
	{ name: 'ERA', type: 'pitching', fixed: 3, addedClass: cl.wide3 },
	{ name: 'NP', type: 'pitching', fixed: null, addedClass: cl.wide },
	{ name: 'NS', type: 'pitching', fixed: null, addedClass: cl.wide },
	{ name: 'NB', type: 'pitching', fixed: null, addedClass: cl.wide }
];

const ContentPitchingTable = ({
  filteredLeagues = [],
  filteredLeague,
  playerYears,
  MONTHS,
  handleLeagueClick,
  getSortedTableOptions,
  handleTableOptionClick
}) => {
  const [sortField, setSortField] = useState('G');
  const [sortDirection, setSortDirection] = useState('asc');

  const currentLeague = useSelector(state => state.games.currentLeague);

	useEffect(() => {
    currentLeague.id !== -1 && sortField === 'G' && setSortField('GS');

    // eslint-disable-next-line
  }, [currentLeague.id]);

  const handleFieldClick = field => () => {
    sortField !== field ? setSortField(field) : setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
  };
  return (
    <div className={cl.wrapper}>
      <div>
        <ContentPitchingTableHeader
          playerYears={playerYears}
          currentLeague={currentLeague}
          sortField={sortField}
          sortDirection={sortDirection}
          handleFieldClick={handleFieldClick}
          getSortedTableOptions={getSortedTableOptions}
          handleTableOptionClick={handleTableOptionClick}
					fieldsInfo={fieldsInfo}
					setSortDirection={setSortDirection}
        />
        <ContentPitchingTableBody
          filteredLeagues={filteredLeagues}
          filteredLeague={filteredLeague}
          playerYears={playerYears}
          currentLeague={currentLeague}
          sortField={sortField}
          sortDirection={sortDirection}
          MONTHS={MONTHS}
          handleLeagueClick={handleLeagueClick}
					fieldsInfo={fieldsInfo}
        />
      </div>
    </div>
  );
};

export default ContentPitchingTable;

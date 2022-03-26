import React from 'react';
import { useSelector } from 'react-redux';
import cl from './ContentPitchingTable.module.scss';
import ActiveBodyCell from 'components/UI/ActiveBodyCell/ActiveBodyCell';

const ContentPitchingTableBody = ({
  filteredLeagues = [],
  filteredLeague,
  playerYears,
  currentLeague,
  sortField,
  sortDirection,
  MONTHS
}) => {
  const currentTeam = useSelector(state => state.playerStats.playerCurrentTeam);

  const sortedLeagueGames =
    filteredLeague &&
    filteredLeague.pitching.games_pitching
      .slice()
      .sort((a, b) =>
        a[sortField] > b[sortField] ? (sortDirection === 'asc' ? 1 : -1) : sortDirection === 'asc' ? -1 : 1
      );

  const sortedLeagues = filteredLeagues
    .slice()
    .sort((a, b) =>
      a.teams.find(team => team.name === currentTeam).pitching[sortField] >
      b.teams.find(team => team.name === currentTeam).pitching[sortField]
        ? sortDirection === 'asc'
          ? 1
          : -1
        : sortDirection === 'asc'
        ? -1
        : 1
    );
  return (
    <ul className={cl.rows}>
      {currentLeague.id === -1
        ? //All leagues
          sortedLeagues.map((row, index) => {
            const team = row.teams.find(team => team.name === currentTeam);
            return (
              <li key={index} className={cl.tableRow}>
                {playerYears === 'All years' && <div className={cl.year}>{row.year}</div>}
                <div className={cl.league}>{row.title}</div>
                <ActiveBodyCell sortField={sortField} row={team.pitching}>PA</ActiveBodyCell>
                <ActiveBodyCell sortField={sortField} row={team.pitching}>R</ActiveBodyCell>
                <ActiveBodyCell sortField={sortField} row={team.pitching}>ER</ActiveBodyCell>
                <ActiveBodyCell sortField={sortField} row={team.pitching}>H</ActiveBodyCell>
                <ActiveBodyCell sortField={sortField} row={team.pitching}>2B</ActiveBodyCell>
                <ActiveBodyCell sortField={sortField} row={team.pitching}>3B</ActiveBodyCell>
                <ActiveBodyCell sortField={sortField} row={team.pitching}>HR</ActiveBodyCell>
                <ActiveBodyCell sortField={sortField} row={team.pitching}>BB</ActiveBodyCell>
                <ActiveBodyCell sortField={sortField} row={team.pitching}>IBB</ActiveBodyCell>
                <ActiveBodyCell sortField={sortField} row={team.pitching}>HP</ActiveBodyCell>
                <ActiveBodyCell sortField={sortField} row={team.pitching}>SH</ActiveBodyCell>
                <ActiveBodyCell sortField={sortField} row={team.pitching}>SF</ActiveBodyCell>
                <ActiveBodyCell sortField={sortField} row={team.pitching}>SO</ActiveBodyCell>
                <ActiveBodyCell sortField={sortField} row={team.pitching}>WP</ActiveBodyCell>
                <ActiveBodyCell sortField={sortField} row={team.pitching} fixed={3} addedClass={cl.wider}>ERA</ActiveBodyCell>
                <ActiveBodyCell sortField={sortField} row={team.pitching}>NP</ActiveBodyCell>
                <ActiveBodyCell sortField={sortField} row={team.pitching}>NS</ActiveBodyCell>
                <ActiveBodyCell sortField={sortField} row={team.pitching}>NB</ActiveBodyCell>
              </li>
            );
          })
        : //Selected league
          sortedLeagueGames.map((row, index) => (
            <li key={index} className={cl.tableRow}>
              <div className={cl.game}>
                {row.date.slice(8, 10)} {MONTHS[+row.date.slice(5, 7) - 1]},
                <span className={cl.teams}>
                   {row.home_team.name} - {row.visit_team.name}
                </span>
              </div>
              <ActiveBodyCell sortField={sortField} row={row}>PA</ActiveBodyCell>
              <ActiveBodyCell sortField={sortField} row={row}>R</ActiveBodyCell>
              <ActiveBodyCell sortField={sortField} row={row}>ER</ActiveBodyCell>
              <ActiveBodyCell sortField={sortField} row={row}>H</ActiveBodyCell>
              <ActiveBodyCell sortField={sortField} row={row}>2B</ActiveBodyCell>
              <ActiveBodyCell sortField={sortField} row={row}>3B</ActiveBodyCell>
              <ActiveBodyCell sortField={sortField} row={row}>HR</ActiveBodyCell>
              <ActiveBodyCell sortField={sortField} row={row}>BB</ActiveBodyCell>
              <ActiveBodyCell sortField={sortField} row={row}>IBB</ActiveBodyCell>
              <ActiveBodyCell sortField={sortField} row={row}>HP</ActiveBodyCell>
              <ActiveBodyCell sortField={sortField} row={row}>SH</ActiveBodyCell>
              <ActiveBodyCell sortField={sortField} row={row}>SF</ActiveBodyCell>
              <ActiveBodyCell sortField={sortField} row={row}>SO</ActiveBodyCell>
              <ActiveBodyCell sortField={sortField} row={row}>WP</ActiveBodyCell>
              <ActiveBodyCell sortField={sortField} row={row} fixed={3} addedClass={cl.wider}>ERA</ActiveBodyCell>
              <ActiveBodyCell sortField={sortField} row={row}>NP</ActiveBodyCell>
              <ActiveBodyCell sortField={sortField} row={row}>NS</ActiveBodyCell>
              <ActiveBodyCell sortField={sortField} row={row}>NB</ActiveBodyCell>
            </li>
          ))}
    </ul>
  );
};

export default ContentPitchingTableBody;

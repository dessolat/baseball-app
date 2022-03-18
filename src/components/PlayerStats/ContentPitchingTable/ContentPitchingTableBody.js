import React from 'react';
import { useSelector } from 'react-redux';
import cl from './ContentPitchingTable.module.scss';

const ContentPitchingTableBody = ({
  filteredLeagues = [],
  filteredLeague,
  playerYears,
  currentLeague,
  MONTHS
}) => {
  const currentTeam = useSelector(state => state.playerStats.playerCurrentTeam);
	
  return (
    <ul className={cl.rows}>
      {currentLeague.id === -1
        ? filteredLeagues.map((row, index) => {
            const team = row.teams.find(team => team.name === currentTeam);
            return (
              <li key={index} className={cl.tableRow}>
                {playerYears === 'All years' && <div className={cl.year}>{row.year}</div>}
                <div className={cl.league}>{row.title}</div>
                <div>{team.pitching.PA}</div>
                <div>{team.pitching.R}</div>
                <div>{team.pitching.ER}</div>
                <div>{team.pitching.H}</div>
                <div>{team.pitching['2B']}</div>
                <div>{team.pitching['3B']}</div>
                <div>{team.pitching.HR}</div>
                <div>{team.pitching.BB}</div>
                <div>{team.pitching.IBB}</div>
                <div>{team.pitching.HP}</div>
                <div>{team.pitching.SH}</div>
                <div>{team.pitching.SF}</div>
                <div>{team.pitching.SO}</div>
                <div>{team.pitching.WP}</div>
                <div className={cl.wider}>{Number(team.pitching.ERA).toFixed(3)}</div>
                <div>{team.pitching.NP}</div>
                <div>{team.pitching.NS}</div>
                <div>{team.pitching.NB}</div>
              </li>
            );
          })
        : filteredLeague?.pitching?.games_pitching.map((row, index) => (
            <li key={index} className={cl.tableRow}>
              <div className={cl.game}>
                {row.date.slice(8, 10)} {MONTHS[+row.date.slice(5, 7) - 1]}, {row.home_team.name} -{' '}
                {row.visit_team.name}
              </div>
              <div>{row.PA}</div>
              <div>{row.R}</div>
              <div>{row.ER}</div>
              <div>{row.H}</div>
              <div>{row['2B']}</div>
              <div>{row['3B']}</div>
              <div>{row.HR}</div>
              <div>{row.BB}</div>
              <div>{row.IBB}</div>
              <div>{row.HP}</div>
              <div>{row.SH}</div>
              <div>{row.SF}</div>
              <div>{row.SO}</div>
              <div>{row.WP}</div>
              <div className={cl.wider}>{Number(row.ERA).toFixed(3)}</div>
              <div>{row.NP}</div>
              <div>{row.NS}</div>
              <div>{row.NB}</div>

            </li>
          ))}
    </ul>
  );
};

export default ContentPitchingTableBody;

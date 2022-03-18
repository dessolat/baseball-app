import React, { useState, useEffect, useRef } from 'react';
import cl from './Content.module.scss';
import ContentBattingTable from '../ContentBattingTable/ContentBattingTable';
import ContentPitchingTable from '../ContentPitchingTable/ContentPitchingTable';
import Dropdown from 'components/UI/dropdown/GamesDropdown/Dropdown';
import { useSelector } from 'react-redux';

const Content = ({ playerYears }) => {
  const [tableType, setTableType] = useState('Batting');

  const statsData = useSelector(state => state.playerStats.playerStatsData);
  const currentLeague = useSelector(state => state.shared.currentLeague);
  const currentTeam = useSelector(state => state.playerStats.playerCurrentTeam);

  const TABLE_OPTIONS = ['Batting', 'Pitching'];

  const handleTableOptionClick = option => setTableType(option);

  const filteredLeagues =
    playerYears === 'All years'
      ? statsData.leagues.filter(league => league.teams.find(team => team.name === currentTeam))
      : statsData.leagues.filter(
          league => league.year === playerYears && league.teams.find(team => team.name === currentTeam)
        );

  const filteredLeague =
    currentLeague.id === -1 ? null : currentLeague.teams.find(team => team.name === currentTeam);
  return (
    <section>
      <div className='container'>
        <div className={cl.content}>
          {Object.keys(statsData).length === 0 ? (
            <></>
          ) : (
            <>
              <p className={cl.playerChr}>
                {statsData.pos || '—'} | B/T: {statsData.bat_hand}/{statsData.throw_hand} | {statsData.height}{' '}
                {statsData.weight}LBS | Age: {new Date().getFullYear() - statsData.yob}
              </p>
              <div className={cl.dropWrapper}>
                <Dropdown
                  title={tableType}
                  options={TABLE_OPTIONS}
                  currentOption={tableType}
                  handleClick={handleTableOptionClick}
                />
              </div>
              {tableType === 'Batting' ? (
                <ContentBattingTable
                  filteredLeagues={filteredLeagues}
                  filteredLeague={filteredLeague}
                  playerYears={playerYears}
                />
              ) : (
                <ContentPitchingTable leagues={statsData.leagues} playerYears={playerYears} />
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Content;

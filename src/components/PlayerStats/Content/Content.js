import React from 'react';
import cl from './Content.module.scss';
import ContentBattingTable from '../ContentBattingTable/ContentBattingTable';
import ContentPitchingTable from '../ContentPitchingTable/ContentPitchingTable';
import Dropdown from 'components/UI/dropdown/GamesDropdown/Dropdown';
import { useSelector, useDispatch } from 'react-redux';
import { setTableType } from 'redux/playerStatsReducer';
import ContentMobilePlayerInfo from './ContentMobilePlayerInfo';
import ContentMobileTable from '../ContentMobileTable/ContentMobileTable';

const MONTHS = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];

const Content = ({ playerYears }) => {
  const statsData = useSelector(state => state.playerStats.playerStatsData);
  const currentLeague = useSelector(state => state.shared.currentLeague);
  const isMobile = useSelector(state => state.shared.isMobile);
  const currentTeam = useSelector(state => state.playerStats.playerCurrentTeam);
  const tableType = useSelector(state => state.playerStats.tableType);
  const dispatch = useDispatch();

  const TABLE_OPTIONS = ['Batting', 'Pitching'];

  const handleTableOptionClick = option => dispatch(setTableType(option));

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
              {isMobile && <ContentMobilePlayerInfo statsData={statsData} />}
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
              {isMobile ? (
                <ContentMobileTable
                  filteredLeagues={filteredLeagues}
                  filteredLeague={filteredLeague}
                  playerYears={playerYears}
                  MONTHS={MONTHS}
                />
              ) : tableType === 'Batting' ? (
                <ContentBattingTable
                  filteredLeagues={filteredLeagues}
                  filteredLeague={filteredLeague}
                  playerYears={playerYears}
                  MONTHS={MONTHS}
                />
              ) : (
                <ContentPitchingTable
                  filteredLeagues={filteredLeagues}
                  filteredLeague={filteredLeague}
                  playerYears={playerYears}
                  MONTHS={MONTHS}
                />
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Content;

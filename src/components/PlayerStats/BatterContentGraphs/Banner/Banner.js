import { PlayerYearsContext } from 'context';
import React, { useContext, memo } from 'react';
import { useSelector } from 'react-redux';
import BannerColumns from './BannerColumns';
import PlayerStatsAnimationProvider from 'context/PlayerStatsAnimationContext/PlayerStatsAnimationContext';

const Banner = () => {
  const { playerYears } = useContext(PlayerYearsContext);

  const statsData = useSelector(s => s.playerStats.playerStatsData);
  const currentTeam = useSelector(s => s.playerStats.playerCurrentTeam);
  const currentLeague = useSelector(state => state.games.currentLeague);

  const { total, total_annual, teams, leagues } = statsData.batting_banner;

  const getParentObj = () => {
    if (playerYears === 'All years' && currentTeam === 'All teams') return total;
    if (playerYears === 'All years' && currentTeam !== 'All teams')
      return teams.find(team => team.name === currentTeam);
    if (currentLeague.id === -1 && currentTeam === 'All teams') return total_annual[playerYears];
    if (currentLeague.id === -1 && currentTeam !== 'All teams')
      return teams.find(team => team.name === currentTeam).annual[playerYears];

    const curLeague = leagues.find(league => league.id === currentLeague.id);
    return curLeague.teams.find(team => team.name === currentTeam);
  };

  const parentObj = getParentObj();
  return parentObj ? (
    <PlayerStatsAnimationProvider>
      <BannerColumns parentObj={parentObj} />
    </PlayerStatsAnimationProvider>
  ) : (
    <></>
  );
};

export default memo(Banner);

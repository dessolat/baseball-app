import React, { useMemo } from 'react';
import cl from './ContentGamesTable.module.scss';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ContentGamesTableHeader from './ContentGamesTableHeader';
import ContentGamesTableBody from './ContentGamesTableBody';

const ContentGamesTable = () => {
  const currentLeague = useSelector(state => state.games.currentLeague);
  const currentYear = useSelector(state => state.shared.currentYear);
  const teamData = useSelector(state => state.teamGames.teamData);

  //Filtering teamData leagues by current year
  const currentYearLeagues = useMemo(
    () => teamData.filter(curLeague => curLeague.league.year === currentYear),
    [teamData, currentYear]
  );

  //Games summary by currentLeague
  const gamesArray = useMemo(
    () =>
      currentLeague.id === -1
        ? currentYearLeagues.reduce((sum, curLeague) => {
            curLeague.games.forEach(game => sum.push(game));
            return sum;
          }, [])
        : currentYearLeagues.find(curLeague =>
            currentLeague.id === undefined
              ? curLeague.league.title === currentLeague.title
              : curLeague.league.id === currentLeague.id
          )?.games || [],
    [currentYearLeagues, currentLeague]
  );

  //Games sorting
  const sortedGamesArray = useMemo(() => gamesArray.sort((a, b) => (a.date > b.date ? 1 : -1)), [gamesArray]);
  return (
    <div className={cl.wrapper}>
      <div className={cl.table}>
        <ContentGamesTableHeader cl={cl} />
        <ContentGamesTableBody cl={cl} games={sortedGamesArray}/>
      </div>
      <div className={cl.linkWrapper}>
        <Link to='/stats/team'>Go to Team Stat</Link>
      </div>
    </div>
  );
};

export default ContentGamesTable;

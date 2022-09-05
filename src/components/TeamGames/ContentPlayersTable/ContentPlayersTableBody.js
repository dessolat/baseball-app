import React from 'react';
import { useSelector } from 'react-redux';
import ContentPlayersTableRow from './ContentPlayersTableRow/ContentPlayersTableRow';

const ContentPlayersTableBody = ({ cl }) => {
  const teamData = useSelector(state => state.teamGames.teamData);
  const currentYear = useSelector(state => state.shared.currentYear);
  const currentLeague = useSelector(state => state.games.currentLeague);
 
  const PLAYERS_DATA =
    currentLeague.id !== -1
      ? teamData.find(item => item.league.id === currentLeague.id)?.roster || []
      : teamData.reduce((sum, cur) => {
          if (cur.league.year === currentYear) {
            cur.roster.forEach(
              curPlayer =>
                !sum.find(
                  sumPlayer => sumPlayer.surname === curPlayer.surname && sumPlayer.name === curPlayer.name
                ) && sum.push(curPlayer)
            );
          }
          return sum;
        }, []);
  return (
    <ul className={cl.rows}>
      {PLAYERS_DATA.map((player, i) => (
        <ContentPlayersTableRow key={i} player={player} index={i} cl={cl} />
      ))}
    </ul>
  );
};

export default ContentPlayersTableBody;

import NoDataMessage from 'components/NoDataMessage/NoDataMessage';
import React, { useEffect, useMemo, useRef } from 'react';
import { useSelector } from 'react-redux';
import cl from './ContentTable.module.scss';
import ContentTableHeader from './ContentTableHeader';
import ContentTableList from './ContentTableList';
import ContentTableSubHeader from './ContentTableSubHeader';

const ContentTable = ({ games }) => {
  const currentStadium = useSelector(s => s.games.currentStadium);
  const currentLeague = useSelector(s => s.games.currentLeague);
  const currentHome = useSelector(s => s.games.currentHome);
  const currentGuests = useSelector(s => s.games.currentGuests);
  const mobileTableMode = useSelector(s => s.games.mobileTableMode);

  const currentGameType = useSelector(s => s.shared.currentGameType);
  const currentDate = useSelector(s => s.shared.currentDate);
  const isMobile = useSelector(s => s.shared.isMobile);

  const scrollItemRef = useRef(null);

  useEffect(() => {
    if (scrollItemRef.current === null) return;

    setTimeout(() => {
      if (!scrollItemRef.current) return;

      if (isMobile) {
        document.documentElement.scrollTop =
          scrollItemRef.current.offsetTop;
        return;
      }
      scrollItemRef.current.parentNode.scrollTop = scrollItemRef.current.offsetTop;
    }, 100);
  }, [currentDate, currentLeague, isMobile]);

  //Games filtering
  let filteredData = useMemo(() => {
    const filteredGames = games.filter(
      game =>
        (currentStadium !== 'All' ? game.stadium_name === currentStadium : true) &&
        (currentLeague.id !== -1 ? game.league_id === currentLeague.id : currentGameType === game.game_type)
      // 	&&
      // (currentHome !== 'All' ? game.owners_name === currentHome : true) &&
      // (currentGuests !== 'All' ? game.guests_name === currentGuests : true)
    );

    if (currentHome !== 'All' && currentGuests !== 'All') {
      return filteredGames.filter(
        game =>
          (game.owners_name === currentHome || game.owners_name === currentGuests) &&
          (game.guests_name === currentHome || game.guests_name === currentGuests)
      );
    }

    return currentHome !== 'All'
      ? filteredGames.filter(game => game.owners_name === currentHome || game.guests_name === currentHome)
      : currentGuests !== 'All'
      ? filteredGames.filter(game => game.owners_name === currentGuests || game.guests_name === currentGuests)
      : filteredGames;
  }, [games, currentStadium, currentLeague, currentGameType, currentHome, currentGuests]);

  //Games sorting
  filteredData = useMemo(
    () =>
      filteredData
        .sort((a, b) => (a.date > b.date ? 1 : -1))
        .sort((a, b) => (a.date === b.date && a.start_time < b.start_time ? -1 : 1)),
    [filteredData]
  );

  const isGamesEmpty = filteredData.length === 0;
  return (
    <div className={cl.wrapper}>
      <ContentTableHeader games={games} />

      {(!isMobile || mobileTableMode === 'Calendar') && JSON.stringify(currentDate) !== null && (
        <div className={cl.table}>
          <ContentTableSubHeader curLeagueId={currentLeague.id} games={games} />
          {!isGamesEmpty && <ContentTableList cl={cl} filteredData={filteredData} ref={scrollItemRef} />}
          {isGamesEmpty && <NoDataMessage text='There are no games for selected options.' />}
        </div>
      )}
    </div>
  );
};

export default ContentTable;

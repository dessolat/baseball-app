import { useMemo, useState } from 'react';
import cl from './ContentTable.module.scss';
import LeagueImage from 'images/league_image.png';
import { useDispatch, useSelector } from 'react-redux';
import Dropdown from 'components/UI/dropdown/GamesDropdown/Dropdown';
import { getShortName } from 'utils';
import { setCurrentGuests, setCurrentHome } from 'redux/gamesReducer';

const Logo = () => {
  const [isLoaded, setLoaded] = useState(false);

  const { logo: logoUrlPart } = useSelector(state => state.games.currentLeague);

  const imgUrl = `http://baseball-gametrack.ru/api/logo/${logoUrlPart}`;

  const pHolderStyles = isLoaded && logoUrlPart ? { display: 'none' } : {};
  const imgStyles = !isLoaded || !logoUrlPart ? { display: 'none' } : { marginLeft: 'unset' };
  return (
    <>
      <img src={LeagueImage} alt='league-img' style={pHolderStyles} />
      <img src={imgUrl} alt='league-img' style={imgStyles} onLoad={() => setLoaded(true)} />
    </>
  );
};

const ContentTeam = ({ games }) => {
  const currentLeague = useSelector(state => state.games.currentLeague);
  // const leaguesImages = useSelector(state => state.games.leaguesImages);
  const currentHome = useSelector(state => state.games.currentHome);
  const currentGuests = useSelector(state => state.games.currentGuests);

  const currentGameType = useSelector(state => state.shared.currentGameType);
  const isMobile = useSelector(state => state.shared.isMobile);

  const dispatch = useDispatch();

  const handleHomeDropdownClick = option => dispatch(setCurrentHome(option));
  const handleGuestsDropdownClick = option => dispatch(setCurrentGuests(option));

  const filteredHeadings = games.filter(game => {
    return currentLeague.id === -1 ? currentGameType === game.game_type : game.league_id === currentLeague.id;
  });

  //teamOptions calculation
  const teamOptions = useMemo(
    () =>
      Array.from(
        new Set(
          filteredHeadings.reduce(
            (sum, cur) => {
              sum.push(cur.owners_name);
              sum.push(cur.guests_name);
              return sum;
            },
            ['All']
          )
        )
      ),
    [filteredHeadings]
  );

  //teamOptions sorting
  useMemo(() => teamOptions.sort((a, b) => (a > b ? 1 : -1)), [teamOptions]);
  return (
    <div className={cl.teamWrapper}>
      <Logo />
      <div className={cl.teamName}>
        <h2>{currentLeague.name}</h2>
        <p className={cl.teamSearch}>Search game:</p>
        <div className={cl.teamFilters}>
          <div className={cl.teamSelector}>
            <Dropdown
              title={getShortName(currentHome, 18)}
              options={teamOptions}
              currentOption={currentHome}
              handleClick={handleHomeDropdownClick}
              listStyles={{ left: '-1rem', width: 'calc(100% + 1rem)' }}
              searchField={true}
            />
          </div>
          <span>VS</span>
          <div className={cl.teamSelector}>
            <Dropdown
              title={getShortName(currentGuests, 18)}
              options={teamOptions}
              currentOption={currentGuests}
              handleClick={handleGuestsDropdownClick}
              listWrapperStyles={isMobile ? { left: '-30vw' } : null}
              listStyles={{ left: !isMobile ? '-1rem' : '-10vh', width: 'calc(100% + 1rem)' }}
              searchField={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentTeam;

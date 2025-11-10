import React, { useState, useLayoutEffect } from 'react';
import TeamLogo from 'images/team_logo.png';
import HeaderSelectionsTeamName from './HeaderSelectionsTeamName';
import HeaderSelectionsLinks from './HeaderSelectionsLinks';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import RoundLoader from 'components/UI/loaders/RoundLoader/RoundLoader';
import { getDomen } from 'utils';

const Logo = ({ cl }) => {
  const [isLoaded, setLoaded] = useState(false);

  const [league] = useSelector(state => state.teamGames.teamData);

  const { teamName } = useParams();

  useLayoutEffect(() => {
    setLoaded(false);
  }, [teamName]);

  const pHolderStyles = league.logo ? { display: 'none' } : {};
  const loaderStyles = isLoaded || !league.logo ? { display: 'none' } : {};
  const imgStyles = !isLoaded || !league.logo ? { display: 'none' } : {};
  return (
    <>
      <div className={cl.imgWrapper}>
        <div className={cl.imgLoader} style={loaderStyles}>
          <RoundLoader />
        </div>
        <img src={TeamLogo} alt='' className={cl.teamImg} style={pHolderStyles} />
        <img
          src={`${getDomen()}/logo/${league.logo}`}
          alt=''
          className={cl.teamImg}
          onLoad={() => setLoaded(true)}
          style={imgStyles}
        />
      </div>
    </>
  );
};

const HeaderSelectionsTeamInfo = ({ cl }) => (
  <div className={cl.teamInfo}>
    <Logo cl={cl} />
    <HeaderSelectionsTeamName teamClass={cl.teamName} />
    <HeaderSelectionsLinks wrapperClass={cl.linksWrapper} />
  </div>
);

export default HeaderSelectionsTeamInfo;

import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import ContentHeaderModeLinks from './ContentHeaderModeLinks';
import cl from './ContentMobileHeader.module.scss';

const ContentMobileHeader = () => {
  const { teamName } = useParams();

  const mobileTableMode = useSelector(state => state.teamGames.mobileTableMode);

  const statsLink =
    mobileTableMode === 'Calendar' ? (
      <Link to={`/stats/team`}>Go to Team Stat</Link>
    ) : (
      <Link to={`/stats/player?team=${teamName}`}>Go to Player Stat</Link>
    );
  return (
    <div className={cl.mobileHeader}>
      <ContentHeaderModeLinks />
      <div className={cl.linkWrapper}>{statsLink}</div>
    </div>
  );
};

export default ContentMobileHeader;

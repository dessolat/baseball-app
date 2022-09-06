import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

const ContentMobileHeaderStatsLink = ({ wrapperClass }) => {
  const { teamName } = useParams();

  const mobileTableMode = useSelector(state => state.teamGames.mobileTableMode);

  const statsLink =
    mobileTableMode === 'Calendar' ? (
      <Link to={`/stats/team`}>Go to Team Stat</Link>
    ) : (
      <Link to={`/stats/player?team=${teamName}`}>Go to Player Stat</Link>
    );
  return <div className={wrapperClass}>{statsLink}</div>;
};

export default ContentMobileHeaderStatsLink;

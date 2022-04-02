import React from 'react';
import { Link } from 'react-router-dom';
import ContentHeaderModeLinks from './ContentHeaderModeLinks';
import cl from './ContentMobileHeader.module.scss';

const ContentMobileHeader = () => {
  return (
    <div className={cl.mobileHeader}>
      <ContentHeaderModeLinks />
			<div className={cl.linkWrapper}>
        <Link to='/stats/player'>Go to Player Stat</Link>
      </div>
    </div>
  );
};

export default ContentMobileHeader;

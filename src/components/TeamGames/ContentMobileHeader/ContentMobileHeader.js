import React from 'react';
import ContentHeaderModeLinks from './ContentHeaderModeLinks';
import cl from './ContentMobileHeader.module.scss';
import ContentMobileHeaderStatsLink from './ContentMobileHeaderStatsLink';

const ContentMobileHeader = () => {
  return (
    <div className={cl.mobileHeader}>
      <ContentHeaderModeLinks />
      <ContentMobileHeaderStatsLink wrapperClass={cl.linkWrapper} />
    </div>
  );
};

export default ContentMobileHeader;

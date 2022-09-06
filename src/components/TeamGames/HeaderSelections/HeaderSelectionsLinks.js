import React from 'react';
import ContentHeaderModeLinks from '../ContentMobileHeader/ContentHeaderModeLinks';

const HeaderSelectionsLinks = ({ wrapperClass }) => {
  return (
    <div className={wrapperClass}>
      <ContentHeaderModeLinks />
    </div>
  );
};

export default HeaderSelectionsLinks;

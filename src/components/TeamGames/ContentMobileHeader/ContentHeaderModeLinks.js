import React from 'react';
import ContentHeaderModeLink from './ContentHeaderModeLink';
import cl from './ContentMobileHeader.module.scss';

const ContentHeaderModeLinks = () => {
  return (
    <div className={cl.tableModes}>
      <ContentHeaderModeLink title='Players' cl={cl} />
      <ContentHeaderModeLink title='Calendar' cl={cl} />
    </div>
  );
};

export default ContentHeaderModeLinks;

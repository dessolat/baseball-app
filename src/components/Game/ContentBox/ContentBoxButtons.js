import React from 'react';
import cl from './ContentBox.module.scss';
import ContentBoxButton from './ContentBoxButton';

const ContentBoxButtons = () => {
  return (
    <div className={cl.buttons}>
      <ContentBoxButton team={'guests'} />
      <ContentBoxButton team={'owners'} />
      {/* <span className={getClassName('guests')} onClick={handleButtonClick('guests')}>
        {preview && getShortName(preview.guests.name, 8)}
      </span>
      <span className={getClassName('owners')} onClick={handleButtonClick('owners')}>
        {preview && getShortName(preview.owners.name, 8)}
      </span> */}
    </div>
  );
};

export default ContentBoxButtons;

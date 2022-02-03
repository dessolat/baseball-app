import React from 'react';
import cl from './ContentGraphics.module.scss';
import Videos from '../Videos/Videos';
import Plays from '../Plays/Plays';

const ContentGraphics = ({ currentTab, isVideo }) => {
  const renderTab = () => {
    switch (currentTab) {
      case 'videos':
        return isVideo ? <Videos /> : <Plays isVideo={isVideo} />;
      default:
        return <Plays isVideo={isVideo} />;
    }
  };

  return <div className={cl.graphics}>{renderTab()}</div>;
};

export default ContentGraphics;

import React from 'react';
import cl from './ContentGraphics.module.scss';
import Videos from '../Videos/Videos';
import Plays from '../Plays/Plays';

const ContentGraphics = ({ currentTab }) => {
  const renderTab = () => {
    switch (currentTab) {
      case 'lineup':
      case 'box':
        return <></>;
      case 'videos':
        return <Videos />;
      default:
        return <Plays />;
    }
  };

  return <div className={cl.graphics}>{renderTab()}</div>;
};

export default ContentGraphics;

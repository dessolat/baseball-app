import React from 'react';
import cl from './ContentGraphics.module.scss';
import Videos from '../Videos/Videos';
import Plays from '../Plays/Plays';
import { useSearchParams } from 'react-router-dom';

const ContentGraphics = () => {
  const [searchParams] = useSearchParams();

  const renderTab = tab => {
    switch (tab) {
      case 'lineup':
      case 'box':
        return <></>;
      case 'videos':
        return <Videos />;
      default:
        return <Plays />;
    }
  };

  return <div className={cl.graphics}>{renderTab(searchParams.get('tab'))}</div>;
};

export default ContentGraphics;

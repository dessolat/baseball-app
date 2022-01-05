import React from 'react';
import cl from './ContentGraphics.module.scss';
import Videos from '../Videos/Videos';
import Plays from '../Plays/Plays';
import { StringParam, useQueryParam } from 'use-query-params';

const ContentGraphics = () => {
	const [tab] = useQueryParam('tab', StringParam)

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

  return <div className={cl.graphics}>{renderTab(tab)}</div>;
};

export default ContentGraphics;

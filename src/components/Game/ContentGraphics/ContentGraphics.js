import React from 'react';
import cl from './ContentGraphics.module.scss';
import Videos from '../Videos/Videos';
import Plays from '../Plays/Plays';
// import { useSearchParams } from 'react-router-dom';
import { StringParam, useQueryParam } from 'use-query-params';

const ContentGraphics = () => {
  // const [searchParams] = useSearchParams();
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

  // return <div className={cl.graphics}>{renderTab(searchParams.get('tab'))}</div>;
  return <div className={cl.graphics}>{renderTab(tab)}</div>;
};

export default ContentGraphics;

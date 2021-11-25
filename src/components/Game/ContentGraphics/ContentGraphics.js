import React from 'react';
import cl from './ContentGraphics.module.scss';
import PlaysImg from 'images/plays.jpg';
import ContentVideos from '../ContentVideos/ContentVideos';
import { useSearchParams } from 'react-router-dom';

const ContentGraphics = () => {
	const [searchParams] = useSearchParams();

  const renderTab = tab => {
    switch (tab) {
      case 'lineup':
      case 'box':
        return <></>;
      case 'plays':
        return <img src={PlaysImg} alt='plays' width='100%' />;
      default:
        return <ContentVideos />;
    }
  };

  return <div className={cl.graphics}>{renderTab(searchParams.get('tab'))}</div>;
};

export default ContentGraphics;

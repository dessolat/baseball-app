import React from 'react';
import ContentVideo from '../ContentVideo/ContentVideo';
import cl from './ContentVideos.module.scss';

const ContentVideos = ({ viewMode }) => {
  return (
    <div className={cl.wrapper}>
      <ContentVideo />
    </div>
  );
};

export default ContentVideos;

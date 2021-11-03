import React from 'react';
import ContentVideo from '../ContentVideo/ContentVideo';
import cl from './ContentVideos.module.scss';

const ContentVideos = ({ viewMode, events }) => {
  return (
    <div className={cl.wrapper}>
      <ContentVideo events={events}/>
    </div>
  );
};

export default ContentVideos;

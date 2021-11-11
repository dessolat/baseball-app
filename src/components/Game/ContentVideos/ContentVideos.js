import React from 'react';
import ContentVideo from '../ContentVideo/ContentVideo';
import cl from './ContentVideos.module.scss';

const ContentVideos = ({ currentCard }) => {
  return (
    <div className={cl.wrapper}>
      <ContentVideo currentCard={currentCard}/>
    </div>
  );
};

export default ContentVideos;

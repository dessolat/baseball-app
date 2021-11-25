import React from 'react';
import cl from './ContentVideo.module.scss';
import ContentVideoEventsList from '../ContentVideoEventsList/ContentVideoEventsList';

const ContentVideo = () => {
  return (
    <div className={cl.videoWrapper + ' ' + cl.videoOne}>
      <iframe
        width='100%'
        height='100%'
        src='https://www.youtube.com/embed/gN7RdRGmBF4?autoplay=1'
        title='YouTube video player'
        frameBorder='0'
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
        allowFullScreen></iframe>
      <ContentVideoEventsList />
    </div>
  );
};

export default ContentVideo;

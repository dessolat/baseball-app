import React from 'react';
import ContentVideoEventsList from '../ContentVideoEventsList/ContentVideoEventsList';
import cl from './ContentVideo.module.scss';

const ContentVideo = ({events}) => {
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
      <ContentVideoEventsList events={events}/>
    </div>
  );
};

export default ContentVideo;

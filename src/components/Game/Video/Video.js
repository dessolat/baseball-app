import React from 'react';
import cl from './Video.module.scss';
import VideoEventsList from '../VideoEventsList/VideoEventsList';

const Video = () => {
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
      <VideoEventsList />
    </div>
  );
};

export default Video;

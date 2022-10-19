import React from 'react';
import CanvasComp from './CanvasComp';
import cl from './Content.module.scss';

const Content = () => {
  return (
    <div className={cl.wrapper}>
      <iframe
        width='560'
        height='315'
        className={cl.youtubeFrame}
        src='https://www.youtube.com/embed/kxXaIHi1j4w?controls=0'
        title='YouTube video player'
        frameborder='0'
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
        allowfullscreen></iframe>
      <CanvasComp cl={cl} />
    </div>
  );
};

export default Content;

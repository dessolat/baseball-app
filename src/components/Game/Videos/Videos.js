import React from 'react';
import Video from '../Video/Video';
import cl from './Videos.module.scss';

const Videos = () => {
  return (
    <div className={cl.wrapper}>
      <Video />
    </div>
  );
};

export default Videos;

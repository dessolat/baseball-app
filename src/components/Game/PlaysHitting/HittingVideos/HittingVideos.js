import React from 'react';
import cl from '../PlaysHitting.module.scss';
import TopImage from 'images/hit_top_image.jpg';
import BottomImage from 'images/hit_bottom_image.jpg';

const HittingVideos = () => {
  return (
    <div className={cl.videos}>
      <div>
        <img src={TopImage} alt='hit-image' />
      </div>
      <div>
        <img src={TopImage} alt='hit-image' />
      </div>
      <div>
        <img src={BottomImage} alt='hit-image' />
      </div>
      <div>
        <img src={BottomImage} alt='hit-image' />
      </div>
    </div>
  );
};

export default HittingVideos;

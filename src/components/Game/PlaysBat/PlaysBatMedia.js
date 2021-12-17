import React from 'react';
import cl from './PlaysBat.module.scss';
// import BatterImg from 'images/batter.jpg';
const oldCoords = [
  [35, 40],
  [50, 74],
  [95, 88],
  [140, 95],
  [185, 97],
  [230, 98],
  [275, 98],
  [320, 91],
  [335, 75],
  [355, 185],
  [353, 200],
  [290, 210],
  [235, 215],
  [180, 218],
  [125, 218],
  [70, 215],
  [20, 213],
  [0, 200]
];

const PlaysBatMedia = () => {
  return (
    <div className={cl.batter}>
      <img src={BatterImg} alt='batter' />
    </div>
  );
};

export default PlaysBatMedia;

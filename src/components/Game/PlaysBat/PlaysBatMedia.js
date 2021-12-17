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

let coords = [];
for (let i = 0; i < oldCoords.length; i++) {
  if (i === 0) {
    coords.push(oldCoords[i]);
    continue;
  }

  let xDiff = oldCoords[i][0] - oldCoords[i - 1][0];
  let yDiff = oldCoords[i][1] - oldCoords[i - 1][1];

  for (let j = 1; j <= 10; j++) {
    coords.push([oldCoords[i-1][0] + (xDiff / 10) * j, oldCoords[i-1][1] + (yDiff / 10) * j]);
  }
}
const PlaysBatMedia = ({ currentMoment }) => {
  return (
    <div className={cl.batter}>
      <img src={BatterImg} alt='batter' />
    </div>
  );
};

export default PlaysBatMedia;

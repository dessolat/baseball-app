import React from 'react';
import cl from './PlaysBat.module.scss';

// const oldCoords = [
//   [35, 40],
//   [50, 74],
//   [95, 88],
//   [140, 95],
//   [185, 97],
//   [230, 98],
//   [275, 98],
//   [320, 91],
//   [335, 75],
//   [355, 185],
//   [353, 200],
//   [290, 210],
//   [235, 215],
//   [180, 218],
//   [125, 218],
//   [70, 215],
//   [20, 213],
//   [0, 200]
// ];

// let coords = [];
// for (let i = 0; i < oldCoords.length; i++) {
//   if (i === 0) {
//     coords.push(oldCoords[i]);
//     continue;
//   }

//   let xDiff = oldCoords[i][0] - oldCoords[i - 1][0];
//   let yDiff = oldCoords[i][1] - oldCoords[i - 1][1];

//   for (let j = 1; j <= 10; j++) {
//     coords.push([oldCoords[i - 1][0] + (xDiff / 10) * j, oldCoords[i - 1][1] + (yDiff / 10) * j]);
//   }
// }

const PlaysBatMedia = ({ metering, curvePath, linesPaths, currentLine }) => {
  const batterClasses = [cl.batter];
  metering?.bat?.batter_position && batterClasses.push(cl.leftHanded);

  const getLineColor = name => (currentLine === name ? '#1A4C96' : '#9E9E9E');
  return (
    <div className={batterClasses.join(' ')}>
      <svg
        width='100%'
        height='100%'
        viewBox='0 0 830 550'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        preserveAspectRatio='none'>
        <path
          opacity='0.45'
					// fillRule='evenodd'
          // clipRule='evenodd'
          d={curvePath}
          fill='url(#paint0_linear_486_642)'
        />
        <path d={linesPaths[0]} stroke={getLineColor('line0')} strokeWidth='1.5' />
        <path d={linesPaths[1]} stroke={getLineColor('line1')} strokeWidth='1.5' />
        <path d={linesPaths[2]} stroke={getLineColor('line2')} strokeWidth='1.5' />
        <defs>
          <linearGradient
            id='paint0_linear_486_642'
            x1='301.463'
            y1='89.5204'
            x2='-34.5833'
            y2='149.631'
            gradientUnits='userSpaceOnUse'>
            <stop stopColor='#4AA0F0' />
            <stop offset='0.0001' stopColor='#4AA0F0' />
            <stop offset='0.281315' stopColor='#4AA0F0' />
            <stop offset='0.651425' stopColor='#4AA0F0' stopOpacity='0.39963' />
            <stop offset='1' stopColor='#4AA0F0' />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default PlaysBatMedia;

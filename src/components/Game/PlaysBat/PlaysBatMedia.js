import React from 'react';
import cl from './PlaysBat.module.scss';

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

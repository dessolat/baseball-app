import React from 'react';
import cl from './PlaysStats.module.scss';

const PlaysStats = () => {
  return (
    <div className={cl.stats}>
      <svg width='100%' height='222' viewBox='0 0 360 222' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <path
          d='M19.9276 56.3029H26.0592H30.6579H35.5631H38.3223H45.6802H52.4249H57.0236L73.8854 55.3816L109.449 58.4527L141.946 68.5873L179.348 81.1787L227.175 102.369L280.519 128.166L343.368 167.476L49.3592 217.842L41.6947 220.299L33.1105 221.527H23.6066L15.9421 220.299L11.0368 218.456L6.13157 215.385L2.14605 210.779L0.613157 207.093L0 202.487V198.187L3.67894 176.075L19.9276 56.3029Z'
          fill='#BFE2C1'
        />
        <path
          d='M342.962 167.73C335.926 163.449 256.721 119.717 179.962 84.2432C95.5575 53.3561 75.3739 57.0259 20.3287 56.7202C61.0028 45.711 120.023 34.7016 203.816 66.5061C280.88 98.0048 288.833 118.8 342.962 167.73Z'
          fill='#BFE2C1'
        />
        <path
          d='M44.6977 116.566L53.5082 114.083L65.9644 110.671L76.2939 108.499L88.1425 106.947L102.422 106.017H114.574L127.03 107.568L140.702 111.291L149.816 115.014L158.019 121.219L164.095 127.425L168.956 135.181L172.298 143.248L174.728 151.625L175.64 162.174L129.157 172.103L67.7872 183.582L66.8758 185.754L65.053 189.167L62.3187 192.27L57.7615 195.993L51.3815 199.095L43.1787 200.957H38.0139H34.3682L30.1149 199.716L26.773 197.234L24.6463 194.442L23.7349 190.718L24.6463 186.375L26.1653 182.652L29.2034 178.928L32.2415 176.446L34.9758 174.585L38.9253 172.413L43.1787 171.172L44.6977 116.566Z'
          fill='#E8E6E6'
        />
        <rect
          x='48.4592'
          y='180.822'
          width='305.813'
          height='1.22325'
          transform='rotate(-11 48.4592 180.822)'
          fill='white'
        />
        <rect
          x='305.979'
          y='67.4233'
          width='1.22325'
          height='73.395'
          transform='rotate(20 305.979 67.4233)'
          fill='#FFAB00'
        />
        <rect
          x='54.7761'
          y='45.2903'
          width='1.22325'
          height='135.419'
          transform='rotate(4 54.7761 45.2903)'
          fill='white'
        />
        <rect
          x='44.7876'
          y='21.7639'
          width='1.22325'
          height='48.3184'
          transform='rotate(-10 44.7876 21.7639)'
          fill='#FFAB00'
        />
        <g filter='url(#filter0_d_486_653)'>
          <path
            d='M121.556 125.389L106.443 120.258L70.2925 125.992L69.1072 127.803L67.6256 129.011L64.0698 130.218L61.1066 130.822L58.1434 131.727L54.2913 132.331L52.217 167.645L54.5876 167.344L57.2545 167.645L59.3287 168.249L61.4029 169.155L63.4771 170.362L65.5514 172.475L128.371 160.1L127.186 157.987L126.593 156.779L126.297 155.572V154.063L126.593 152.554L127.482 151.045L128.964 149.837L131.334 147.724L121.556 125.389Z'
            fill='#BFE2C1'
          />
        </g>
        <ellipse
          cx='88.2416'
          cy='147.879'
          rx='8.86856'
          ry='5.19881'
          transform='rotate(-13 88.2416 147.879)'
          fill='#E8E6E6'
        />
        <path
          d='M167.726 70.4813C162.833 40.8175 152.436 -6.58324 125.22 11.1539C88.2161 38.9827 77.5126 95.558 46.166 180.115C63.1394 142.347 90.6615 35.6189 125.22 13.6002C161.251 -9.35638 167.726 82.1022 167.726 70.4813Z'
          fill='#4AA0F0'
        />
        <defs>
          <filter
            id='filter0_d_486_653'
            x='48.217'
            y='118.258'
            width='87.1169'
            height='60.2173'
            filterUnits='userSpaceOnUse'
            colorInterpolationFilters='sRGB'>
            <feFlood floodOpacity='0' result='BackgroundImageFix' />
            <feColorMatrix
              in='SourceAlpha'
              type='matrix'
              values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
              result='hardAlpha'
            />
            <feOffset dy='2' />
            <feGaussianBlur stdDeviation='2' />
            <feComposite in2='hardAlpha' operator='out' />
            <feColorMatrix type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0' />
            <feBlend mode='normal' in2='BackgroundImageFix' result='effect1_dropShadow_486_653' />
            <feBlend mode='normal' in='SourceGraphic' in2='effect1_dropShadow_486_653' result='shape' />
          </filter>
        </defs>
      </svg>
      <div className={cl.info}>
        <p className={cl.row}>
          <span className={cl.title}>At Bats</span>
          <span className={cl.value}>2</span>
        </p>
        <p className={cl.row}>
          <span className={cl.title}>Hits</span>
          <span className={cl.value}>0</span>
        </p>
        <p className={cl.row}>
          <span className={cl.title}>Runs</span>
          <span className={cl.value}>0</span>
        </p>
        <p className={cl.row}>
          <span className={cl.title}>Exit Velocity</span>
          <span className={cl.value}>91.0 mph</span>
        </p>
        <p className={cl.row}>
          <span className={cl.title}>Launch Angle</span>
          <span className={cl.value}>41°</span>
        </p>
        <p className={cl.row}>
          <span className={cl.title}>Height</span>
          <span className={cl.value}>37.2 m</span>
        </p>
        <p className={cl.row}>
          <span className={cl.title}>Distance</span>
          <span className={cl.value}>132.6 m</span>
        </p>
      </div>
    </div>
  );
};

export default PlaysStats;

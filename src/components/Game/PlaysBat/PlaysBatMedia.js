import React, { useState, useEffect, useRef } from 'react';
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
  const [curvePath, setCurvePath] = useState('');
  const [frame, setFrame] = useState(0);
  const maxFrameRef = useRef(null);
	const timeoutRef = useRef(null)
  // let curvePath = `M${coords[0][0]} ${coords[0][1]}`;
  // coords.slice(1).forEach(coord => (curvePath += `L${coord[0]} ${coord[1]}`));
  // console.log(curvePath);

  useEffect(() => {
		clearTimeout(timeoutRef.current)
    // if (Object.keys(currentMoment).length === 0) {
			// setCurvePath('')
			// return}
    maxFrameRef.current = coords.length / 2;
    setFrame(1);
  }, [currentMoment]);

  useEffect(() => {
		if (frame === 0) return
    if (frame > maxFrameRef.current) {
      maxFrameRef.current = null;
      return;
    }

    let newCurve = '';
    coords
      .slice(0, frame)
      .forEach(
        (coord, i) => (newCurve += i === 0 ? `M${coords[0][0]} ${coords[0][1]}` : `L${coord[0]} ${coord[1]}`)
      );

    let backPath = '';
    coords
      .slice()
      .reverse()
      .slice(0, frame)
      .forEach(coord => (backPath = `L${coord[0]} ${coord[1]}` + backPath));
    newCurve += backPath;
    setCurvePath(newCurve);

    timeoutRef.current = setTimeout(() => setFrame(prev => prev + 1), 10);
  }, [frame]);

  return (
    <div className={cl.batter}>
      <svg width='100%' height='235' viewBox='0 0 355 235' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <path
          opacity='0.45'
          fillRule='evenodd'
          clipRule='evenodd'
          // d='M67.5102 42.1281L66.1976 42.7898L68.6587 45.106L67.5102 50.0691L66.6899 56.1904V62.8079V62.9961L57.4038 70.8727L48.5941 79.9108L36.8478 93.0571L28.5274 104.231L21.186 116.556L15.476 131.346L14.334 141.863L15.476 151.558L17.9231 159.939L22.8174 167.662L30.4852 175.221L39.6212 180.973L50.5518 186.231L63.7664 190.668L80.2439 193.955L98.0265 195.598L117.441 196.42L140.933 195.598L169.646 191.819L199.765 186.185L196.01 160.109L199.79 186.185L233.013 178.761L256.139 173.482L275.03 167.708L290.013 162.594L307.439 155.336L318.676 149.892L328.122 143.953L336.265 138.014L342.942 132.24L350.108 123.332L352.55 119.537L353.528 116.073L354.83 110.299V106.505L354.342 102.546L353.039 98.2565L350.27 94.2972L346.688 89.5132L342.29 84.894L335.776 79.6151L326.982 74.0061L314.279 67.0775L300.11 59.4889L286.43 53.3851L275.03 48.601L265.748 43.652L222.753 57.6743L225.033 61.4685L229.43 68.7271L231.71 76.3157V82.0896L229.756 91.1628L225.359 96.6068L220.636 100.566L214.448 103.535L202.885 106.175L188.718 108.484L188.716 108.474L172.093 110.476L154.8 110.805L134.407 109.326L119.235 107.682L104.063 104.067L90.5219 99.6302L83.1804 96.3437L82.8397 96.0317L76.6983 88.7818L75.3857 87.1274L74.7294 85.473L74.4013 83.9841V82.1642L74.7294 77.6974L75.3857 75.5467L76.6983 72.8997L81.6204 62.8079L91.957 49.0765L101.473 39.8119L111.974 30.7128L123.295 21.2828L147.578 6.72417L151.515 4.07715L154.14 2.25733V0.4375H151.515L148.398 1.09925L145.773 2.25733L136.092 8.04768L115.255 19.463L93.1055 29.8856L77.0264 37.6612L67.5102 42.1281Z'
          d={curvePath}
          // stroke='#1A4C96'
          fill='url(#paint0_linear_486_642)'
        />
        {/* <path d='M190.136 103.792L221.99 187.98' stroke='#1A4C96' stroke-width='0.5' />
        <path d='M225.616 89.5567L283.278 168.864' stroke='#9E9E9E' stroke-width='0.5' />
        <path d='M83.2852 88.7434L21.9963 177.812' stroke='#9E9E9E' stroke-width='0.5' />
        <path d='M219.169 59.054L270.779 41.9724' stroke='#9E9E9E' stroke-width='0.5' /> */}
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

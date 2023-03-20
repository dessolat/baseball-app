import { degToRad } from 'three/src/math/MathUtils';
import BgLayout from './BgLayout';
import cl from './HitsAnglesGraph.module.scss';

const PARAMS = {
  GRAPH_WIDTH: 307,
  GRAPH_HEIGHT: 423,
  LINE_WIDTH: 180,
  ZERO_X: 98.45,
  ZERO_Y: 230.35
  // GRAPH_WIDTH: 313,
  // GRAPH_HEIGHT: 428
};

const HitsAnglesGraph = () => {
  let path = `M${PARAMS.ZERO_X},${PARAMS.ZERO_Y}`;

  let secondDotXCoord = PARAMS.LINE_WIDTH * 0.55 * Math.cos(degToRad(20)) + PARAMS.ZERO_X;
  let secondDotYCoord = PARAMS.ZERO_Y - PARAMS.LINE_WIDTH * 0.55 * Math.sin(degToRad(20));
  path += `L${secondDotXCoord},${secondDotYCoord}`;

	let centerDotXCoord = PARAMS.LINE_WIDTH * 0.5555 * Math.cos(degToRad(15)) + PARAMS.ZERO_X;
  let centerDotYCoord = PARAMS.ZERO_Y - PARAMS.LINE_WIDTH * 0.5555 * Math.sin(degToRad(15));
	
  let thirdDotXCoord = PARAMS.LINE_WIDTH * 0.55 * Math.cos(degToRad(10)) + PARAMS.ZERO_X;
  let thirdDotYCoord = PARAMS.ZERO_Y - PARAMS.LINE_WIDTH * 0.55 * Math.sin(degToRad(10));

  path += `Q${centerDotXCoord},${centerDotYCoord} ${thirdDotXCoord},${thirdDotYCoord}Z`;
	

  return (
    <svg
      width='307'
      height='423'
      viewBox='0 0 307 423'
      fill='none'
      className={cl.graph}
      xmlns='http://www.w3.org/2000/svg'>
      <BgLayout />
      {/* <circle r={1} stroke='red' cx={PARAMS.ZERO_X} cy={PARAMS.ZERO_Y} />
      <circle r={1} stroke='red' cx={centerDotXCoord} cy={centerDotYCoord} /> */}
			<path d={path} fill='lightblue'/>
    </svg>
  );
};

export default HitsAnglesGraph;

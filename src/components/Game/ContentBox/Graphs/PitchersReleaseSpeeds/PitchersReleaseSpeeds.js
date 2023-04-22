import cl from './PitchersReleaseSpeeds.module.scss';
const PARAMS = {
	WRAPPER_WIDTH: 1248,
	WRAPPER_HEIGHT: 330
}

const PitchersReleaseSpeeds = () => {
  return (
    <svg
      viewBox={`0 0 ${PARAMS.WRAPPER_WIDTH} ${PARAMS.WRAPPER_HEIGHT}`}
      width='100%'
      fill='none'
      className={cl.graph}
      xmlns='http://www.w3.org/2000/svg'>
      
    </svg>
  );
};

export default PitchersReleaseSpeeds;

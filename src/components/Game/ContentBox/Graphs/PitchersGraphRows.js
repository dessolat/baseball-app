import GraphsBlock from './GraphsBlock';
import GraphsHeader from './GraphsHeader/GraphsHeader';
import ThreeGraphsRow from './ThreeGraphsRow/ThreeGraphsRow';

const PitchersGraphRow = () => (
  <GraphsBlock defaultOption='Types'>
    {(currentOption, setCurrentOption) => (
      <>
        <GraphsHeader
          subTitle='Yuniel Lasaro Moralez Rodriges pitches by zone, speed, movement and frequency'
          noSelector
        />
        <ThreeGraphsRow currentOption={currentOption} setCurrentOption={setCurrentOption} />
      </>
    )}
  </GraphsBlock>
);

const PitchersGraphRows = () => {
  const pitchersArr = new Array(4).fill('');
	
  return (
    <>
      {pitchersArr.map((_, i) => (
        <PitchersGraphRow key={i} />
      ))}
    </>
  );
};

export default PitchersGraphRows;

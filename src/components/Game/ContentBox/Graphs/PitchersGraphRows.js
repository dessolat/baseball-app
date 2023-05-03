import GraphsBlock from './GraphsBlock';
import GraphsHeader from './GraphsHeader/GraphsHeader';
import ThreeGraphsRow from './ThreeGraphsRow/ThreeGraphsRow';

const PitchersGraphRow = ({ pitcher }) => (
  <GraphsBlock defaultOption='Types'>
    {(currentOption, setCurrentOption) => (
      <>
        <GraphsHeader
          subTitle={`${pitcher.preview.pitcher_name} ${pitcher.preview.pitcher_surname} pitches by zone, speed, movement and frequency`}
          noSelector
        />
        <ThreeGraphsRow currentOption={currentOption} setCurrentOption={setCurrentOption} pitcher={pitcher} />
      </>
    )}
  </GraphsBlock>
);

const PitchersGraphRows = ({ metrix }) => {
  return (
    <>
      {metrix.map((pitcher, i) => (
        <PitchersGraphRow key={i} pitcher={pitcher} />
      ))}
    </>
  );
};

export default PitchersGraphRows;

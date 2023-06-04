import GraphsBlock from './GraphsBlock';
import PitchesTrajectories from './PitchesTrajectories/PitchesTrajectories';
import GraphsHeader from './GraphsHeader/GraphsHeader';
import BattersTable from './BattersTable/BattersTable';
import PitchersReleaseSpeeds from './PitchersReleaseSpeeds/PitchersReleaseSpeeds';
import PitchersGraphRows from './PitchersGraphRows';

const Graphs = ({ graphsData }) => {
  const { batters_metrix: battersMetrix, pitchers_metrix: pitchersMetrix, name: teamName } = graphsData;

  return (
    <div className='container'>
      <GraphsBlock noSelector>
        <GraphsHeader
          title='Machine vision statistics'
          subTitle={`${teamName} Batters Hits`}
          noSelector
        />
        <PitchesTrajectories metrix={battersMetrix} />
      </GraphsBlock>
      <GraphsBlock noSelector style={{ lineHeight: 'unset' }}>
        <BattersTable metrix={battersMetrix} />
      </GraphsBlock>
      <GraphsBlock noSelector>
        <GraphsHeader subTitle={`${teamName} pitchers Release speed, mph`} noSelector />
        <PitchersReleaseSpeeds metrix={pitchersMetrix} />
      </GraphsBlock>
      {/* <PitchersGraphRows metrix={pitchersMetrix} /> */}
    </div>
  );
};

export default Graphs;

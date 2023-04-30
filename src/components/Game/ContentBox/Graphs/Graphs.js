import GraphsBlock from './GraphsBlock';
import PitchesTrajectories from './PitchesTrajectories/PitchesTrajectories';
import GraphsHeader from './GraphsHeader/GraphsHeader';
import { useSelector } from 'react-redux';
import BattersTable from './BattersTable/BattersTable';
import PitchersReleaseSpeeds from './PitchersReleaseSpeeds/PitchersReleaseSpeeds';
import PitchersGraphRows from './PitchersGraphRows';

const Graphs = ({ graphsData }) => {
	const {batters_metrix: battersMetrix, pitchers_metrix: pitchersMetrix} = graphsData

  const { preview, boxActiveButton } = useSelector(s => s.game);

  return (
    <div className='container'>
      <GraphsBlock noSelector>
        <GraphsHeader
          title='Machine vision statistics'
          subTitle={`${preview[boxActiveButton].name} Batters Hits`}
          noSelector
        />
        <PitchesTrajectories metrix={battersMetrix} />
      </GraphsBlock>
      <GraphsBlock noSelector style={{ lineHeight: 'unset' }}>
        <BattersTable />
      </GraphsBlock>
      <GraphsBlock noSelector>
        <GraphsHeader subTitle={`${preview[boxActiveButton].name} pitchers Release speed, mph`} noSelector />
        <PitchersReleaseSpeeds />
      </GraphsBlock>
      <PitchersGraphRows />
    </div>
  );
};

export default Graphs;

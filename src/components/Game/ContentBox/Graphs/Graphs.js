import GraphsBlock from './GraphsBlock';
import PitchesTrajectories from './PitchesTrajectories/PitchesTrajectories';
import GraphsHeader from './GraphsHeader/GraphsHeader';
import { useSelector } from 'react-redux';
import BattersTable from './BattersTable/BattersTable';

const Graphs = () => {
  const { preview, boxActiveButton } = useSelector(s => s.game);

  return (
    <div className='container'>
      <GraphsBlock noSelector>
        <GraphsHeader
          title='Machine vision statistics'
          subTitle={`${preview[boxActiveButton].name} Batters Hits`}
          noSelector
        />
        <PitchesTrajectories data={[]} />
      </GraphsBlock>
      <GraphsBlock noSelector style={{ lineHeight: 'unset' }}>
        <BattersTable />
      </GraphsBlock>
    </div>
  );
};

export default Graphs;

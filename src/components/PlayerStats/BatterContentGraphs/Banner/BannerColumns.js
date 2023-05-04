import TotalInfo from './Groups/TotalInfo';
import CommonGroup from './Groups/CommonGroup';
import CountsDistribution from './Groups/CountsDistribution';

const BannerColumns = ({ parentObj }) => {
  const GROUPS_PARAMS = {
    PlateAppearance: [
      { par1: 'SO', par2: null },
      { par1: 'BB', par2: 'HBP' },
      { par1: 'H', par2: null },
      { par1: 'PO', par2: null },
      { par1: 'E', par2: null }
    ],
    OutsDistribution: [
      { par1: 'FO', par2: null },
      { par1: 'GO', par2: null },
      { par1: 'FC', par2: null }
    ],
    PitchesBySwingDistribution: [
      { par1: 'Swing', par2: null },
      { par1: 'Take', par2: null }
    ],
    BatterSwingResult: [
      { par1: 'Misses', par2: null },
      { par1: 'Fouls', par2: null },
      { par1: 'HitsInPlay', par2: null }
    ],
    HitsDistribution: [
      { par1: 'Hits', par2: null },
      { par1: 'Fly', par2: null },
      { par1: 'Line', par2: null },
      { par1: 'Grounds', par2: null },
      { par1: 'Bunts', par2: null }
    ]
  };

  return (
    <>
      <div>
        <TotalInfo data={parentObj} />
        <CommonGroup
          data={parentObj}
          param='PlateAppearance'
          title='Plate appearance results'
          itemsArr={GROUPS_PARAMS.PlateAppearance}
          staticTitle='PA'
        />
        <CommonGroup
          data={parentObj}
          param='OutsDistribution'
          title='Outs distribution'
          itemsArr={GROUPS_PARAMS.OutsDistribution}
          staticTitle='Outs'
        />
      </div>
      <div>
        <CommonGroup
          data={parentObj}
          param='PitchesBySwingDistribution'
          title='Pitches by swing distribution'
          itemsArr={GROUPS_PARAMS.PitchesBySwingDistribution}
          staticTitle='Pitches'
        />
        <CommonGroup
          data={parentObj}
          param='BatterSwingResult'
          title='Batter swing results'
          itemsArr={GROUPS_PARAMS.BatterSwingResult}
          staticTitle='Swings'
        />
        <CommonGroup
          data={parentObj}
          param='HitsDistribution'
          title='Hits distribution'
          itemsArr={GROUPS_PARAMS.HitsDistribution}
          staticTitle='Contacts'
        />
      </div>
      <div>
        <CountsDistribution data={parentObj} staticTitle='Pitches' />
      </div>
    </>
  );
};

export default BannerColumns;

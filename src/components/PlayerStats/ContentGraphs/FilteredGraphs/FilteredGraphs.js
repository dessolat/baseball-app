import cl from './FilteredGraphs.module.scss';
import PitchesByZoneImg from 'images/pitches_by_zone.jpg';
import FilterField from 'components/UI/TextField/FilterField/FilterField';
import GraphsBlock from './GraphsBlock';
import PitchesSpeedField from './PitchesSpeedField/PitchesSpeedField'
import GraphsHeader from './GraphsHeader/GraphsHeader';

const GroupItem = ({ data, title, index }) => {
  const { name, value } = data;
  const isValueNumber = typeof value === 'number';
  const dataValue = isValueNumber ? `${value}%` : value;

  return (
    <label className={cl.groupItem}>
      <input type='radio' name={title} value={name} defaultChecked={index === 0} />
      <div
        className={cl.itemBody}
        style={
          isValueNumber
            ? {
                background: `linear-gradient(to left, hsla(${169 + 0.41 * value}, 30%, ${
                  88 - 0.15 * value
                }%, 1) ${value}%, rgba(234, 234, 234, 0.4) 0)`
              }
            : null
        }>
        <p>{name}</p>
        <span>{dataValue}</span>
      </div>
      <span>
        <span></span>
      </span>
    </label>
  );
};

const Group = ({ data }) => {
  const { title, items } = data;

  return (
    <div className={cl.group}>
      <p className={cl.title}>{title}</p>
      {items.map((item, i) => (
        <GroupItem key={i} data={item} title={title} index={i} />
      ))}
    </div>
  );
};

const CustomGroup = ({ data }) => {
  const { title, items } = data;

  return (
    <div className={cl.group}>
      <p className={cl.title}>{title}</p>
      {items.map((item, i) => (
        <GroupItem key={i} data={item} title={title} index={i} />
      ))}
      <label className={cl.groupItem}>
        <input type='radio' name={title} value='Team' />
        <div className={cl.customItemBody}>
          <p>Team</p>
          <FilterField placeholder='Search of team' style={{ width: '11.25rem' }} />
        </div>
        <span>
          <span></span>
        </span>
      </label>
      <label className={cl.groupItem}>
        <input type='radio' name={title} value='Batter' />
        <div className={cl.customItemBody}>
          <p>Batter</p>
          <FilterField placeholder='Search of batter' style={{ width: '11.25rem' }} />
        </div>
        <span>
          <span></span>
        </span>
      </label>
    </div>
  );
};

const LeftColumnOptions = () => {
  const customGroupData = {
    title: 'Against who',
    items: [
      { name: 'All batters (150 players)', value: 100 },
      { name: 'Right handed (120)', value: 80 },
      { name: 'Left handed (30)', value: 20 }
    ]
  };

  const groupsArr = [
    {
      title: 'Count',
      items: [
        { name: 'Any count (1000 pitches)', value: 100 },
        { name: 'Ahead in count (600 pitches)', value: 60 },
        { name: 'Behind in count (400 pitches)', value: 40 },
        { name: '0-0 (150 pitches)', value: 15 },
        { name: '0-2, 1-2 (180 pitches)', value: 18 },
        { name: '3-0, 3-1 (32 pitches)', value: 3 }
      ]
    },
    {
      title: 'Zone',
      items: [
        { name: 'Any zone (1000 pitches)', value: 100 },
        { name: 'In zone (600 pitches)', value: 60 },
        { name: 'Out zone (400 pitches)', value: 40 },
        { name: 'Heart (500 pitches)', value: 50 },
        { name: 'Edge (350 pitches)', value: 35 },
        { name: 'Chase&Waste (150 pitches)', value: 15 },
        { name: 'Low (450 pitches)', value: 45 },
        { name: 'High (250 pitches)', value: 25 },
        { name: 'Outside (600 pitches)', value: 60 },
        { name: 'Inside (200 pitches)', value: 20 }
      ]
    },
    {
      title: 'Result',
      items: [
        { name: 'All pitches (1000 pitches)', value: 100 },
        { name: 'Swing (300 pitches)', value: 50 },
        { name: 'Take (500 pitches)', value: 50 },
        { name: 'Miss (150 swings)', value: 50 },
        { name: 'Contact (150 swings)', value: 50 },
        { name: 'Base hits & Hard hit (50 contacts)', value: 30 },
        { name: 'Slow hit (30 contacts)', value: 30 },
        { name: 'Fly (60 contacts)', value: 40 },
        { name: 'Line (30 contacts)', value: 20 },
        { name: 'Grounds (60 contacts)', value: 40 }
      ]
    }
  ];
  return (
    <div className={cl.leftColumnWrapper}>
      <h3 className={cl.header}>Dataset filter</h3>
      <div className={cl.body}>
        <CustomGroup data={customGroupData} />
        {groupsArr.map((group, i) => (
          <Group key={i} data={group} />
        ))}
      </div>
    </div>
  );
};

const PitchesByZone = () => {
  return <img src={PitchesByZoneImg} className={cl.pitchesByZoneThumb} alt='pitches-by-zone' />;
};

const RightColumnGraphs = () => {
  return (
    <div className={cl.rightColumnWrapper}>
      <GraphsBlock defaultOption='All Pitches'>
        {(currentOption, setCurrentOption) => (
          <>
            <GraphsHeader
              optionsArr={['All Pitches', 'Types', 'Gravity']}
              title='Machine vision statistics'
              subTitle="Name's pitches, their speed, movement and frequency"
              currentOption={currentOption}
              setCurrentOption={setCurrentOption}
            />
						<PitchesSpeedField />
          </>
        )}
      </GraphsBlock>
      <PitchesByZone />
      <PitchesSpeedField />
      <PitchesByZone />
      <PitchesSpeedField />
      <PitchesByZone />
      <PitchesSpeedField />
      <PitchesByZone />
      <PitchesSpeedField />
      <PitchesByZone />
      <PitchesSpeedField />
      <PitchesByZone />
      <PitchesSpeedField />
      <PitchesByZone />
      <PitchesSpeedField />
      <PitchesByZone />
    </div>
  );
};

const FilteredGraphs = () => {
  return (
    <div className={cl.filteredGraphsWrapper}>
      <LeftColumnOptions />
      <RightColumnGraphs />
    </div>
  );
};

export default FilteredGraphs;

import cl from './FilteredGraphs.module.scss';
import FilterField from 'components/UI/TextField/FilterField/FilterField';
import GraphsBlock from './GraphsBlock';
import PitchesSpeedField from './PitchesSpeedField/PitchesSpeedField';
import GraphsHeader from './GraphsHeader/GraphsHeader';
import TwinPitchesGraph from './TwinPitchesGraph/TwinPitchesGraph';
import ArsenalGraph from 'components/PlayerStats/ArsenalGraph/ArsenalGraph';
import { useState } from 'react';
import { getRndValue } from 'utils';

const FIELD_NAMES = {
  batter: {
    'All batters': 'all',
    'Right handed': 'right handed',
    'Left handed': 'left handed'
  },
  count: {
    'Any count': 'all',
    'Ahead in count': 'ahwad',
    'Behind in count': 'behind',
    '0-0': '0-0',
    '0-2': '0-2',
    '3-0': '3-0'
  },
  zone: {
    'Any zone': 'all',
    'In zone': 'in zone',
    'Out zone': 'out zone',
    Heart: 'heart',
    Edge: 'edge',
    'Chase&Waste': 'waste',
    Low: 'low',
    High: 'high',
    Outside: 'outside',
    Inside: 'inside'
  },
  result: {
    'All pitches': 'all',
    Swing: 'swing',
    Take: 'take',
    Miss: 'miss',
    Contact: 'contact',
    'Base hits & Hard hit': 'base hit & hard hit',
    'Slow hit': 'soft hit',
    Fly: 'fly',
    Line: 'line',
    Grounds: 'ground'
  }
};

const GroupItem = ({ data, groupName, handleFilterClick, currentFilterValues }) => {
  const { name, absValue, absValueTotal, relValue, staticText } = data;
  const isRelValueNumber = typeof relValue === 'number' && !isNaN(relValue);

  const dataValue = isRelValueNumber ? `${relValue}%` : isNaN(relValue) ? '-' : relValue;

  return (
    <label className={cl.groupItem}>
      <input
        type='radio'
        name={groupName}
        value={name}
        onChange={() => handleFilterClick(groupName, FIELD_NAMES[groupName][name])}
        checked={currentFilterValues[groupName] === FIELD_NAMES[groupName][name]}
      />
      <div
        className={cl.itemBody}
        style={
          isRelValueNumber
            ? {
                background: `linear-gradient(to left, hsla(${169 + 0.41 * +relValue}, 30%, ${
                  88 - 0.15 * +relValue
                }%, 1) ${+relValue}%, rgba(234, 234, 234, 0.4) 0)`
              }
            : null
        }>
        <p>{`${name} (${absValue} / ${absValueTotal} ${staticText})`}</p>
        <span className={cl.dataValue}>{dataValue}</span>
      </div>
      <span>
        <span></span>
      </span>
    </label>
  );
};

const Group = ({ data, groupData, currentFilterValues, handleFilterClick }) => {
  const { title, groupName, staticText, items } = groupData;

  const groupsArr = ['batter', 'count', 'zone', 'result'];

  const filteredData =
    data.pitches_all?.filter(pitch =>
      groupsArr.every(
        group =>
          (currentFilterValues[group] === 'all' ? true : pitch[group][currentFilterValues[group]]) ||
          group === groupName
      )
    ) || [];

  const total = filteredData.map(pitch => pitch[groupName]);

  const totalLength = total.length;

  const modifiedGroupData = items.map(({ name, staticText }) => {
    const paramName = FIELD_NAMES[groupName][name];
    const absValue = paramName !== 'all' ? total.filter(group => group[paramName]).length : totalLength;

    return {
      name,
			staticText,
      absValue,
      absValueTotal: totalLength,
      relValue:
        paramName === 'all' ? 100 : totalLength > 0 ? +((absValue * 100) / totalLength).toFixed(2) : 0 ?? '-'
    };
  });

  // const leftHandedRelValue = rightHandedRelValue !== '-' ? 100 - rightHandedRelValue : '-';

  return (
    <div className={cl.group}>
      <p className={cl.title}>{title}</p>
      {modifiedGroupData.map((item, i) => (
        <GroupItem
          key={i}
          data={item}
          groupName={groupName}
          handleFilterClick={handleFilterClick}
          currentFilterValues={currentFilterValues}
        />
      ))}
    </div>
  );
};

const CustomGroup = ({ data, currentFilterValues, handleFilterClick }) => {
  const againstFilteredData =
    data.pitches_all?.filter(
      pitch =>
        (currentFilterValues.count === 'all' ? true : pitch.count[currentFilterValues.count]) &&
        (currentFilterValues.zone === 'all' ? true : pitch.zone[currentFilterValues.zone]) &&
        (currentFilterValues.result === 'all' ? true : pitch.result[currentFilterValues.result])
    ) || [];

  const totalBatters = againstFilteredData.reduce((sum, cur) => {
    const existBatterIndex = sum.findIndex(batter => batter.batter_id === cur.batter.batter_id);
    existBatterIndex === -1 && sum.push(cur.batter);

    return sum;
  }, []);

  const leftHandedBatters = totalBatters.filter(batter => batter['left handed']);
  const rightHandedBattersLength = totalBatters.length - leftHandedBatters.length;

  const rightHandedRelValue =
    totalBatters.length > 0 ? +((rightHandedBattersLength * 100) / totalBatters.length).toFixed(1) : 0 ?? '-';
  const leftHandedRelValue =
    totalBatters.length > 0 ? +((leftHandedBatters.length * 100) / totalBatters.length).toFixed(1) : 0 ?? '-';

  const customGroupData = {
    title: 'Against who',
    items: [
      {
        name: 'All batters',
        absValue: totalBatters.length,
        absValueTotal: totalBatters.length,
        relValue: 100,
        staticText: 'players'
      },
      {
        name: 'Right handed',
        absValue: rightHandedBattersLength,
        absValueTotal: totalBatters.length,
        relValue: rightHandedRelValue,
        staticText: 'players'
      },
      {
        name: 'Left handed',
        absValue: leftHandedBatters.length,
        absValueTotal: totalBatters.length,
        relValue: leftHandedRelValue,
        staticText: 'players'
      }
    ]
  };

  const { title, staticText, items } = customGroupData;

  return (
    <div className={cl.group}>
      <p className={cl.title}>{title}</p>
      {items.map((item, i) => (
        <GroupItem
          key={i}
          data={item}
          groupName='batter'
          handleFilterClick={handleFilterClick}
          currentFilterValues={currentFilterValues}
        />
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

const LeftColumnOptions = ({ handleFakeDataClick, data = {}, handleFilterClick, currentFilterValues }) => {
  const groupsArr = [
    {
      title: 'Count',
      groupName: 'count',

      items: [
        {
          name: 'Any count',
          staticText: 'pitches'
        },
        { name: 'Ahead in count', staticText: 'pitches' },
        { name: 'Behind in count', staticText: 'pitches' },
        { name: '0-0', staticText: 'pitches' },
        { name: '0-2', staticText: 'pitches' },
        { name: '3-0', staticText: 'pitches' }
      ]
    },
    {
      title: 'Zone',
      groupName: 'zone',
      items: [
        { name: 'Any zone', staticText: 'pitches' },
        { name: 'In zone', staticText: 'pitches' },
        { name: 'Out zone', staticText: 'pitches' },
        { name: 'Heart', staticText: 'pitches' },
        { name: 'Edge', staticText: 'pitches' },
        { name: 'Chase&Waste', staticText: 'pitches' },
        { name: 'Low', staticText: 'pitches' },
        { name: 'High', staticText: 'pitches' },
        { name: 'Outside', staticText: 'pitches' },
        { name: 'Inside', staticText: 'pitches' }
      ]
    },
    {
      title: 'Result',
      groupName: 'result',
      items: [
        { name: 'All pitches', staticText: 'pitches' },
        { name: 'Swing', staticText: 'pitches' },
        { name: 'Take', staticText: 'pitches' },
        { name: 'Miss', staticText: 'swings' },
        { name: 'Contact', staticText: 'swings' },
        { name: 'Base hits & Hard hit', staticText: 'contacts' },
        { name: 'Slow hit', staticText: 'contacts' },
        { name: 'Fly', staticText: 'contacts' },
        { name: 'Line', staticText: 'contacts' },
        { name: 'Grounds', staticText: 'contacts' }
      ]
    }
  ];
  return (
    <div className={cl.leftColumnWrapper}>
      <h3 className={cl.header}>
        Dataset filter
        <button className={cl.tempButton} onClick={handleFakeDataClick}>
          Generate data
        </button>
      </h3>
      <div className={cl.body}>
        <CustomGroup
          data={data}
          currentFilterValues={currentFilterValues}
          handleFilterClick={handleFilterClick}
        />
        {groupsArr.map((group, i) => (
          <Group
            key={i}
            data={data}
            groupData={group}
            currentFilterValues={currentFilterValues}
            handleFilterClick={handleFilterClick}
          />
        ))}
      </div>
    </div>
  );
};

const RightColumnGraphs = () => {
  return (
    <div className={cl.rightColumnWrapper}>
      <GraphsBlock defaultOption='All Pitches'>
        {(currentOption, setCurrentOption) => (
          <>
            <GraphsHeader
              title='Machine vision statistics'
              subTitle="Name's pitches, their speed, movement and frequency"
              noSelector
            />
            <PitchesSpeedField
              optionsArr={['All Pitches', 'Types']}
              currentOption={currentOption}
              setCurrentOption={setCurrentOption}
            />
          </>
        )}
      </GraphsBlock>
      <GraphsBlock defaultOption='All Pitches'>
        {(currentOption, setCurrentOption) => (
          <>
            <GraphsHeader
              optionsArr={['All Pitches', 'Contours']}
              title={null}
              subTitle='Name pitches by zone'
              currentOption={currentOption}
              setCurrentOption={setCurrentOption}
              // style={{ padding: '.8rem 0' }}
            />
            <TwinPitchesGraph />
          </>
        )}
      </GraphsBlock>
      <GraphsBlock defaultOption='All Pitches' style={{ marginTop: -1 }}>
        {(currentOption, setCurrentOption) => (
          <>
            <GraphsHeader
              optionsArr={['All Pitches', 'Contours']}
              title={null}
              subTitle='Name time dynamic'
              currentOption={currentOption}
              setCurrentOption={setCurrentOption}
              // style={{ padding: '.8rem 0' }}
            />
            <ArsenalGraph />
          </>
        )}
      </GraphsBlock>
      <GraphsBlock defaultOption='All Pitches' style={{ marginTop: -1 }}>
        {(currentOption, setCurrentOption) => (
          <>
            <GraphsHeader
              optionsArr={['All Pitches', 'Contours']}
              title={null}
              subTitle='Name time dynamic'
              currentOption={currentOption}
              setCurrentOption={setCurrentOption}
              // style={{ padding: '.8rem 0' }}
            />
            <ArsenalGraph />
          </>
        )}
      </GraphsBlock>
      <GraphsBlock defaultOption='All Pitches' style={{ marginTop: -1 }}>
        {(currentOption, setCurrentOption) => (
          <>
            <GraphsHeader
              optionsArr={['All Pitches', 'Contours']}
              title={null}
              subTitle='Name time dynamic'
              currentOption={currentOption}
              setCurrentOption={setCurrentOption}
              // style={{ padding: '.8rem 0' }}
            />
            <ArsenalGraph />
          </>
        )}
      </GraphsBlock>
      <GraphsBlock defaultOption='All Pitches' style={{ marginTop: -1 }}>
        {(currentOption, setCurrentOption) => (
          <>
            <GraphsHeader
              optionsArr={['All Pitches', 'Contours']}
              title={null}
              subTitle='Name time dynamic'
              currentOption={currentOption}
              setCurrentOption={setCurrentOption}
              // style={{ padding: '.8rem 0' }}
            />
            <ArsenalGraph />
          </>
        )}
      </GraphsBlock>
      <GraphsBlock defaultOption='All Pitches' style={{ marginTop: -1 }}>
        {(currentOption, setCurrentOption) => (
          <>
            <GraphsHeader
              optionsArr={['All Pitches', 'Contours']}
              title={null}
              subTitle='Name time dynamic'
              currentOption={currentOption}
              setCurrentOption={setCurrentOption}
              // style={{ padding: '.8rem 0' }}
            />
            <ArsenalGraph />
          </>
        )}
      </GraphsBlock>
      {/* <PitchesByZone />
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
      <PitchesByZone /> */}
    </div>
  );
};

const FilteredGraphs = () => {
  const [fakeData, setFakeData] = useState({});
  const [currentFilterValues, setCurrentFilterValues] = useState({
    batter: 'all',
    count: 'all',
    zone: 'all',
    result: 'all'
  });
  console.log(fakeData);
  const generateFakeData = () => {
    const totalPitches = getRndValue(10, 20);
    // const totalPitches = getRndValue(300, 1000);

    const pitchesAll = [];
    const battersSet = new Set();
    const batterIds = [];

    for (let i = 0; i < totalPitches; i++) {
      // count
      const count0_0 = getRndValue(0, 1);
      const count0_2 = !count0_0 ? getRndValue(0, 1) : 0;
      const count3_0 = !count0_0 && !count0_2 ? 1 : 0;
      const ahwad = getRndValue(0, 1);
      const behind = 1 - ahwad;

      // zone
      const inZone = getRndValue(0, 1);

      const heart = getRndValue(0, 1);
      const edge = !heart ? getRndValue(0, 1) : 0;
      const waste = !heart && !edge ? 1 : 0;

      const low = getRndValue(0, 1);
      const inside = getRndValue(0, 1);

      // result
      const result = {
        fly: 0,
        line: 0,
        miss: 0,
        take: 0,
        swing: 0,
        ground: 0,
        contact: 0,
        'soft hit': 0,
        'base hit & hard hit': 0
      };

      const resultLength = Object.keys(result).length;
      const resultParam = Object.keys(result)[getRndValue(0, resultLength - 1)];
      result[resultParam] = 1;

      const newBatterId = getRndValue(0, totalPitches - 1);
      const batterExistIndex = batterIds.findIndex(batter => batter.batter_id === newBatterId);

      let batter;

      if (batterExistIndex === -1) {
        const leftHandedValue = getRndValue(0, 1);

        batter = {
          'left handed': leftHandedValue,
          'right handed': 1 - leftHandedValue,
          batter_id: newBatterId
        };

        batterIds.push(batter);
      }

      if (batterExistIndex !== -1) {
        batter = batterIds[batterExistIndex];
      }

      const tempPitch = {
        pitch_info: getRndValue(0, 3),
        batter,
        count: {
          '0-0': count0_0,
          '0-2': count0_2,
          '3-0': count3_0,
          ahwad,
          behind
        },
        zone: {
          'in zone': inZone,
          'out zone': 1 - inZone,
          heart,
          edge,
          waste,
          low,
          high: 1 - low,
          inside,
          outside: 1 - inside
        },
        result
      };

      battersSet.add(tempPitch.batter.batter_id);

      pitchesAll.push(tempPitch);
    }

    const result = {
      preview: {
        pitch_types: ['Undefined', 'Fast ball', 'Curve ball', 'Slider'],
        n_pitch_types: 4,
        total_pitches: totalPitches,
        total_batters: Array.from(battersSet).length
      },
      pitches_all: pitchesAll
    };

    return result;
  };

  const handleFakeDataClick = () => {
    setFakeData(generateFakeData());
  };

  function handleFilterClick(groupName, value) {
    setCurrentFilterValues(prev => ({ ...prev, [groupName]: value }));
  }

  // const filteredData = fakeData.pitches_all.filter(pitch => )
  return (
    <div className={cl.filteredGraphsWrapper}>
      <LeftColumnOptions
        handleFakeDataClick={handleFakeDataClick}
        data={fakeData}
        handleFilterClick={handleFilterClick}
        currentFilterValues={currentFilterValues}
      />
      <RightColumnGraphs />
    </div>
  );
};

export default FilteredGraphs;

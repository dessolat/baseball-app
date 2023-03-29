import cl from './FilteredGraphs.module.scss';
import FilterField from 'components/UI/TextField/FilterField/FilterField';
import GraphsBlock from './GraphsBlock';
import PitchesSpeedField from './PitchesSpeedField/PitchesSpeedField';
import GraphsHeader from './GraphsHeader/GraphsHeader';
import TwinPitchesGraph from './TwinPitchesGraph/TwinPitchesGraph';
import ArsenalGraph from 'components/PlayerStats/ArsenalGraph/ArsenalGraph';
import { useState, useMemo } from 'react';
import { getPitchColorByName, getRndValue } from 'utils';
import { useFilterFakeGraphsData, useFilterGroupData } from 'hooks/useFilterFakeGraphsData';
import { useSelector } from 'react-redux';
import GraphsTimeDynamicBlock from './GraphsTimeDynamicBlock';
import PitchesTrajectories from './PitchesTrajectories/PitchesTrajectories';
import HitsAnglesGraphs from './HitsAnglesGraphs/HitsAnglesGraphs';

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
    Take: 'take'
  },
  swing: {
    'All swings': 'all',
    Miss: 'miss',
    Contact: 'contact'
  },
  contact: {
    'All contacts': 'all',
    'Base hits & Hard hit': 'base hit & hard hit',
    'Slow hit': 'soft hit',
    Fly: 'fly',
    Line: 'line',
    Grounds: 'gruond'
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

const Group = ({
  data,
  groupData,
  currentFilterValues,
  handleFilterClick,
  filteredTeamName,
  filteredPlayerFullName
}) => {
  const { title, groupName, staticText, items } = groupData;

  const teamName = currentFilterValues.batter === 'team' ? filteredTeamName : null;
  const playerFullName = currentFilterValues.batter === 'batter' ? filteredPlayerFullName : null;

  const filteredData = useFilterGroupData(data, currentFilterValues, groupName, teamName, playerFullName);

  const total =
    groupName === 'swing' || groupName === 'contact'
      ? filteredData
          .map(pitch => pitch.result)
          .filter(group =>
            groupName === 'swing'
              ? group[FIELD_NAMES[groupName]['Miss']] || group[FIELD_NAMES[groupName]['Contact']]
              : group[FIELD_NAMES[groupName]['Base hits & Hard hit']] ||
                group[FIELD_NAMES[groupName]['Slow hit']] ||
                group[FIELD_NAMES[groupName]['Fly']] ||
                group[FIELD_NAMES[groupName]['Line']] ||
                group[FIELD_NAMES[groupName]['Grounds']]
          )
      : filteredData.map(pitch => pitch[groupName]);

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
        paramName === 'all' ? 100 : totalLength > 0 ? +((absValue * 100) / totalLength).toFixed(1) : 0 ?? '-'
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

const TextGroup = ({ setTextGroupFilter }) => {
  return (
    <div className={cl.textGroup}>
      <div className={cl.textGroupItem}>
        <p>Team</p>
        <FilterField
          placeholder='Search of team'
          style={{ width: '82%' }}
          handleChange={value => {
            setTextGroupFilter(prev => ({ ...prev, team: value }));
          }}
        />
      </div>
      <div className={cl.textGroupItem}>
        <p>Game</p>
        <FilterField
          placeholder='Search of game'
          style={{ width: '82%' }}
          handleChange={value => {
            setTextGroupFilter(prev => ({ ...prev, game: value }));
          }}
        />
      </div>
      <div className={cl.textGroupItem}>
        <p>Batter</p>
        <FilterField
          placeholder='Search of batter'
          style={{ width: '82%' }}
          handleChange={value => {
            setTextGroupFilter(prev => ({ ...prev, batter: value }));
          }}
        />
      </div>
    </div>
  );
};

const CustomGroup = ({
  data,
  currentFilterValues,
  handleFilterClick,
  handleTeamNameChange,
  handlePlayerNameChange
}) => {
  const againstFilteredData =
    data.pitches_all?.filter(
      pitch =>
        (currentFilterValues.count === 'all' ? true : pitch.count[currentFilterValues.count]) &&
        (currentFilterValues.zone === 'all' ? true : pitch.zone[currentFilterValues.zone]) &&
        (currentFilterValues.result === 'all' ? true : pitch.result[currentFilterValues.result]) &&
        (currentFilterValues.swing === 'all' ? true : pitch.result[currentFilterValues.swing]) &&
        (currentFilterValues.contact === 'all' ? true : pitch.result[currentFilterValues.contact])
    ) || [];

  const totalBatters = againstFilteredData.reduce((sum, cur) => {
    const existBatterIndex = sum.findIndex(batter => batter.h_id === cur.batter.h_id);
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

  const { title, items } = customGroupData;
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
    </div>
  );
};

const LeftColumnOptions = ({
  data = {},
  handleFilterClick,
  currentFilterValues,
  filteredTeamName,
  filteredPlayerFullName,
  handleTeamNameChange,
  handlePlayerNameChange,
  setTextGroupFilter
}) => {
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
        { name: 'Take', staticText: 'pitches' }
      ]
    },
    {
      title: ' ',
      groupName: 'swing',
      items: [
        { name: 'All swings', staticText: 'swings' },
        { name: 'Miss', staticText: 'swings' },
        { name: 'Contact', staticText: 'swings' }
      ]
    },
    {
      title: ' ',
      groupName: 'contact',
      items: [
        { name: 'All contacts', staticText: 'contacts' },
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
      <h3 className={cl.header}>Dataset filter</h3>
      <div className={cl.body}>
        <TextGroup setTextGroupFilter={setTextGroupFilter} />

        <CustomGroup
          data={data}
          currentFilterValues={currentFilterValues}
          handleFilterClick={handleFilterClick}
          handleTeamNameChange={handleTeamNameChange}
          handlePlayerNameChange={handlePlayerNameChange}
        />
        {groupsArr.map((group, i) => (
          <Group
            key={i}
            data={data}
            groupData={group}
            currentFilterValues={currentFilterValues}
            handleFilterClick={handleFilterClick}
            filteredTeamName={filteredTeamName}
            filteredPlayerFullName={filteredPlayerFullName}
          />
        ))}
      </div>
    </div>
  );
};

const RightColumnGraphs = ({ currentFilterValues, filteredTeamName, filteredPlayerFullName, data }) => {
  const { preview } = data;
  const { pitch_types: pitchTypes } = preview;

  // ! Remove after testing
  const [isFakeTwinBalls, setFakeTwinBalls] = useState(false);
  // !

  const { name: playerName, surname: playerSurname } = useSelector(
    state => state.playerStats.playerStatsData
  );

  const teamName = currentFilterValues.batter === 'team' ? filteredTeamName : null;
  const playerFullName = currentFilterValues.batter === 'batter' ? filteredPlayerFullName : null;
  const filteredData = useFilterFakeGraphsData(data, currentFilterValues, teamName, playerFullName);

  // Count and speed values
  const relValuesData = filteredData.reduce((sum, pitch) => {
    const { speed, pitch_type, pitchGraphCoords } = pitch.pitch_info;
    const pitchType = pitchTypes[pitch_type];

    if (sum[pitchType] !== undefined) {
      sum[pitchType].count += 1;
      sum[pitchType].speeds.push(speed * 2.24);
      sum[pitchType].pitchGraphCoords.push({ ...pitchGraphCoords, color: getPitchColorByName(pitchType) });

      return sum;
    }

    sum[pitchType] = {
      count: 1,
      speeds: [speed * 2.24],
      pitchGraphCoords: [{ ...pitchGraphCoords, color: getPitchColorByName(pitchType) }]
    };

    return sum;
  }, {});

  //! Delete after testing
  const arsenalAddedData = JSON.parse(JSON.stringify(filteredData));

  for (let i = 0; i < 1500; i++) {
    let month = getRndValue(6, 10);
    month = month < 10 ? `0${month}` : month;
    let day = getRndValue(5, 6);
    day = day < 10 ? `0${day}` : day;
    const year = getRndValue(2019, 2023);

    const date = `${year}-${month}-${day}`;

    const pitch_type = getRndValue(0, pitchTypes.length - 1);
    const speed = getRndValue(11, 14);
    const spin = getRndValue(200, 2000);
    const break_y = getRndValue(1200, 2900) / -1000;
    const break_x = (getRndValue(0, 1000) - 500) / 1000;
    const inZone = getRndValue(0, 1);
    const outZone = 1 - inZone;
    const inside = getRndValue(0, 1);
    const outside = 1 - inside;
    const low = getRndValue(0, 1);
    const high = 1 - low;

    const newPitch = {
      pitch_info: { pitch_type, date, speed },
      break: { spin, break_y, break_x },
      zone: { 'in zone': inZone, 'out zone': outZone, inside, outside, low, high }
    };

    arsenalAddedData.push(newPitch);
  }

  const arsenalRelValuesData = arsenalAddedData.reduce((sum, pitch) => {
    const { speed, pitch_type, pitchGraphCoords } = pitch.pitch_info;
    const pitchType = pitchTypes[pitch_type];

    if (sum[pitchType] !== undefined) {
      sum[pitchType].count += 1;
      sum[pitchType].speeds.push(speed * 2.23741);
      sum[pitchType].pitchGraphCoords.push({ ...pitchGraphCoords, color: getPitchColorByName(pitchType) });

      return sum;
    }

    sum[pitchType] = {
      count: 1,
      speeds: [speed],
      pitchGraphCoords: [{ ...pitchGraphCoords, color: getPitchColorByName(pitchType) }]
    };

    return sum;
  }, {});

  // ! delete after testing

  let twinFilteredData = JSON.parse(JSON.stringify(filteredData));

  twinFilteredData = twinFilteredData.map(pitch =>
    pitch.coordinates.zone_y === 0
      ? {
          ...pitch,
          coordinates: { zone_x: getRndValue(-200, 200) / 1000, zone_y: getRndValue(520, 930) / 1000 }
        }
      : pitch
  );

  for (let i = 0; i < 100; i++) {
    const pitch = {
      pitch_info: { pitch_type: 1 },
      coordinates: { zone_x: getRndValue(-200, 200) / 1000, zone_y: getRndValue(520, 930) / 1000 },
      result: {
        swing: 0,
        take: 1,
        miss: 0,
        contact: 0,
        'base hit & hard hit': 0,
        'soft hit': 0,
        fly: 0,
        line: 0,
        gruond: 0
      },
      zone: {
        'in zone': 0,
        'out zone': 1,
        heart: 0,
        edge: 0,
        waste: 1,
        low: 1,
        high: 0,
        outside: 0,
        inside: 0
      }
    };

    twinFilteredData.push(pitch);
  }

  const twinData = isFakeTwinBalls ? twinFilteredData : filteredData;

  const twinFakeBallsHandler = () => setFakeTwinBalls(prev => !prev);
  // !

  return (
    <div className={cl.rightColumnWrapper}>
      <GraphsBlock defaultOption='All Pitches'>
        {(currentOption, setCurrentOption) => (
          <>
            <GraphsHeader
              title='Machine vision statistics'
              subTitle={`${playerName} ${playerSurname} pitches, their speed, movement and frequency`}
              noSelector
            />
            <PitchesSpeedField
              optionsArr={['All Pitches', 'Types']}
              currentOption={currentOption}
              setCurrentOption={setCurrentOption}
              filteredData={filteredData}
              preview={preview}
              relValuesData={relValuesData}
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
              subTitle={`${playerName} ${playerSurname} pitches by zone`}
              currentOption={currentOption}
              setCurrentOption={setCurrentOption}
              // style={{ padding: '.8rem 0' }}
            />
            <div className={cl.twinGraphsWrapper}>
              <TwinPitchesGraph
                data={relValuesData}
                filteredData={twinData}
                preview={preview}
                currentOption={currentOption}
              />

              {Object.entries(relValuesData).map((entry, index) => (
                <TwinPitchesGraph
                  key={index}
                  data={relValuesData}
                  filteredData={twinData}
                  selectedPitchType={entry[0]}
                  preview={preview}
                  currentOption={currentOption}
                />
              ))}
              <button
                style={{
                  position: 'absolute',
                  right: '30px',
                  top: '20px',
                  padding: '5px 10px',
                  background: 'lightgray',
                  borderRadius: '3px'
                }}
                onClick={twinFakeBallsHandler}>
                {`${isFakeTwinBalls ? 'Remove' : 'Add'} balls`}
              </button>
            </div>
          </>
        )}
      </GraphsBlock>
      <GraphsTimeDynamicBlock defaultOption='Season' defaultOption2={pitchTypes}>
        {(currentOption, setCurrentOption, currentOption2, setCurrentOption2) => (
          <>
            <GraphsHeader
              optionsArr={['Season', 'Month', 'Game']}
              // optionsArr2={{ 'All Pitches': null, ...relValuesData }}
              availableOptions={Object.keys(arsenalRelValuesData)}
              title={null}
              subTitle={`${playerName} ${playerSurname} time dynamic`}
              currentOption={currentOption}
              setCurrentOption={setCurrentOption}
              currentOption2={currentOption2}
              setCurrentOption2={setCurrentOption2}
            />
            <ArsenalGraph
              filteredData={arsenalAddedData}
              currentTimeInterval={currentOption}
              currentPitchTypes={currentOption2}
              pitchTypes={pitchTypes}
              title='Pitches'
            />
            <ArsenalGraph
              filteredData={arsenalAddedData}
              currentTimeInterval={currentOption}
              currentPitchTypes={currentOption2}
              pitchTypes={pitchTypes}
              title='Pitch, %'
              graphType='PitchesRel'
            />
            <ArsenalGraph
              filteredData={arsenalAddedData}
              currentTimeInterval={currentOption}
              currentPitchTypes={currentOption2}
              pitchTypes={pitchTypes}
              title='Speed, mph'
              graphType='Speed'
            />
            <ArsenalGraph
              filteredData={arsenalAddedData}
              currentTimeInterval={currentOption}
              currentPitchTypes={currentOption2}
              pitchTypes={pitchTypes}
              title='Spin, rpm'
              graphType='Spin'
            />
            <ArsenalGraph
              filteredData={arsenalAddedData}
              currentTimeInterval={currentOption}
              currentPitchTypes={currentOption2}
              pitchTypes={pitchTypes}
              title='Vertical break, sm'
              graphType='VerticalBreak'
            />
            <ArsenalGraph
              filteredData={arsenalAddedData}
              currentTimeInterval={currentOption}
              currentPitchTypes={currentOption2}
              pitchTypes={pitchTypes}
              title='Horizontal break, sm'
              graphType='HorizontalBreak'
            />
            <ArsenalGraph
              filteredData={arsenalAddedData}
              currentTimeInterval={currentOption}
              currentPitchTypes={currentOption2}
              pitchTypes={pitchTypes}
              title='In zone'
              graphType='InZone'
            />
            <ArsenalGraph
              filteredData={arsenalAddedData}
              currentTimeInterval={currentOption}
              currentPitchTypes={currentOption2}
              pitchTypes={pitchTypes}
              title='Out zone'
              graphType='OutZone'
            />
            <ArsenalGraph
              filteredData={arsenalAddedData}
              currentTimeInterval={currentOption}
              currentPitchTypes={currentOption2}
              pitchTypes={pitchTypes}
              title='Inside'
              graphType='Inside'
            />
            <ArsenalGraph
              filteredData={arsenalAddedData}
              currentTimeInterval={currentOption}
              currentPitchTypes={currentOption2}
              pitchTypes={pitchTypes}
              title='Outside'
              graphType='Outside'
            />
            <ArsenalGraph
              filteredData={arsenalAddedData}
              currentTimeInterval={currentOption}
              currentPitchTypes={currentOption2}
              pitchTypes={pitchTypes}
              title='Low'
              graphType='Low'
            />
            <ArsenalGraph
              filteredData={arsenalAddedData}
              currentTimeInterval={currentOption}
              currentPitchTypes={currentOption2}
              pitchTypes={pitchTypes}
              title='High'
              graphType='High'
            />
          </>
        )}
      </GraphsTimeDynamicBlock>
      <GraphsBlock defaultOption=''>
        {(currentOption, setCurrentOption) => (
          <>
            <GraphsHeader title='' subTitle={`Hits from ${playerName} ${playerSurname}`} noSelector />
            <HitsAnglesGraphs data={filteredData} />
          </>
        )}
      </GraphsBlock>
      <GraphsBlock defaultOption=''>
        {(currentOption, setCurrentOption) => (
          <>
            {/* <GraphsHeader
              title=''
              subTitle={`Hits from ${playerName} ${playerSurname}`}
              noSelector
            /> */}
            <PitchesTrajectories data={filteredData} />
          </>
        )}
      </GraphsBlock>
    </div>
  );
};

const FilteredGraphs = ({ pitchesData }) => {
  // const [fakeData, setFakeData] = useState({});
  const [currentFilterValues, setCurrentFilterValues] = useState({
    batter: 'all',
    count: 'all',
    zone: 'all',
    result: 'all',
    swing: 'all',
    contact: 'all'
  });
  const [filteredTeamName, setFilteredTeamName] = useState('');
  const [filteredPlayerFullName, setFilteredPlayerFullName] = useState('');

  const [textGroupFilter, setTextGroupFilter] = useState({ team: '', game: '', batter: '' });

  const filteredData = useMemo(() => {
    function checkFieldIdentity(comparedFields, fieldFilter, exactComparing = true) {
      if (fieldFilter === '') return true;

      const filterArr = fieldFilter.split(' ');

      return filterArr.reduce((sum, word) => {
        if (
          !exactComparing &&
          !comparedFields.some(
            field => String(field).slice(0, word.length).toLowerCase() === String(word).toLowerCase()
          )
        ) {
          sum = false;
        }

        if (
          exactComparing &&
          !comparedFields.some(field => String(field).toLowerCase() === String(word).toLowerCase())
        ) {
          sum = false;
        }

        return sum;
      }, true);
    }

    const { pitches_all: pitchesAll } = pitchesData;

    const newPitchesAll = pitchesAll.filter(({ batter, pitch_info: pitchInfo }) => {
      const { team: teamFilter, game: gameFilter, batter: batterFilter } = textGroupFilter;

      return (
        checkFieldIdentity([batter.team_name], teamFilter) &&
        checkFieldIdentity([pitchInfo.game_id], gameFilter) &&
        checkFieldIdentity([batter['batter name'], batter['batter surname']], batterFilter)
      );
    });

    return { preview: pitchesData.preview, pitches_all: newPitchesAll };
  }, [textGroupFilter, pitchesData]);

  // const generateFakeData = () => {
  //   const totalPitches = getRndValue(10, 20);
  //   // const totalPitches = getRndValue(300, 500);

  //   const pitchesAll = [],
  //     battersSet = new Set(),
  //     batterIds = [];
  //   let batterNames = 0,
  //     batterSurnames = 0;

  //   for (let i = 0; i < totalPitches; i++) {
  //     // count
  //     const count0_0 = getRndValue(0, 1);
  //     const count0_2 = !count0_0 ? getRndValue(0, 1) : 0;
  //     const count3_0 = !count0_0 && !count0_2 ? 1 : 0;
  //     const ahwad = getRndValue(0, 1);
  //     const behind = 1 - ahwad;

  //     // zone
  //     const inZone = getRndValue(0, 1);

  //     const heart = getRndValue(0, 1);
  //     const edge = !heart ? getRndValue(0, 1) : 0;
  //     const waste = !heart && !edge ? 1 : 0;

  //     const low = getRndValue(0, 1);
  //     const inside = getRndValue(0, 1);

  //     // result
  //     const result = {
  //       fly: 0,
  //       line: 0,
  //       miss: 0,
  //       take: 0,
  //       swing: 0,
  //       ground: 0,
  //       contact: 0,
  //       'soft hit': 0,
  //       'base hit & hard hit': 0
  //     };

  //     const resultLength = Object.keys(result).length;
  //     const resultParam = Object.keys(result)[getRndValue(0, resultLength - 1)];
  //     result[resultParam] = 1;

  //     const newBatterId = getRndValue(0, totalPitches - 1);
  //     const batterExistIndex = batterIds.findIndex(batter => batter.batter_id === newBatterId);

  //     let batter;

  //     if (batterExistIndex === -1) {
  //       const leftHandedValue = getRndValue(0, 1);

  //       batterNames++;
  //       batterSurnames++;

  //       const batterName = 'Name' + batterNames;
  //       const batterSurname = 'Surname' + batterSurnames;

  //       batter = {
  //         'left handed': leftHandedValue,
  //         'right handed': 1 - leftHandedValue,
  //         batter_id: newBatterId,
  //         team_name: 'Team' + getRndValue(1, 3),
  //         'batter name': batterName,
  //         'batter surname': batterSurname
  //       };

  //       batterIds.push(batter);
  //     }

  //     if (batterExistIndex !== -1) {
  //       batter = batterIds[batterExistIndex];
  //     }

  //     // Pitch graph coords calculation
  //     const dotsRectXCoord = 30 + 15;
  //     const dotsRectYCoord = 40 + 22;
  //     const dotsRectWidth = 149;
  //     const dotsRectHeight = 195;

  //     const xCoridorStart = Math.random() * (dotsRectWidth - 69);
  //     const yCoridorStart = Math.random() * (dotsRectHeight - 55);

  //     const x = dotsRectXCoord + xCoridorStart + Math.random() * 69;
  //     const y = dotsRectYCoord + yCoridorStart + Math.random() * 55;

  //     const pitchGraphCoords = { x, y };
  //     //

  //     const tempPitchType = getRndValue(0, pitchTypes.length - 1);

  //     const tempPitch = {
  //       pitch_info: {
  //         pitch_type: tempPitchType,
  //         pitch_name: pitchTypes[tempPitchType],
  //         speed: getRndValue(25, 80),
  //         pitchGraphCoords
  //       },
  //       batter,
  //       count: {
  //         '0-0': count0_0,
  //         '0-2': count0_2,
  //         '3-0': count3_0,
  //         ahwad,
  //         behind
  //       },
  //       zone: {
  //         'in zone': inZone,
  //         'out zone': 1 - inZone,
  //         heart,
  //         edge,
  //         waste,
  //         low,
  //         high: 1 - low,
  //         inside,
  //         outside: 1 - inside
  //       },
  //       result
  //     };

  //     battersSet.add(tempPitch.batter.batter_id);

  //     pitchesAll.push(tempPitch);
  //   }

  //   const result = {
  //     preview: {
  //       pitch_types: pitchTypes,
  //       n_pitch_types: pitchTypes.length,
  //       total_pitches: totalPitches,
  //       total_batters: Array.from(battersSet).length
  //     },
  //     pitches_all: pitchesAll
  //   };

  //   return result;
  // };

  // const handleFakeDataClick = () => {
  //   const data = generateFakeData();
  //   setFakeData(data);
  //   console.clear();
  //   console.log(data);
  // };

  function handleFilterClick(groupName, value) {
    setCurrentFilterValues(prev => ({ ...prev, [groupName]: value }));
  }

  const handleTeamNameChange = name => {
    setFilteredTeamName(name);
  };
  const handlePlayerNameChange = name => {
    setFilteredPlayerFullName(name);
  };

  return (
    <div className={cl.filteredGraphsWrapper}>
      <LeftColumnOptions
        // handleFakeDataClick={handleFakeDataClick}
        data={filteredData}
        handleFilterClick={handleFilterClick}
        currentFilterValues={currentFilterValues}
        filteredTeamName={filteredTeamName}
        filteredPlayerFullName={filteredPlayerFullName}
        handleTeamNameChange={handleTeamNameChange}
        handlePlayerNameChange={handlePlayerNameChange}
        setTextGroupFilter={setTextGroupFilter}
      />
      <RightColumnGraphs
        currentFilterValues={currentFilterValues}
        filteredTeamName={filteredTeamName}
        filteredPlayerFullName={filteredPlayerFullName}
        data={filteredData}
      />
    </div>
  );
};

export default FilteredGraphs;

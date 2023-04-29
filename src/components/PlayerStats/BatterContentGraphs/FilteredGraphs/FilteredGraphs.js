import cl from './FilteredGraphs.module.scss';
import FilterField from 'components/UI/dropdown/FilterField/FilterField';
import GraphsBlock from './GraphsBlock';
// import PitchesSpeedField from './PitchesSpeedField/PitchesSpeedField';
import GraphsHeader from './GraphsHeader/GraphsHeader';
// import TwinPitchesGraph from './TwinPitchesGraph/TwinPitchesGraph';
// import ArsenalGraph from 'components/PlayerStats/ArsenalGraph/ArsenalGraph';
import { useState, useMemo, useRef, useEffect, Fragment } from 'react';
// import { getPitchColorByName, getRndValue } from 'utils';
import { useFilterBatterGroupData } from 'hooks/useFilterGraphsData';
import { useSelector } from 'react-redux';
// import GraphsTimeDynamicBlock from './GraphsTimeDynamicBlock';
import PitchesTrajectories from './PitchesTrajectories/PitchesTrajectories';
import HitsAnglesGraphs from './HitsAnglesGraphs/HitsAnglesGraphs';
import FacedGraph from './FacedGraph/FacedGraph';
import TwinPitchesGraph from './TwinPitchesGraph/TwinPitchesGraph';
import ArsenalGraph from 'components/PlayerStats/ArsenalGraph/ArsenalGraph';
import GraphsTimeDynamicBlock from './GraphsTimeDynamicBlock';
import { getPitchColorByName } from 'utils';

const FIELD_NAMES = {
  pitcher: {
    'All pitchers': 'all',
    'Right handed': 'RHP',
    'Left handed': 'LHP'
  },
  count: {
    'Any count': 'all',
    'First pitches': 'first_pitch',
    'Close to BB': 'close_to_BB',
    '2 strikes': 'strike2',
    Other: 'other'
  },
  type: {
    'All pitches': 'all',
    Fastballs: 'Fastball',
    Breaking: 'Breaking',
    Offspeed: 'Offspeed'
  },
  zone: {
    'Any zone': 'all',
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

const SpeedGroupItem = ({ pitchClass, handleFilterChange, isActive = true, JSONspeeds }) => {
  const [pitchClassName, pitchClassValue] = pitchClass;
  const { title, r, g, b, speeds } = pitchClassValue;

  const [sliderCoords, setSliderCoords] = useState({ x1: 0, x2: 100 });

  const sliderRef = useRef();
  const sliderNameRef = useRef();
  const mouseDownXCoordRef = useRef();
  const mouseDownStateRef = useRef();
  const mouseClickTimeRef = useRef(null);
  const sliderCoordsTimer = useRef();
  // const curMinMaxValues = useRef(null);

  const minMaxMph = useMemo(() => {
    const minMax = speeds.reduce((minMax, curSpeed, i) => {
      if (curSpeed > minMax.max || i === 0) minMax.max = curSpeed;
      if (curSpeed < minMax.min || i === 0) minMax.min = curSpeed;

      return minMax;
    }, {});

    minMax.min = Math.floor(minMax.min);
    minMax.max = Math.ceil(minMax.max);

    return minMax;
  }, [speeds]);

  const minMaxDelta = minMaxMph.max - minMaxMph.min;

  useEffect(() => {
    clearTimeout(sliderCoordsTimer.current);

    // const minMaxMph = speeds.reduce((minMax, curSpeed, i) => {
    //   if (curSpeed > minMax.max || i === 0) minMax.max = curSpeed;
    //   if (curSpeed < minMax.min || i === 0) minMax.min = curSpeed;

    //   return minMax;
    // }, {});

    // minMaxMph.min = Math.floor(minMaxMph.min);
    // minMaxMph.max = Math.ceil(minMaxMph.max);

    sliderCoordsTimer.current = setTimeout(() => {
      const minSpeed = +(minMaxMph.min + (minMaxDelta / 100) * sliderCoords.x1).toFixed(0);
      const maxSpeed = +(minMaxMph.min + (minMaxDelta / 100) * sliderCoords.x2).toFixed(0);

      handleFilterChange(pitchClassName, { min: minSpeed, max: maxSpeed });
      // curMinMaxValues.current = { min: minMaxMph.min, max: minMaxMph.max };
    }, 250);

    return () => {
      clearTimeout(sliderCoordsTimer.current);
    };
  }, [sliderCoords]);

  useEffect(() => {
    const minSpeed = +(minMaxMph.min + (minMaxDelta / 100) * sliderCoords.x1).toFixed(0);
    const maxSpeed = +(minMaxMph.min + (minMaxDelta / 100) * sliderCoords.x2).toFixed(0);

    handleFilterChange(pitchClassName, { min: minSpeed, max: maxSpeed });
  }, [JSONspeeds]);

  // useEffect(() => {
  //   if (curMinMaxValues.current === null) return;

  //   const minMaxMph = speeds.reduce((minMax, curSpeed, i) => {
  //     if (curSpeed > minMax.max || i === 0) minMax.max = curSpeed;
  //     if (curSpeed < minMax.min || i === 0) minMax.min = curSpeed;

  //     return minMax;
  //   }, {});

  //   minMaxMph.min = Math.floor(minMaxMph.min);
  //   minMaxMph.max = Math.ceil(minMaxMph.max);

  // 	console.log('here');

  //   const minMaxDelta = minMaxMph.max - minMaxMph.min;

  //   const curMinDelta = curMinMaxValues.current.min - minMaxMph.min;

  //   const x1Rel = curMinDelta < 0 ? 0 : (100 * curMinDelta) / minMaxDelta;

  //   setSliderCoords(prev => ({ ...prev, x1: x1Rel }));

  //   // const x1SpeedValue = minMaxMph.min + (minMaxDelta / 100) * sliderCoords.x1;
  //   // const x2SpeedValue = minMaxMph.min + (minMaxDelta / 100) * sliderCoords.x2;
  //   // const x2SliderRightCoord = 100 - sliderCoords.x2 < 5 ? 5 : 100 - sliderCoords.x2;
  // }, [speeds]);

  function handleMouseMove(e) {
    const slider = sliderRef.current;
    const parent = slider.parentElement;

    const sliderWidth = slider.getBoundingClientRect().width;
    const fixedX =
      sliderNameRef.current === 'left-slider' ? e.clientX - sliderWidth / 2 : e.clientX + sliderWidth / 2;

    let currentCoord =
      fixedX <= parent.getBoundingClientRect().left
        ? 0
        : fixedX > parent.getBoundingClientRect().right
        ? parent.getBoundingClientRect().width
        : fixedX - parent.getBoundingClientRect().left;

    const currentCoordPercents = +((currentCoord * 100) / parent.getBoundingClientRect().width).toFixed(4);

    if (sliderNameRef.current === 'left-slider') {
      setSliderCoords({
        ...sliderCoords,
        x1: sliderCoords.x2 - 30 > currentCoordPercents ? currentCoordPercents : sliderCoords.x2 - 30,
        changedCoord: 'x1'
      });

      return;
    }
    if (sliderNameRef.current === 'right-slider') {
      setSliderCoords({
        ...sliderCoords,
        x2: sliderCoords.x1 + 30 < currentCoordPercents ? currentCoordPercents : sliderCoords.x1 + 30,
        changedCoord: 'x2'
      });

      return;
    }
  }

  const handleMouseUp = () => {
    // sliderRef.current.parentElement.style.cursor = 'default';
    // if (sliderNameRef.current.includes('line')) rectRef.current.style.cursor = 'grab';

    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);

    // const mouseClickDelta = Date.now() - mouseClickTimeRef.current;
    // if (mouseClickDelta < 140) {
    //   const slider = sliderRef.current;
    //   const parent = slider.parentElement;

    //   let currentCoord =
    //     e.clientX <= parent.getBoundingClientRect().left
    //       ? 0
    //       : e.clientX > parent.getBoundingClientRect().right
    //       ? parent.getBoundingClientRect().width
    //       : e.clientX - parent.getBoundingClientRect().left;

    //   const currentCoordPercents = +((currentCoord * 100) / parent.getBoundingClientRect().width).toFixed(4);

    // dispatch(setSeekValue(seekToValue));
    // dispatch(setVideoCurrentTime(seekToValue));
    // }
  };

  const handleMouseDown = e => {
    mouseClickTimeRef.current = Date.now();

    sliderRef.current = e.target;
    sliderNameRef.current = e.target.attributes.name.value;
    mouseDownXCoordRef.current = e.clientX;
    mouseDownStateRef.current = JSON.parse(JSON.stringify(sliderCoords));

    // sliderRef.current.parentElement.style.cursor = 'e-resize';
    // if (sliderNameRef.current.includes('line')) rectRef.current.style.cursor = 'e-resize';

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const x1SpeedValue = (minMaxMph.min + (minMaxDelta / 100) * sliderCoords.x1).toFixed(0);
  const x2SpeedValue = (minMaxMph.min + (minMaxDelta / 100) * sliderCoords.x2).toFixed(0);
  const x2SliderRightCoord = 100 - sliderCoords.x2 < 5 ? 5 : 100 - sliderCoords.x2;
  return (
    <div className={cl.speedGroupItem}>
      <p className={cl.classTitle} style={{ opacity: isActive ? 1 : 0.5 }}>
        {title}
      </p>
      <div
        className={cl.barWrapper}
        style={{ backgroundColor: `rgba(${r},${g},${b},0.6)`, opacity: isActive ? 1 : 0.5 }}>
        {isActive && (
          <>
            <div
              className={cl.leftSlider}
              style={{ backgroundColor: `rgb(${r},${g},${b})`, left: `${sliderCoords.x1}%` }}
              name='left-slider'
              onMouseDown={handleMouseDown}
              onDragStart={e => e.preventDefault()}></div>
            <div
              className={cl.rightSlider}
              style={{ backgroundColor: `rgb(${r},${g},${b})`, right: `${100 - sliderCoords.x2}%` }}
              name='right-slider'
              onMouseDown={handleMouseDown}
              onDragStart={e => e.preventDefault()}></div>
            <span className={cl.x1SpeedTitle} style={{ left: `${sliderCoords.x1}%` }}>
              {x1SpeedValue} mph
            </span>
            <span className={cl.x2SpeedTitle} style={{ right: `${x2SliderRightCoord}%` }}>
              {x2SpeedValue} mph
            </span>
          </>
        )}
        <span className={cl.minSpeedTitle}>Min: {isActive ? minMaxMph.min : '-'} mph</span>
        <span className={cl.maxSpeedTitle}>Max: {isActive ? minMaxMph.max : '-'} mph</span>
      </div>
    </div>
  );
};

const SpeedGroup = ({
  data,
  groupData,
  currentFilterValues,
  handleFilterChange,
  filteredTeamName,
  filteredPlayerFullName
}) => {
  // const { name, absValue, absValueTotal, relValue, staticText } = data;
  // const isRelValueNumber = typeof relValue === 'number' && !isNaN(relValue);

  // const dataValue = isRelValueNumber ? `${relValue}%` : isNaN(relValue) ? '-' : relValue;

  const { groupName } = groupData;

  const teamName = currentFilterValues.pitcher === 'team' ? filteredTeamName : null;
  const playerFullName = currentFilterValues.pitcher === 'pitcher' ? filteredPlayerFullName : null;

  const filteredData = useFilterBatterGroupData(data, currentFilterValues, 'speed', teamName, playerFullName);

  const pitchClasses = data.preview.pitch_classes;

  // Summary speeds by pitchClass
  const summary = filteredData
    .filter(cur => pitchClasses[cur.pitch_info.pitch_type] !== '')
    .reduce(
      (sum, cur) => {
        const formattedSpeed = Math.round(cur.pitch_info.speed * 2.24 * 100) / 100;
        const pitchClass = pitchClasses[cur.pitch_info.pitch_type];

        sum[pitchClass].speeds.push(formattedSpeed);

        return sum;
      },
      {
        Fastball: { title: 'Fastballs', r: 217, g: 43, b: 51, speeds: [] },
        Breaking: { title: 'Breaking', r: 36, g: 168, b: 215, speeds: [] },
        Offspeed: { title: 'Offspeed', r: 141, g: 181, b: 142, speeds: [] }
      }
    );

  return (
    <div>
      <p className={cl.title}>Pitch speed</p>
      {Object.entries(summary).map((pitchClass, i) => (
        <SpeedGroupItem
          key={'pitch-class-' + i}
          pitchClass={pitchClass}
          handleFilterChange={handleFilterChange}
          isActive={pitchClass[1].speeds.length > 0}
          JSONspeeds={JSON.stringify(pitchClass[1].speeds)}
        />
      ))}
    </div>
  );
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
  const { title, groupName, items } = groupData;

  const teamName = currentFilterValues.pitcher === 'team' ? filteredTeamName : null;
  const playerFullName = currentFilterValues.pitcher === 'pitcher' ? filteredPlayerFullName : null;

  const filteredData = useFilterBatterGroupData(
    data,
    currentFilterValues,
    groupName,
    teamName,
    playerFullName
  );

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
      : groupName === 'type'
      ? filteredData.map(pitch => pitch.pitch_info)
      : filteredData.map(pitch => pitch[groupName]);

  const totalLength = total.length;

  const modifiedGroupData = items.map(({ name, staticText }) => {
    const paramName = FIELD_NAMES[groupName][name];

    const getAbsValue = () => {
      if (paramName === 'all') return totalLength;

      if (groupName === 'type') {
        const { pitch_classes: pitchClasses } = data.preview;

        return total.filter(({ pitch_type: pitchType }) => paramName === pitchClasses[pitchType]).length;
      }

      return total.filter(group => group[paramName]).length;
    };

    const absValue = getAbsValue();

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

const TextGroup = ({ setTextGroupFilter, data }) => {
  function getSortedArr(set) {
    return Array.from(set).sort((a, b) => (a > b ? 1 : -1));
  }

  const uniqueValues = useMemo(() => {
    const defaultValues = { teams: new Set(), games: new Set(), pitchers: new Set() };
    const tempData = data.reduce((sum, cur) => {
      const {
        team_name: teamName,
        'pitcher name': pitcherName,
        'pitcher surname': pitcherSurname
      } = cur.pitcher;
      const { date } = cur.pitch_info;

      sum.teams.add(teamName);
      sum.games.add(`${date.slice(8, 10)}/${date.slice(5, 7)} ${teamName}`);
      sum.pitchers.add(`${pitcherName} ${pitcherSurname}`);

      return sum;
    }, defaultValues);

    tempData.teams = getSortedArr(tempData.teams);
    tempData.games = getSortedArr(tempData.games);
    tempData.pitchers = getSortedArr(tempData.pitchers);

    return tempData;
  }, [data]);
  return (
    <div className={cl.textGroup}>
      <div className={cl.textGroupItem}>
        <p>Team</p>
        <FilterField
          placeholder='Search of team'
          wrapperStyles={{ width: '82%' }}
          handleChange={value => {
            setTextGroupFilter(prev => ({ ...prev, team: value }));
          }}
          handleClick={value => {
            setTextGroupFilter(prev => ({ ...prev, team: value }));
          }}
          listValues={uniqueValues.teams}
          isAllOption
        />
      </div>
      <div className={cl.textGroupItem}>
        <p>Game</p>
        <FilterField
          placeholder='Search of game (DD/MM Team)'
          wrapperStyles={{ width: '82%' }}
          handleChange={value => {
            setTextGroupFilter(prev => ({ ...prev, game: value }));
          }}
          handleClick={value => {
            setTextGroupFilter(prev => ({ ...prev, game: value }));
          }}
          listValues={uniqueValues.games}
          isAllOption
        />
      </div>
      <div className={cl.textGroupItem}>
        <p>Pitcher</p>
        <FilterField
          placeholder='Search of pitcher'
          wrapperStyles={{ width: '82%' }}
          handleChange={value => {
            setTextGroupFilter(prev => ({ ...prev, pitcher: value }));
          }}
          handleClick={value => {
            setTextGroupFilter(prev => ({ ...prev, pitcher: value }));
          }}
          listValues={uniqueValues.pitchers}
          isAllOption
        />
      </div>
    </div>
  );
};

const CustomGroup = ({ data, currentFilterValues, handleFilterClick }) => {
  const againstFilteredData =
    data.pitches_all?.filter(
      batt =>
        (currentFilterValues.count === 'all' ? true : batt.count[currentFilterValues.count]) &&
        (currentFilterValues.zone === 'all' ? true : batt.zone[currentFilterValues.zone]) &&
        (currentFilterValues.result === 'all' ? true : batt.result[currentFilterValues.result]) &&
        (currentFilterValues.swing === 'all' ? true : batt.result[currentFilterValues.swing]) &&
        (currentFilterValues.contact === 'all' ? true : batt.result[currentFilterValues.contact])
    ) || [];

  const totalPitchers = againstFilteredData.reduce((sum, cur) => {
    const existPitcherIndex = sum.findIndex(pitcher => pitcher.h_id === cur.pitcher.h_id);
    existPitcherIndex === -1 && sum.push(cur.pitcher);

    return sum;
  }, []);

  const leftHandedPitchers = totalPitchers.filter(pitcher => pitcher.LHP);
  const rightHandedPitchersLength = totalPitchers.length - leftHandedPitchers.length;

  const rightHandedRelValue =
    totalPitchers.length > 0
      ? +((rightHandedPitchersLength * 100) / totalPitchers.length).toFixed(1)
      : 0 ?? '-';
  const leftHandedRelValue =
    totalPitchers.length > 0
      ? +((leftHandedPitchers.length * 100) / totalPitchers.length).toFixed(1)
      : 0 ?? '-';

  const customGroupData = {
    title: 'Against who',
    items: [
      {
        name: 'All pitchers',
        absValue: totalPitchers.length,
        absValueTotal: totalPitchers.length,
        relValue: 100,
        staticText: 'players'
      },
      {
        name: 'Right handed',
        absValue: rightHandedPitchersLength,
        absValueTotal: totalPitchers.length,
        relValue: rightHandedRelValue,
        staticText: 'players'
      },
      {
        name: 'Left handed',
        absValue: leftHandedPitchers.length,
        absValueTotal: totalPitchers.length,
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
          groupName='pitcher'
          handleFilterClick={handleFilterClick}
          currentFilterValues={currentFilterValues}
        />
      ))}
    </div>
  );
};

const LeftColumnOptions = ({
  battingData = {},
  data = {},
  handleFilterClick,
  handleSpeedFilterChange,
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
        { name: 'First pitches', staticText: 'pitches' },
        { name: 'Close to BB', staticText: 'pitches' },
        { name: '2 strikes', staticText: 'pitches' },
        { name: 'Other', staticText: 'pitches' }
      ]
    },
    {
      title: 'Pitch type',
      groupName: 'type',
      items: [
        { name: 'All pitches', staticText: 'pitches' },
        { name: 'Fastballs', staticText: 'pitches' },
        { name: 'Breaking', staticText: 'pitches' },
        { name: 'Offspeed', staticText: 'pitches' }
      ]
    },
    {
      title: 'Pitch speed',
      groupName: 'speed',
      items: [
        { title: 'Fastballs', r: 217, g: 43, b: 51, bgColor: '#D92B33' },
        { title: 'Breaking', r: 36, g: 168, b: 215, bgColor: '#24A8D7' },
        { title: 'Offspeed', r: 141, g: 181, b: 142, bgColor: '#8DB58E' }
      ]
    },
    {
      title: 'Pitch zone',
      groupName: 'zone',
      items: [
        { name: 'Any zone', staticText: 'pitches' },
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
        <TextGroup setTextGroupFilter={setTextGroupFilter} data={battingData.pitches_all} />

        <CustomGroup
          data={data}
          currentFilterValues={currentFilterValues}
          handleFilterClick={handleFilterClick}
          handleTeamNameChange={handleTeamNameChange}
          handlePlayerNameChange={handlePlayerNameChange}
        />
        {groupsArr.map((group, i) => {
          if (group.groupName === 'speed')
            return (
              <SpeedGroup
                key={i}
                data={data}
                groupData={group}
                currentFilterValues={currentFilterValues}
                handleFilterChange={handleSpeedFilterChange}
                filteredTeamName={filteredTeamName}
                filteredPlayerFullName={filteredPlayerFullName}
              />
            );
          return (
            <Group
              key={i}
              data={data}
              groupData={group}
              currentFilterValues={currentFilterValues}
              handleFilterClick={handleFilterClick}
              filteredTeamName={filteredTeamName}
              filteredPlayerFullName={filteredPlayerFullName}
            />
          );
        })}
      </div>
    </div>
  );
};

const RightColumnGraphs = ({ currentFilterValues, filteredTeamName, filteredPlayerFullName, data }) => {
  const { preview } = data;
  const { pitch_types: pitchTypes, pitch_classes: pitchClasses } = preview;

  // ! Remove after testing
  // const [isFakeTwinBalls, setFakeTwinBalls] = useState(false);
  // !

  const { name: playerName, surname: playerSurname } = useSelector(
    state => state.playerStats.playerStatsData
  );

  const teamName = currentFilterValues.batter === 'team' ? filteredTeamName : null;
  const playerFullName = currentFilterValues.batter === 'batter' ? filteredPlayerFullName : null;
  // const filteredData = []
  const filteredData = useFilterBatterGroupData(data, currentFilterValues, 'all', teamName, playerFullName);

  // Count and speed values
  const relValuesData = filteredData.reduce((sum, pitch) => {
    const { pitch_type } = pitch.pitch_info;

    const pitchClass = pitchClasses[pitch_type];

    if (sum[pitchClass] !== undefined) {
      sum[pitchClass].count += 1;
      sum[pitchClass].pitches.push(pitch);

      return sum;
    }

    sum[pitchClass] = {
      count: 1,
      pitches: [pitch]
    };

    return sum;
  }, {});

  return (
    <div className={cl.rightColumnWrapper}>
      {/* <GraphsBlock defaultOption='All Pitches'>
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
      </GraphsBlock> */}

      <GraphsBlock defaultOption='' noSelector>
        <GraphsHeader
          title='Machine vision statistics'
          subTitle={`${playerName} ${playerSurname} pitches faced`}
          noSelector
        />
        <FacedGraph data={filteredData} preview={preview} />
      </GraphsBlock>
      <GraphsBlock defaultOption='' noSelector>
        <GraphsHeader title='' subTitle={`${playerName} ${playerSurname} Hits`} noSelector />
        <HitsAnglesGraphs data={filteredData} />
      </GraphsBlock>
      <GraphsBlock defaultOption='' noSelector>
        <PitchesTrajectories data={filteredData} />
      </GraphsBlock>
      <GraphsBlock defaultOption='All Pitches'>
        {(currentOption, setCurrentOption) => (
          <>
            <GraphsHeader
              optionsArr={['All Pitches', 'Contours']}
              title={null}
              subTitle={`Pitches to ${playerName} ${playerSurname} by zone`}
              currentOption={currentOption}
              setCurrentOption={setCurrentOption}
            />
            <div className={cl.twinGraphsWrapper}>
              {Object.entries(relValuesData)
                .sort((a, b) => (a[1].count > b[1].count ? -1 : 1))
                .map((entry, index) => (
                  <Fragment key={index}>
                    <TwinPitchesGraph
                      data={relValuesData}
                      filteredData={entry[1].pitches}
                      preview={preview}
                      currentOption={currentOption}
                      selectedPitchClass={entry[0]}
                      title={entry[0]}
                      subTitle1='Swing'
                      subTitle2='Take'
                    />
                    <TwinPitchesGraph
                      data={relValuesData}
                      filteredData={entry[1].pitches}
                      preview={preview}
                      currentOption={currentOption}
                      selectedPitchClass={entry[0]}
                      subTitle1='Miss & soft hit'
                      subTitle2='Base hit & Hard hit'
                    />
                  </Fragment>
                ))}
            </div>
          </>
        )}
      </GraphsBlock>
      <GraphsTimeDynamicBlock
        defaultOption='Game'
        defaultOption2={Array.from(new Set(pitchClasses))}
        defaultOption3='opened'>
        {(
          currentOption,
          setCurrentOption,
          currentOption2,
          setCurrentOption2,
          currentOption3,
          setCurrentOption3
        ) => (
          <>
            <GraphsHeader
              optionsArr={['Season', 'Month', 'Game']}
              availableOptions={Object.keys(relValuesData)}
              title={null}
              subTitle={`${playerName} ${playerSurname} time dynamic`}
              currentOption={currentOption}
              setCurrentOption={setCurrentOption}
              currentOption2={currentOption2}
              setCurrentOption2={setCurrentOption2}
              currentOption3={currentOption3}
              setCurrentOption3={setCurrentOption3}
              graphsArrow
              classColor
            />

            <ArsenalGraph
              filteredData={filteredData}
              currentTimeInterval={currentOption}
              currentPitchTypes={currentOption2}
              pitchClasses={pitchClasses}
              title='Base hits & Hard hits vs PA'
              graphType='PitchesByType'
              classColor
            />
            <ArsenalGraph
              filteredData={filteredData}
              currentTimeInterval={currentOption}
              currentPitchTypes={currentOption2}
              pitchClasses={pitchClasses}
              title='Pitch, %'
              graphType='PitchesRel'
              classColor
            />
            <ArsenalGraph
              filteredData={filteredData}
              currentTimeInterval={currentOption}
              currentPitchTypes={currentOption2}
              pitchClasses={pitchClasses}
              title='Speed, mph'
              graphType='Speed'
              classColor
            />
          </>
        )}
      </GraphsTimeDynamicBlock>
    </div>
  );
};

const FilteredGraphs = ({ battingData }) => {
  const [currentFilterValues, setCurrentFilterValues] = useState({
    pitcher: 'all',
    count: 'all',
    type: 'all',
    speed: {
      '': { min: 0, max: 10000 },
      Fastball: { min: 0, max: 10000 },
      Breaking: { min: 0, max: 10000 },
      Offspeed: { min: 0, max: 10000 }
    },
    zone: 'all',
    result: 'all',
    swing: 'all',
    contact: 'all'
  });

  const [filteredTeamName, setFilteredTeamName] = useState('');
  const [filteredPlayerFullName, setFilteredPlayerFullName] = useState('');

  const [textGroupFilter, setTextGroupFilter] = useState({ team: '', game: '', pitcher: '' });

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

    function gameDataCheck(gameFilter, { date }, { team_name: teamName }) {
      if (gameFilter === '') return true;

      const filteredWords = gameFilter.split(' ');

      return filteredWords.reduce((result, word) => {
        if (result === false) return result;

        const regex = /([0-3][0-9]\/[0-1][0-9])/;
        const matchedRegex = word.match(regex);
        if (matchedRegex) {
          const day = matchedRegex[0].slice(0, 2);
          const month = matchedRegex[0].slice(3, 5);

          const dateDay = date.slice(8, 10);
          const dateMonth = date.slice(5, 7);

          if (day !== dateDay || month !== dateMonth) return false;
          return true;
        }

        if (word === '') return result;

        return teamName.toLowerCase() === word.toLowerCase();
      }, true);
    }

    const { pitches_all: pitchesAll } = battingData;

    const newPitchesAll = pitchesAll.filter(({ pitcher, pitch_info: pitchInfo }) => {
      const { team: teamFilter, game: gameFilter, pitcher: pitcherFilter } = textGroupFilter;

      return (
        checkFieldIdentity([pitcher.team_name], teamFilter) &&
        gameDataCheck(gameFilter, pitchInfo, pitcher) &&
        // checkFieldIdentity([pitchInfo.game_id], gameFilter) &&
        checkFieldIdentity([pitcher['pitcher name'], pitcher['pitcher surname']], pitcherFilter)
      );
    });

    return { preview: battingData.preview, pitches_all: newPitchesAll };
  }, [textGroupFilter, battingData]);

  function handleFilterClick(groupName, value) {
    setCurrentFilterValues(prev => ({ ...prev, [groupName]: value }));
  }
  function handleSpeedFilterChange(pitchClassName, value) {
    let { min: mSValueMin, max: mSValueMax } = value;
    mSValueMin /= 2.24;
    mSValueMax /= 2.24;

    setCurrentFilterValues(prev => ({
      ...prev,
      speed: { ...prev.speed, [pitchClassName]: { min: mSValueMin, max: mSValueMax } }
    }));

    // setCurrentFilterValues(prev => ({ ...prev, [groupName]: value }));
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
        data={filteredData}
        battingData={battingData}
        handleFilterClick={handleFilterClick}
        handleSpeedFilterChange={handleSpeedFilterChange}
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

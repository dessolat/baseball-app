import { useMemo } from 'react';

const groupsArr = ['batter', 'count', 'zone', 'result', 'swing', 'contact'];

export const useFilterGroupData = (
  data,
  currentFilterValues,
  groupName,
  teamName = null,
  batterFullName = null
) =>
  useMemo(() => {
    const result =
      data.pitches_all?.filter(pitch =>
        groupsArr.every(
          group =>
            (currentFilterValues[group] === 'all'
              ? true
              : group === 'batter' && currentFilterValues.batter === 'team'
              ? pitch.batter.team_name.includes(teamName)
                ? true
                : false
              : group === 'batter' && currentFilterValues.batter === 'batter'
              ? (pitch.batter['batter name'] + ' ' + pitch.batter['batter surname']).includes(batterFullName)
                ? true
                : false
              : pitch[(group === 'swing' || group === 'contact') ? 'result' : group][currentFilterValues[group]]) || group === groupName
        )
      ) || [];

    return result;
  }, [data, currentFilterValues, groupName, teamName, batterFullName]);

export const useFilterFakeGraphsData = (
  fakeData,
  currentFilterValues,
  teamName = null,
  batterFullName = null
) =>
  useMemo(() => {
    const result =
      fakeData.pitches_all?.filter(pitch =>
        groupsArr.every(group =>
          currentFilterValues[group] === 'all'
            ? true
            : group === 'batter' && currentFilterValues.batter === 'team'
            ? pitch.batter.team_name.includes(teamName)
              ? true
              : false
            : group === 'batter' && currentFilterValues.batter === 'batter'
            ? (pitch.batter['batter name'] + ' ' + pitch.batter['batter surname']).includes(batterFullName)
              ? true
              : false
            : pitch[(group === 'swing' || group === 'contact') ? 'result' : group][currentFilterValues[group]]
        )
      ) || [];

    return result;
  }, [fakeData, currentFilterValues, teamName, batterFullName]);

import { useMemo } from 'react';

const groupsArr = ['batter', 'count', 'zone', 'result', 'swing', 'contact'];

export const useFilterGroupData = (
  data,
  currentFilterValues,
  groupName,
  teamName = null,
  batterFullName = null
) =>
  useMemo(
    () =>
      data.pitches_all?.filter(pitch => {
        const { batter } = pitch;
        const { batter: curBatter } = currentFilterValues;

        return groupsArr.every(group => {
          if (currentFilterValues[group] === 'all') return true;

          if (group === 'batter' && curBatter === 'team') return batter.team_name.includes(teamName);

          if (group === 'batter' && curBatter === 'batter')
            return `${batter['batter name']} ${batter['batter surname']}`.includes(batterFullName);

          const tempGroupName = group === 'swing' || group === 'contact' ? 'result' : group;
          return pitch[tempGroupName][currentFilterValues[group]] || group === groupName;
        });
      }) || [],
    [data, currentFilterValues, groupName, teamName, batterFullName]
  );

export const useFilterFakeGraphsData = (
  fakeData,
  currentFilterValues,
  teamName = null,
  batterFullName = null
) =>
  useMemo(
    () =>
      fakeData.pitches_all?.filter(pitch => {
        const { batter } = pitch;
        const { batter: curBatter } = currentFilterValues;

        return groupsArr.every(group => {
          if (currentFilterValues[group] === 'all') return true;

          if (group === 'batter' && curBatter === 'team') return batter.team_name.includes(teamName);

          if (group === 'batter' && curBatter === 'batter')
            return `${batter['batter name']} ${batter['batter surname']}`.includes(batterFullName);

          const tempGroupName = group === 'swing' || group === 'contact' ? 'result' : group;
          return pitch[tempGroupName][currentFilterValues[group]];
        });
      }) || [],
    [fakeData, currentFilterValues, teamName, batterFullName]
  );

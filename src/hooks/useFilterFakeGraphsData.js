import { useMemo } from 'react';

const batterGroupsArr = ['pitcher', 'count', 'zone', 'result', 'swing', 'contact'];

export const useFilterBatterGroupData = (
  data,
  currentFilterValues,
  groupName,
  teamName = null,
  pitcherFullName = null
) =>
  useMemo(
    () =>
      data.pitches_all?.filter(pitch => {
        const { pitcher } = pitch;
        const { pitcher: curPitcher } = currentFilterValues;

        return batterGroupsArr.every(group => {
          if (currentFilterValues[group] === 'all') return true;

          if (group === 'pitcher' && curPitcher === 'team') return pitcher.team_name.includes(teamName);

          if (group === 'pitcher' && curPitcher === 'pitcher')
            return `${pitcher['pitcher name']} ${pitcher['pitcher surname']}`.includes(pitcherFullName);

          const tempGroupName = group === 'swing' || group === 'contact' ? 'result' : group;
          return pitch[tempGroupName][currentFilterValues[group]] || group === groupName;
        });
      }) || [],
    [data, currentFilterValues, groupName, teamName, pitcherFullName]
  );

const pitcherGroupsArr = ['batter', 'count', 'zone', 'result', 'swing', 'contact'];

export const useFilterPitcherGroupData = (
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

        return pitcherGroupsArr.every(group => {
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
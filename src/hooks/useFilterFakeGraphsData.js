import { useMemo } from 'react';

const groupsArr = ['batter', 'count', 'zone', 'result'];

export const useFilterGroupData = (data, currentFilterValues, groupName) =>
  useMemo(() => {
    const result =
      data.pitches_all?.filter(pitch =>
        groupsArr.every(
          group =>
            (currentFilterValues[group] === 'all' ? true : pitch[group][currentFilterValues[group]]) ||
            group === groupName
        )
      ) || [];

    return result;
  }, [data, currentFilterValues, groupName]);

export const useFilterFakeGraphsData = (fakeData, currentFilterValues) =>
  useMemo(() => {
    const result =
      fakeData.pitches_all?.filter(pitch =>
        groupsArr.every(group =>
          currentFilterValues[group] === 'all' ? true : pitch[group][currentFilterValues[group]]
        )
      ) || [];

    return result;
  }, [fakeData, currentFilterValues]);

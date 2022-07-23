import { useMemo } from 'react';

const SORT_PRIORITY = {
  All: 1,
  Score: 2,
  Single: 3,
  Double: 4,
  Triple: 5,
  'Home Run': 6,
  Strikeout: 7,
  'Double Play': 8,
  Stealing: 9,
  'Caught Stealing': 10,
  Error: 11,
  'Wild Pitch': 12,
  'Passed Ball': 13,
  Walk: 14,
  'Hit By Pitch': 15,
  Balk: 16,
  Groundout: 17,
  GDP: 18,
  Flyout: 19,
  Pickoff: 20,
  Sacrifice: 21,
  Bunt: 22,
  Interference: 23,
  Replace: 24
};

export const useFilterSituations = newSituations =>
  useMemo(() => {
    let filteredSituations = [{ name: 'All', count: 1, priority: 1 }];
    for (let newSituation of newSituations) {
      let count = newSituations.filter(sit => sit === newSituation).length;
      let index = filteredSituations.findIndex(sit => sit.name === newSituation);
      if (index !== -1) continue;
      filteredSituations[filteredSituations.length] = {
        name: newSituation,
        count,
        priority: SORT_PRIORITY[newSituation]
      };
    }

    return filteredSituations;
  }, [newSituations]);

export const useSortFilteredSituations = newSituations => {
  const sortedSituations = useFilterSituations(newSituations);

  return useMemo(() => {
    sortedSituations.sort((a, b) => (a.priority > b.priority ? 1 : -1));

    return sortedSituations;
  }, [sortedSituations]);
};

import { useMemo } from 'react';

const useFilterSituations = newSituations =>
  useMemo(() => {
    let filteredSituations = [{ name: 'All', count: 1 }];
    for (let newSituation of newSituations) {
      let count = newSituations.filter(sit => sit === newSituation).length;
      let index = filteredSituations.findIndex(sit => sit.name === newSituation);
      if (index !== -1) continue;
      filteredSituations[filteredSituations.length] = { name: newSituation, count };
    }

    return filteredSituations;
  }, [newSituations]);

export default useFilterSituations;

import { useMemo } from 'react';

const useSummaryRHE = innings =>
  useMemo(() => {
    const initialRHE = { bot_err: 0, top_err: 0, bot_hits: 0, bot_runs: 0, top_hits: 0, top_runs: 0 };
    const newInnings = innings.slice();

    return newInnings.reduce((sum, inning) => {
      Object.keys(sum).forEach(field => (sum[field] += inning[field] || 0));
      return sum;
    }, initialRHE);
  }, [innings]);

export default useSummaryRHE;

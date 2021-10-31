import { useMemo } from 'react';

const useSummaryRHE = (innings, inningNumber) =>
  useMemo(() => {
    const initialRHE = { bot_err: 0, top_err: 0, bot_hits: 0, bot_runs: 0, top_hits: 0, top_runs: 0 };
    // const newInnings = inningNumber === null ? innings.slice() : innings.slice(0, inningNumber);
    const newInnings =
      inningNumber === null ? innings.slice() : innings.filter(inning => inning.number === inningNumber);

    return inningNumber === null
      ? newInnings.reduce((sum, inning) => {
          Object.keys(sum).forEach(field => (sum[field] += inning[field] || 0));
          return sum;
        }, initialRHE)
      : Object.assign(initialRHE, newInnings[0]);
  }, [innings, inningNumber]);

export default useSummaryRHE;

import React from 'react';
import cl from './HeaderInfo.module.scss';
import useSummaryRHE from 'hooks/useSummaryRHE';

const HeaderInfo = ({ innings }) => {
	const summaryRHE = useSummaryRHE(innings)

  return (
    <div className={cl.info}>
      <div>
        <span>R</span>
        <span>{summaryRHE.top_runs}</span>
        <span>{summaryRHE.bot_runs}</span>
      </div>
      <div>
        <span>H</span>
        <span>{summaryRHE.top_hits}</span>
        <span>{summaryRHE.bot_hits}</span>
      </div>
      <div>
        <span>E</span>
        <span>{summaryRHE.top_err}</span>
        <span>{summaryRHE.bot_err}</span>
      </div>
    </div>
  );
};

export default HeaderInfo;

import React from 'react';
import cl from './HeaderInfo.module.scss';
import useSummaryRHE from 'hooks/useSummaryRHE';
import { useSelector } from 'react-redux';

const HeaderInfo = ({ innings }) => {
	const inningNumber = useSelector(state => state.game.inningNumber)
  const summaryRHE = useSummaryRHE(innings, inningNumber);

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

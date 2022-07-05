import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import cl from './ContentMobileBox.module.scss';

const TABLES_INFO = {
  Batting: {
    headers: [
      { name: 'POS', isWider: false, isWidest: true },
      { name: 'AB', isWider: false },
      { name: 'R', isWider: false },
      { name: 'H', isWider: false },
      { name: '2B', isWider: false },
      { name: '3B', isWider: false },
      { name: 'HR', isWider: false },
      { name: 'RBI', isWider: false },
      { name: 'GDP', isWider: false },
      { name: 'BB', isWider: false },
      { name: 'IBB', isWider: false },
      { name: 'HP', isWider: false },
      { name: 'SH', isWider: false },
      { name: 'SF', isWider: false },
      { name: 'SO', isWider: false },
      { name: 'TB', isWider: false },
      { name: 'AVG', isWider: true },
      { name: 'SLG', isWider: true },
      { name: 'OBP', isWider: true },
      { name: 'OPS', isWider: true }
    ]
  },
  Running: {
    headers: [
      { name: 'POS', isWider: false, isWidest: true },
      { name: 'SB', isWider: false },
      { name: 'CS', isWider: false },
      { name: 'SB_pr', isWider: true },
      { name: 'LOB', isWider: false }
    ]
  },
  Pitching: {
    headers: [
      { name: 'IP', isWider: false },
      { name: 'PA', isWider: false },
      { name: 'R', isWider: false },
      { name: 'ER', isWider: false },
      { name: 'H', isWider: false },
      { name: '2B', isWider: false },
      { name: '3B', isWider: false },
      { name: 'HR', isWider: false },
      { name: 'BB', isWider: false },
      { name: 'IBB', isWider: false },
      { name: 'HP', isWider: false },
      { name: 'SH', isWider: false },
      { name: 'SF', isWider: false },
      { name: 'SO', isWider: false },
      { name: 'WP', isWider: false },
      { name: 'BK', isWider: false },
      { name: 'ERA', isWider: true },
      { name: 'NP', isWider: false },
      { name: 'NS', isWider: false },
      { name: 'NB', isWider: false }
    ]
  },
  Fielding: {
    headers: [
      { name: 'POS', isWider: false, isWidest: true },
      { name: 'CH', isWider: false },
      { name: 'PO', isWider: false },
      { name: 'A', isWider: false },
      { name: 'E', isWider: false },
      { name: 'DP', isWider: false },
      { name: 'FLD', isWider: true }
    ]
  },
  Catching: {
    headers: [
      { name: 'SB', isWider: false },
      { name: 'CS', isWider: false },
      { name: 'PB', isWider: false }
    ]
  }
};

const BATTING_TITLES = ['Batting', 'Running', 'Fielding'];

const MobileBoxTable = ({ currentMode, tableData }) => {
  const [isScrollable, setIsScrollable] = useState(false);

  useEffect(() => {
    setIsScrollable(rowsRef.current.scrollWidth > rowsRef.current.clientWidth);
  }, [currentMode]);

  const headerScroll = useRef();
  const rowsRef = useRef();

  const getTableHeaders = () =>
    TABLES_INFO[currentMode].headers.map((mode, i) => (
      <div key={i} className={mode.isWider ? cl.wider : mode.isWidest ? cl.widest : null}>
        {mode.name === 'SB_pr' ? '%SB' : mode.name === 'FLD' ? 'FLD%' : mode.name}
      </div>
    ));

  let rowDelta = 0;

  const orderedPlayersStats = tableData.players_stats.slice();

  currentMode === 'Pitching' &&
    tableData.pitchers_order.forEach((orderId, i) => {
			const player = orderedPlayersStats.find(player => player.id === orderId)

			if (player !== undefined) {
				player.order = i + 1;
			}
    });
  return (
    <div className={cl.mobileWrapper}>
      <div className={cl.fullHeader}>
        <div className={cl.leftHeader}>
          <div></div>
          <div></div>
        </div>
        <div className={cl.rightHeader} ref={headerScroll}>
          {getTableHeaders()}
        </div>
      </div>
      <div className={cl.sides}>
        <div className={cl.leftRows}>
          {orderedPlayersStats
            .filter(player =>
              currentMode === 'Pitching'
                ? player.is_pitcher
                : currentMode === 'Catching'
                ? player.is_catcher
                : true
            )
            .sort((a, b) => (currentMode === 'Pitching' ? (a.order > b.order ? 1 : -1) : 0))
            .map((player, i) => {
              if (player.is_substituted && BATTING_TITLES.includes(currentMode)) rowDelta++;

              return (
                <div key={i} className={cl.tableRow}>
                  {currentMode !== 'Pitching' && currentMode !== 'Catching' && (
                    <div>
                      {(player.is_substituted && BATTING_TITLES.includes(currentMode)) ||
                      !BATTING_TITLES.includes(currentMode)
                        ? ' '
                        : i + 1 - rowDelta}
                    </div>
                  )}
                  <div
                    style={
                      player.is_substituted && BATTING_TITLES.includes(currentMode)
                        ? { paddingLeft: '2.5rem' }
                        : !BATTING_TITLES.includes(currentMode)
                        ? { flex: '0 0 192px', paddingLeft: '10px' }
                        : null
                    }
                    className={cl.playerName}>
                    <Link to={`/stats/player/${player.id}`}>{player.content.name}</Link>
                  </div>
                </div>
              );
            })}
          <div className={cl.tableRow + ' ' + cl.footerRow}>TOTALS</div>
        </div>
        <div
          className={cl.rightRows}
          onScroll={e => (headerScroll.current.scrollLeft = e.target.scrollLeft)}
          ref={rowsRef}>
          {orderedPlayersStats
            .filter(player =>
              currentMode === 'Pitching'
                ? player.is_pitcher
                : currentMode === 'Catching'
                ? player.is_catcher
                : true
            )
            .sort((a, b) => (currentMode === 'Pitching' ? (a.order > b.order ? 1 : -1) : 0))
            .map((player, i) => {
              return (
                <div
                  key={i}
                  className={cl.tableRow}
                  style={{
                    width: isScrollable ? 'fit-content' : '100%'
                  }}>
                  {TABLES_INFO[currentMode].headers.map((title, i) => {
										const value = title.name === 'POS'
										? player.content.positions.join('/')
										: ['SB', 'CS', 'SB_pr', 'LOB', 'PB'].includes(title.name)
										? player.content.stats[currentMode === 'Running' ? 'running' : 'catching'][
												title.name
											]
										: ['CH', 'PO', 'A', 'E', 'DP', 'FLD'].includes(title.name)
										? player.content.stats.fielding[title.name]
										: title.isWider
										? player.content.stats[
												BATTING_TITLES.includes(currentMode) ? 'batting' : currentMode.toLowerCase()
											][title.name] === 'Infinity'
											? 'INF'
											: Number(
													player.content.stats[
														BATTING_TITLES.includes(currentMode) ? 'batting' : currentMode.toLowerCase()
													][title.name]
												).toFixed(3)
										: player.content.stats[
												BATTING_TITLES.includes(currentMode) ? 'batting' : currentMode.toLowerCase()
											][title.name]

                    return (
                      <div key={i} className={title.isWider ? cl.wider : title.isWidest ? cl.widest : null}>
                        {Number(value) !== -1 ? value : '—'}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          <div
            className={cl.tableRow + ' ' + cl.footerRow}
            style={{
              width: isScrollable ? 'fit-content' : '100%'
            }}>
            {TABLES_INFO[currentMode].headers.map((title, i) => (
              <div key={i} className={title.isWider ? cl.wider : title.isWidest ? cl.widest : null}>
                {title.name === 'POS'
                  ? ' '
                  : title.name === 'SB_pr'
                  ? tableData.total_stats.running.SB_pr
                  : title.name === 'FLD'
                  ? Number(tableData.total_stats.fielding.FLD).toFixed(3)
                  : ['CH', 'PO', 'A', 'E', 'DP'].includes(title.name)
                  ? tableData.total_stats.fielding[title.name]
                  : title.isWider
                  ? Number(tableData.total_stats[currentMode.toLowerCase()][title.name]).toFixed(3)
                  : ['SB', 'CS', 'LOB', 'PB'].includes(title.name)
                  ? tableData.total_stats[currentMode === 'Running' ? 'running' : 'catching'][title.name]
                  : tableData.total_stats[
                      BATTING_TITLES.includes(currentMode) ? 'batting' : currentMode.toLowerCase()
                    ][title.name]}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileBoxTable;

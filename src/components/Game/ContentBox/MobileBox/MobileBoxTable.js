import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import cl from './ContentMobileBox.module.scss';
import MobileBoxTableHeader from './MobileBoxTableHeader';

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
      { name: 'ERA', isWider: false, isWidest: true },
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

  let orderedPlayersStats;

  const { players_stats, pitchers, catchers } = tableData;

  if (currentMode !== 'Pitching' && currentMode !== 'Catching') orderedPlayersStats = players_stats.slice();

  if (currentMode === 'Pitching') orderedPlayersStats = pitchers.slice();
  if (currentMode === 'Catching') orderedPlayersStats = catchers.slice();

  const isPitcherOrCatcher = ['Pitching', 'Catching'].includes(currentMode);

  const getValue = (title, player) => {
    const tableMode = currentMode.toLowerCase();

    if (player.id === -1) return ' ';
    if (title.name === 'POS') return player.content.positions.join('/');

    if (!isPitcherOrCatcher) {
      if (player.content.stats[tableMode][title.name] === 'INF') return 'INF';

      if (['AVG', 'SLG', 'OBP', 'OPS'].includes(title.name))
        return Number(player.content.stats.batting[title.name]).toFixed(3);

      if (title.name === 'SB_pr') return Number(player.content.stats.running.SB_pr).toFixed(3);

      if (title.name === 'FLD') return Number(player.content.stats.fielding.FLD).toFixed(3);

      return player.content.stats[tableMode][title.name];
    }

    if (currentMode === 'Pitching') {
      if (player.pitching[title.name] === 'INF') return 'INF';
      if (title.name === 'ERA') return Number(player.pitching.ERA).toFixed(3);

      return player.pitching[title.name];
    }

    if (currentMode === 'Catching') {
      if (player.catching[title.name] === 'INF') return 'INF';

      return player.catching[title.name];
    }

    return ' ';
  };
  return (
    <div className={cl.mobileWrapper}>
      <MobileBoxTableHeader getTableHeaders={getTableHeaders} ref={headerScroll} />
      <div className={cl.sides}>
        <div className={cl.leftRows}>
          {orderedPlayersStats.map((player, i) => {
            if (player.is_substituted && BATTING_TITLES.includes(currentMode)) rowDelta++;

            const playerLinkName = isPitcherOrCatcher ? player.name : player.content.name;
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
                  <Link to={`/stats/player/${player.id}`}>{playerLinkName}</Link>
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
          {orderedPlayersStats.map((player, i) => {
            return (
              <div
                key={i}
                className={cl.tableRow}
                style={{
                  width: isScrollable ? 'fit-content' : '100%'
                }}>
                {TABLES_INFO[currentMode].headers.map((title, i) => {
                  const value = getValue(title, player);
                  // player.id === -1
                  //   ? ' '
                  //   : title.name === 'POS'
                  //   ? player.content.positions.join('/')
                  //   : ['SB', 'CS', 'SB_pr', 'LOB', 'PB'].includes(title.name)
                  //   ? player.content.stats[currentMode === 'Running' ? 'running' : 'catching'][title.name]
                  //   : ['CH', 'PO', 'A', 'E', 'DP', 'FLD'].includes(title.name)
                  //   ? player.content.stats.fielding[title.name]
                  //   : title.isWider
                  //   ? player.content.stats[
                  //       BATTING_TITLES.includes(currentMode) ? 'batting' : currentMode.toLowerCase()
                  //     ][title.name] === 'Infinity'
                  //     ? 'INF'
                  //     : Number(
                  //         player.content.stats[
                  //           BATTING_TITLES.includes(currentMode) ? 'batting' : currentMode.toLowerCase()
                  //         ][title.name]
                  //       ).toFixed(3)
                  //   : player.content.stats[
                  //       BATTING_TITLES.includes(currentMode) ? 'batting' : currentMode.toLowerCase()
                  //     ][title.name];

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

import React, { useState, useEffect, useRef } from 'react';
import cl from './ContentMobileBox.module.scss';

const TABLES_INFO = {
  Batting: {
    headers: [
      { name: 'POS', isWider: false, isWidest: true },
      { name: 'AB', isWider: false },
      { name: 'H', isWider: false },
      { name: '2B', isWider: false },
      { name: '3B', isWider: false },
      { name: 'HR', isWider: false },
      { name: 'RBI', isWider: false },
      { name: 'GDP', isWider: false },
      { name: 'BB', isWider: false },
      { name: 'HP', isWider: false },
      { name: 'SH', isWider: false },
      { name: 'SF', isWider: false },
      { name: 'SO', isWider: false },
      { name: 'TB', isWider: false },
      { name: 'AVG', isWider: true },
      { name: 'SLG', isWider: true },
      { name: 'OBP', isWider: true },
      { name: 'OPS', isWider: true },
      { name: 'CH', isWider: false },
      { name: 'PO', isWider: false },
      { name: 'A', isWider: false },
      { name: 'E', isWider: false },
      { name: 'DP', isWider: false },
      { name: 'FLD', isWider: true }
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

  console.log(tableData);
  let rowDelta = 0;
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
          {tableData.players_stats
            .filter(player =>
              currentMode === 'Pitching'
                ? player.is_pitcher
                : currentMode === 'Catching'
                ? player.is_catcher
                : true
            )
            .map((player, i) => {
              if (player.is_substituted && BATTING_TITLES.includes(currentMode)) rowDelta++;

              return (
                <div key={i} className={cl.tableRow}>
                  <div>
                    {(player.is_substituted && BATTING_TITLES.includes(currentMode)) ||
                    !BATTING_TITLES.includes(currentMode)
                      ? ' '
                      : i + 1 - rowDelta}
                  </div>
                  <div
                    style={
                      player.is_substituted && BATTING_TITLES.includes(currentMode)
                        ? { paddingLeft: '2.5rem' }
                        : null
                    }
                    className={cl.playerName}>
                    {player.content.player_name}
                  </div>
                </div>
              );
            })}
        </div>
        <div
          className={cl.rightRows}
          onScroll={e => (headerScroll.current.scrollLeft = e.target.scrollLeft)}
          ref={rowsRef}>
          {tableData.players_stats
            .filter(player =>
              currentMode === 'Pitching'
                ? player.is_pitcher
                : currentMode === 'Catching'
                ? player.is_catcher
                : true
            )
            .map((player, i) => {
              return (
                <div
                  key={i}
                  className={cl.tableRow}
                  style={
                    // currentMode === 'Catching' || currentMode === 'Running' ? { width: '100%' } : null
                    {
                      width: isScrollable ? 'fit-content' : '100%'
                    }
                  }>
                  {TABLES_INFO[currentMode].headers.map((title, i) => (
                    <div key={i} className={title.isWider ? cl.wider : title.isWidest ? cl.widest : null}>
                      {title.name === 'POS'
                        ? player.content.position.join('/')
                        : ['SB', 'CS', 'SB_pr', 'LOB'].includes(title.name)
                        ? player.content.stat.running[title.name]
                        : ['CH', 'PO', 'A', 'E', 'DP', 'FLD'].includes(title.name)
                        ? player.content.stat.fielding[title.name]
                        : title.name === 'PB'
                        ? '--'
                        : title.isWider
                        ? Number(
                            player.content.stat[
                              BATTING_TITLES.includes(currentMode) ? 'batting' : currentMode.toLowerCase()
                            ][title.name]
                          ).toFixed(3)
                        : player.content.stat[
                            BATTING_TITLES.includes(currentMode) ? 'batting' : currentMode.toLowerCase()
                          ][title.name]}
                    </div>
                  ))}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default MobileBoxTable;

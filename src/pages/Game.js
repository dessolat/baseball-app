import React, { useState, useEffect, useRef } from 'react';
import { filterSituationsList } from '../data';
import fullData from 'baseball.json';
import Header from 'components/Game/Header/Header';
import Filters from 'components/Game/Filters/Filters';
import Content from 'components/Game/Content/Content';

const Game = () => {
  const [situationFilter, setSituationFilter] = useState('All');
  const [inningNumber, setInningNumber] = useState(null);
  const [viewMode, setViewMode] = useState('mode-1');
  const [jsonData, setJsonData] = useState(fullData);
  // const [activeSituation, setActiveSituation] = useState(null)

  // useEffect(() => {
  //   const handleKeyDown = e => {
  //     if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;

  //     console.log(e.key);
  //   };

  //   document.addEventListener('keydown', handleKeyDown);

  //   return () => {
  //     document.removeEventListener('keydown', handleKeyDown);
  //   };
  // }, []);
  const selectJSON = e => {
    const files = e.target.files;

    for (let i = 0, f; (f = files[i]); i++) {
      const reader = new FileReader();

      reader.onload = (function (theFile) {
        return e => {
          try {
            const json = JSON.parse(e.target.result);
            setJsonData(json)
          } catch (ex) {
            alert('ex when trying to parse json = ' + ex);
          }
        };
      })(f);
      reader.readAsText(f);
    }
  }

  return (
    <>
      <input
        type='file'
        onChange={selectJSON}
        style={{ position: 'fixed', left: 0, top: 0 }}
				accept='application/json'
      />
      <Header {...jsonData} inningNumber={inningNumber} setInningNumber={setInningNumber} />
      <Filters
        situationFilter={situationFilter}
        setSituationFilter={setSituationFilter}
        viewMode={viewMode}
        setViewMode={setViewMode}
        situations={filterSituationsList}
      />
      <Content viewMode={viewMode} innings={jsonData.innings} inningNumber={inningNumber} />
    </>
  );
};

export default Game;

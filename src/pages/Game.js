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
  const JSONRef = useRef(null);
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

  console.log(JSONRef.current);

  // const getJSONData = e => {
  //   const file = e.target.files[0];

  //   // setting up the reader
  //   const reader = new FileReader();
  //   reader.readAsDataURL(file, JSON);

  //   // here we tell the reader what to do when it done reading...
  //   reader.onload = readerEvent => {
  // 		const json = JSON.parse(readerEvent.target.result);
  //     // const content = readerEvent.target.result; // this is the content!
  //     // console.log(content)
  //     console.log(json)
  // 		// setJsonData();
  //   };
  // };

  function handleFileSelect(evt) {
    var files = evt.target.files; // FileList object

    // files is a FileList of File objects. List some properties.
    var output = [];
    for (var i = 0, f; (f = files[i]); i++) {
      var reader = new FileReader();

      // Closure to capture the file information.
      reader.onload = (function (theFile) {
        return function (e) {
          console.log('e readAsText = ', e);
          console.log('e readAsText target = ', e.target);
          try {
            let json = JSON.parse(e.target.result);
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
        ref={JSONRef}
        onChange={handleFileSelect}
        style={{ position: 'fixed', left: 0, top: 0 }}
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

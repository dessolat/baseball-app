import React, { useState } from 'react';
import Header from 'components/Game/Header/Header';
import Filters from 'components/Game/Filters/Filters';
import Content from 'components/Game/Content/Content';
import { useDispatch } from 'react-redux';
import { setFullData } from 'redux/gameReducer';

const Game = () => {
  const [situations, setSituations] = useState(['All']);
  const [viewMode, setViewMode] = useState('mode-1');
  const dispatch = useDispatch();

  const selectJSON = e => {
    const files = e.target.files;

    for (let i = 0, f; (f = files[i]); i++) {
      const reader = new FileReader();

      reader.onload = (function (theFile) {
        return e => {
          try {
            const json = JSON.parse(e.target.result);
            dispatch(setFullData(json));
          } catch (ex) {
            alert('ex when trying to parse json = ' + ex);
          }
        };
      })(f);
      reader.readAsText(f);
    }
  };

  return (
    <>
      <input
        type='file'
        onChange={selectJSON}
        style={{ position: 'fixed', left: 0, top: 0 }}
        accept='application/json'
      />
      <Header />
      <Filters viewMode={viewMode} setViewMode={setViewMode} situations={situations} />
      <Content viewMode={viewMode} setSituations={setSituations} />
    </>
  );
};

export default Game;

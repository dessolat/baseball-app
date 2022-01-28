import React, { useState, useEffect, useRef } from 'react';
import cl from './ContentBox.module.scss';
import ContentBoxTable from './ContentBoxTable';
import { setSearchParam } from 'utils';
import Loader from 'components/UI/loaders/Loader/Loader';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ContentBoxFooter from '../ContentBoxFooter/ContentBoxFooter';

const TABLE_DATA = {
  guests: {
    batting: [
      {
        player_name: 'SURNAME name',
        pos: '00',
        ab: 0,
        h: 0,
        '2b': 0,
        '3b': 0,
        hr: 0,
        rbi: 0,
        gdp: 0,
        bb: 0,
        hp: 0,
        sh: 0,
        sf: 0,
        so: 0,
        tb: 0,
        avg: 0,
        slg: 0,
        obp: 0,
        ops: 0,
        sb: 0,
        cs: 0,
        '%sb': 0,
        lob: 0
      },
      {
        player_name: 'SURNAME name',
        pos: '00',
        ab: 0,
        h: 0,
        '2b': 0,
        '3b': 0,
        hr: 0,
        rbi: 0,
        gdp: 0,
        bb: 0,
        hp: 0,
        sh: 0,
        sf: 0,
        so: 0,
        tb: 0,
        avg: 0,
        slg: 0,
        obp: 0,
        ops: 0,
        sb: 0,
        cs: 0,
        '%sb': 0,
        lob: 0
      },
      {
        player_name: 'SURNAME name',
        pos: '00',
        ab: 0,
        h: 0,
        '2b': 0,
        '3b': 0,
        hr: 0,
        rbi: 0,
        gdp: 0,
        bb: 0,
        hp: 0,
        sh: 0,
        sf: 0,
        so: 0,
        tb: 0,
        avg: 0,
        slg: 0,
        obp: 0,
        ops: 0,
        sb: 0,
        cs: 0,
        '%sb': 0,
        lob: 0
      },
      {
        player_name: 'SURNAME name',
        pos: '00',
        ab: 0,
        h: 0,
        '2b': 0,
        '3b': 0,
        hr: 0,
        rbi: 0,
        gdp: 0,
        bb: 0,
        hp: 0,
        sh: 0,
        sf: 0,
        so: 0,
        tb: 0,
        avg: 0,
        slg: 0,
        obp: 0,
        ops: 0,
        sb: 0,
        cs: 0,
        '%sb': 0,
        lob: 0
      },
      {
        player_name: 'SURNAME name',
        pos: '00',
        ab: 0,
        h: 0,
        '2b': 0,
        '3b': 0,
        hr: 0,
        rbi: 0,
        gdp: 0,
        bb: 0,
        hp: 0,
        sh: 0,
        sf: 0,
        so: 0,
        tb: 0,
        avg: 0,
        slg: 0,
        obp: 0,
        ops: 0,
        sb: 0,
        cs: 0,
        '%sb': 0,
        lob: 0
      },
      {
        player_name: 'SURNAME name',
        pos: '00',
        ab: 0,
        h: 0,
        '2b': 0,
        '3b': 0,
        hr: 0,
        rbi: 0,
        gdp: 0,
        bb: 0,
        hp: 0,
        sh: 0,
        sf: 0,
        so: 0,
        tb: 0,
        avg: 0,
        slg: 0,
        obp: 0,
        ops: 0,
        sb: 0,
        cs: 0,
        '%sb': 0,
        lob: 0
      },
      {
        player_name: 'SURNAME name',
        pos: '00',
        ab: 0,
        h: 0,
        '2b': 0,
        '3b': 0,
        hr: 0,
        rbi: 0,
        gdp: 0,
        bb: 0,
        hp: 0,
        sh: 0,
        sf: 0,
        so: 0,
        tb: 0,
        avg: 0,
        slg: 0,
        obp: 0,
        ops: 0,
        sb: 0,
        cs: 0,
        '%sb': 0,
        lob: 0
      },
      {
        player_name: 'SURNAME name',
        pos: '00',
        ab: 0,
        h: 0,
        '2b': 0,
        '3b': 0,
        hr: 0,
        rbi: 0,
        gdp: 0,
        bb: 0,
        hp: 0,
        sh: 0,
        sf: 0,
        so: 0,
        tb: 0,
        avg: 0,
        slg: 0,
        obp: 0,
        ops: 0,
        sb: 0,
        cs: 0,
        '%sb': 0,
        lob: 0
      },
      {
        player_name: 'SURNAME name',
        pos: '00',
        ab: 0,
        h: 0,
        '2b': 0,
        '3b': 0,
        hr: 0,
        rbi: 0,
        gdp: 0,
        bb: 0,
        hp: 0,
        sh: 0,
        sf: 0,
        so: 0,
        tb: 0,
        avg: 0,
        slg: 0,
        obp: 0,
        ops: 0,
        sb: 0,
        cs: 0,
        '%sb': 0,
        lob: 0
      },
      {
        player_name: 'SURNAME name',
        pos: '00',
        ab: 0,
        h: 0,
        '2b': 0,
        '3b': 0,
        hr: 0,
        rbi: 0,
        gdp: 0,
        bb: 0,
        hp: 0,
        sh: 0,
        sf: 0,
        so: 0,
        tb: 0,
        avg: 0,
        slg: 0,
        obp: 0,
        ops: 0,
        sb: 0,
        cs: 0,
        '%sb': 0,
        lob: 0
      }
    ],
    pitching: [
      {
        player_name: 'SURNAME name (W/L)',
        PA: 0,
        R: 0,
        ER: 0,
        h: 0,
        '2B': 0,
        '3B': 0,
        HR: 0,
        BB: 0,
        IBB: 0,
        HP: 0,
        SH: 0,
        SF: 0,
        SO: 0,
        WP: 0,
        ERA: 0,
        NP: 0,
        NS: 0,
        NB: 0
      },
      {
        player_name: 'SURNAME name',
        PA: 0,
        R: 0,
        ER: 0,
        h: 0,
        '2B': 0,
        '3B': 0,
        HR: 0,
        BB: 0,
        IBB: 0,
        HP: 0,
        SH: 0,
        SF: 0,
        SO: 0,
        WP: 0,
        ERA: 0,
        NP: 0,
        NS: 0,
        NB: 0
      },
      {
        player_name: 'SURNAME name',
        PA: 0,
        R: 0,
        ER: 0,
        h: 0,
        '2B': 0,
        '3B': 0,
        HR: 0,
        BB: 0,
        IBB: 0,
        HP: 0,
        SH: 0,
        SF: 0,
        SO: 0,
        WP: 0,
        ERA: 0,
        NP: 0,
        NS: 0,
        NB: 0
      }
    ],
    fielding: [
      { player_name: 'SURNAME name (W/L)', CH: 0, PO: 0, A: 0, E: 0, DP: 0, 'FLD%': 0 },
      { player_name: 'SURNAME name', CH: 0, PO: 0, A: 0, E: 0, DP: 0, 'FLD%': 0 },
      { player_name: 'SURNAME name', CH: 0, PO: 0, A: 0, E: 0, DP: 0, 'FLD%': 0 }
    ],
    catching: [
      { player_name: 'SURNAME name (W/L)', SB: 0, CS: 0, PB: 0 },
      { player_name: 'SURNAME name', SB: 0, CS: 0, PB: 0 },
      { player_name: 'SURNAME name', SB: 0, CS: 0, PB: 0 }
    ]
  }
};

const ContentBox = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [boxData, setBoxData] = useState({});
  const [activeButton, setActiveButton] = useState('guests');

  const { gameId } = useParams();

  const cancelTokenRef = useRef();

  const { batting, pitching, fielding, catching } = TABLE_DATA.guests;
  const { footer, guests, owners } = boxData || {};

  useEffect(() => {
    setSearchParam('tab', 'box');

    const fetchBoxData = async () => {
      cancelTokenRef.current = axios.CancelToken.source();

      try {
        setIsLoading(true);
        const response = await axios.get(`http://51.250.11.151:3030/game_${gameId}/box`, {
          cancelToken: cancelTokenRef.current.token
        });
        setBoxData(response.data);
      } catch (err) {
        err.message !== null && console.log(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBoxData();

    return () => {
      cancelTokenRef.current.cancel(null);
    };
  }, []);

  const getClassName = name => (name === activeButton ? cl.active : null);

  const handleButtonClick = name => () => setActiveButton(name);

	const tableData = boxData[activeButton]
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : Object.keys(boxData).length === 0 ? (
        <></>
      ) : (
        <div className={cl.box}>
          <div className='container'>
            <div className={cl.tables}>
              <ContentBoxTable
                tableData={tableData}
                tableClass={cl.battingTable}
								tableName='batting'
                footerOffset={2}
                toFixList={['AVG', 'SLG', 'OBP', 'OPS']}
								/>
              <ContentBoxTable
                tableData={tableData}
                tableClass={cl.pitchingTable}
								tableName='pitching'
                footerOffset={1}
                toFixList={['ERA']}
              />
              <div className={cl.wrapper}>
                <ContentBoxTable tableData={tableData} tableClass={cl.fieldingTable} tableName='fielding' footerOffset={1} />
                <ContentBoxTable tableData={tableData} tableClass={cl.catchingTable} tableName='catching' footerOffset={1} />
              </div>
              <div className={cl.buttons}>
                <span className={getClassName('guests')} onClick={handleButtonClick('guests')}>
                  Guests
                </span>
                <span className={getClassName('owners')} onClick={handleButtonClick('owners')}>
                  Owners
                </span>
              </div>
            </div>
          </div>
          <ContentBoxFooter footer={footer} />
        </div>
      )}
    </>
  );
};

export default ContentBox;

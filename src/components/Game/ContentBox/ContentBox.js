import React, { useState, useEffect } from 'react';
import cl from './ContentBox.module.scss';
import ContentBoxTable from './ContentBoxTable';
import { setSearchParam } from 'utils';
import Loader from 'components/UI/loaders/Loader/Loader';
import axios from 'axios';
import { useParams } from 'react-router-dom';

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

const FOOTER_DATA = {
  leftData: {
    location: 'Moscow',
    stadium: 'RusStar Arena Ballpark',
    weather: 'Cloudy, +19',
    att: 300,
    t: '2:08',
    hpUmpire: 'Dzianis PRYPUTNEVICH'
  },
  rightData: {
    bUmpire: 'Milan Preradović',
    scorers: ['Nadezhda PASHKOVA', 'Petr ROTMISTROV', 'ALEXANDER KAVERIN'],
    tcs: ['Jürgen Elsishans', 'Alessandra Soprani']
  }
};

const ContentBox = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [boxData, setBoxData] = useState({});
  const [activeButton, setActiveButton] = useState('guests');

	const { gameId } = useParams();

  const { batting, pitching, fielding, catching } = TABLE_DATA.guests;
  const { location, stadium, weather, att, t, hpUmpire } = FOOTER_DATA.leftData;
  const { bUmpire, scorers, tcs } = FOOTER_DATA.rightData;
	const { footer, guests, owners } = boxData || {}

  useEffect(() => {
    setSearchParam('tab', 'box');

		const fetchBoxData = async () => {
			try {
				setIsLoading(true)
				const response = await axios.get(`http://51.250.11.151:3030/game_${gameId}/box`)
				setBoxData(response.data)
			} catch (err) {
				console.log(err.message);
			} finally {
				setIsLoading(false)
			}
		}

		fetchBoxData()
  }, []);

  const getClassName = name => (name === activeButton ? cl.active : null);

  const handleButtonClick = name => () => setActiveButton(name);
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
                tableData={batting}
                tableClass={cl.battingTable}
                footerOffset={2}
                toFixList={['avg', 'slg', 'obp', 'ops']}
              />
              <ContentBoxTable
                tableData={pitching}
                tableClass={cl.pitchingTable}
                footerOffset={1}
                toFixList={['ERA']}
              />
              <div className={cl.wrapper}>
                <ContentBoxTable tableData={fielding} tableClass={cl.fieldingTable} footerOffset={1} />
                <ContentBoxTable tableData={catching} tableClass={cl.catchingTable} footerOffset={1} />
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

          <div className={cl.footer}>
            <div className={cl.footerContainer}>
              <div>
                <p>Location: {footer.location}</p>
                <p>Stadium: {footer.stadium}</p>
                <p>Weather: {footer.weather}</p>
                <p>Att: {footer.att}</p>
                <p>T: {footer.t}</p>
                <p>HP Umpire: {footer.umpires ? footer.umpires[0] : ' '}</p>
              </div>
              <div>
                <p>1B Umpire: {footer.umpires ? footer.umpires[1] : ' '}</p>
                <p>Scorer: {footer.scorers ? footer.scorers[0] : ' '}</p>
                <p>Scorer: {footer.scorers ? footer.scorers[1] : ' '}</p>
                <p>Scorer: {footer.scorers ? footer.scorers[2] : ' '}</p>
                <p>TC: {footer.tc ? footer.tc[0] : ' '}</p>
                <p>TC: {footer.tc ? footer.tc[1] : ' '}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ContentBox;

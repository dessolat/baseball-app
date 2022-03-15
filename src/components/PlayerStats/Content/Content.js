import React, { useState, useEffect, useRef } from 'react';
import cl from './Content.module.scss';
import ContentBattingTable from '../ContentBattingTable/ContentBattingTable';
import ContentPitchingTable from '../ContentPitchingTable/ContentPitchingTable';
import Dropdown from 'components/UI/dropdown/GamesDropdown/Dropdown';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import ErrorLoader from 'components/UI/loaders/ErrorLoader/ErrorLoader';
import Loader from 'components/UI/loaders/Loader/Loader';
import { setStatsData } from 'redux/playerStatsReducer';

const Content = ({ games, playerYears }) => {
  const [error, setError] = useState('');
  const [isStatsLoading, setIsStatsLoading] = useState(false);
  const [tableType, setTableType] = useState('Batting');

  const statsData = useSelector(state => state.playerStats.statsData);
	const dispatch = useDispatch()

  const cancelTokenRef = useRef();

  const { playerName, playerSurname } = useParams();

  useEffect(() => {
    const fetchStats = async () => {
      cancelTokenRef.current = axios.CancelToken.source();

      try {
        setIsStatsLoading(true);
        const response = await axios.get(
          `http://51.250.11.151:3030/player?surname=${playerSurname}&name=${playerName}`,
          {
            cancelToken: cancelTokenRef.current.token,
            timeout: 5000
          }
        );
        console.log(response.data);
        setError('');
        dispatch(setStatsData(response.data));
      } catch (err) {
        if (err.message === null) return;
        console.log(err.message);
        setError(err.message);
      } finally {
        setIsStatsLoading(false);
      }
    };
    fetchStats();

    return () => {
      cancelTokenRef.current.cancel(null);
    };
    // eslint-disable-next-line
  }, [playerName, playerSurname]);

  const TABLE_DATA = {
    batting: [
      {
        year: '0000',
        league: 'Name League',
        game: '01 sep, Name team - Name Team',
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
        ch: 0,
        po: 0,
        a: 0,
        e: 0,
        dp: 0,
        'fld%': 0,
        sb: 0,
        cs: 0,
        '%sb': 0,
        lob: 0
      },
      {
        year: '0000',
        league: 'Name League',
        game: '01 sep, Name team - Name Team',
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
        ch: 0,
        po: 0,
        a: 0,
        e: 0,
        dp: 0,
        'fld%': 0,
        sb: 0,
        cs: 0,
        '%sb': 0,
        lob: 0
      },
      {
        year: '0000',
        league: 'Name League',
        game: '01 sep, Name team - Name Team',
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
        ch: 0,
        po: 0,
        a: 0,
        e: 0,
        dp: 0,
        'fld%': 0,
        sb: 0,
        cs: 0,
        '%sb': 0,
        lob: 0
      },
      {
        year: '0000',
        league: 'Name League',
        game: '01 sep, Name team - Name Team',
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
        ch: 0,
        po: 0,
        a: 0,
        e: 0,
        dp: 0,
        'fld%': 0,
        sb: 0,
        cs: 0,
        '%sb': 0,
        lob: 0
      },
      {
        year: '0000',
        league: 'Name League',
        game: '01 sep, Name team - Name Team',
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
        ch: 0,
        po: 0,
        a: 0,
        e: 0,
        dp: 0,
        'fld%': 0,
        sb: 0,
        cs: 0,
        '%sb': 0,
        lob: 0
      },
      {
        year: '0000',
        league: 'Name League',
        game: '01 sep, Name team - Name Team',
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
        ch: 0,
        po: 0,
        a: 0,
        e: 0,
        dp: 0,
        'fld%': 0,
        sb: 0,
        cs: 0,
        '%sb': 0,
        lob: 0
      },
      {
        year: '0000',
        league: 'Name League',
        game: '01 sep, Name team - Name Team',
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
        ch: 0,
        po: 0,
        a: 0,
        e: 0,
        dp: 0,
        'fld%': 0,
        sb: 0,
        cs: 0,
        '%sb': 0,
        lob: 0
      },
      {
        year: '0000',
        league: 'Name League',
        game: '01 sep, Name team - Name Team',
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
        ch: 0,
        po: 0,
        a: 0,
        e: 0,
        dp: 0,
        'fld%': 0,
        sb: 0,
        cs: 0,
        '%sb': 0,
        lob: 0
      },
      {
        year: '0000',
        league: 'Name League',
        game: '01 sep, Name team - Name Team',
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
        ch: 0,
        po: 0,
        a: 0,
        e: 0,
        dp: 0,
        'fld%': 0,
        sb: 0,
        cs: 0,
        '%sb': 0,
        lob: 0
      },
      {
        year: '0000',
        league: 'Name League',
        game: '01 sep, Name team - Name Team',
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
        ch: 0,
        po: 0,
        a: 0,
        e: 0,
        dp: 0,
        'fld%': 0,
        sb: 0,
        cs: 0,
        '%sb': 0,
        lob: 0
      }
    ],
    pitching: [
      {
        year: '0000',
        league: 'Name League',
        game: '01 sep, Name team - Name Team',
        pa: 0,
        r: 0,
        er: 0,
        h: 0,
        '2b': 0,
        '3b': 0,
        hr: 0,
        bb: 0,
        ibb: 0,
        hp: 0,
        sh: 0,
        sf: 0,
        so: 0,
        wp: 0,
        era: 0,
        np: 0,
        ns: 0,
        nb: 0
      },
      {
        year: '0000',
        league: 'Name League',
        game: '01 sep, Name team - Name Team',
        pa: 0,
        r: 0,
        er: 0,
        h: 0,
        '2b': 0,
        '3b': 0,
        hr: 0,
        bb: 0,
        ibb: 0,
        hp: 0,
        sh: 0,
        sf: 0,
        so: 0,
        wp: 0,
        era: 0,
        np: 0,
        ns: 0,
        nb: 0
      },
      {
        year: '0000',
        league: 'Name League',
        game: '01 sep, Name team - Name Team',
        pa: 0,
        r: 0,
        er: 0,
        h: 0,
        '2b': 0,
        '3b': 0,
        hr: 0,
        bb: 0,
        ibb: 0,
        hp: 0,
        sh: 0,
        sf: 0,
        so: 0,
        wp: 0,
        era: 0,
        np: 0,
        ns: 0,
        nb: 0
      },
      {
        year: '0000',
        league: 'Name League',
        game: '01 sep, Name team - Name Team',
        pa: 0,
        r: 0,
        er: 0,
        h: 0,
        '2b': 0,
        '3b': 0,
        hr: 0,
        bb: 0,
        ibb: 0,
        hp: 0,
        sh: 0,
        sf: 0,
        so: 0,
        wp: 0,
        era: 0,
        np: 0,
        ns: 0,
        nb: 0
      },
      {
        year: '0000',
        league: 'Name League',
        game: '01 sep, Name team - Name Team',
        pa: 0,
        r: 0,
        er: 0,
        h: 0,
        '2b': 0,
        '3b': 0,
        hr: 0,
        bb: 0,
        ibb: 0,
        hp: 0,
        sh: 0,
        sf: 0,
        so: 0,
        wp: 0,
        era: 0,
        np: 0,
        ns: 0,
        nb: 0
      },
      {
        year: '0000',
        league: 'Name League',
        game: '01 sep, Name team - Name Team',
        pa: 0,
        r: 0,
        er: 0,
        h: 0,
        '2b': 0,
        '3b': 0,
        hr: 0,
        bb: 0,
        ibb: 0,
        hp: 0,
        sh: 0,
        sf: 0,
        so: 0,
        wp: 0,
        era: 0,
        np: 0,
        ns: 0,
        nb: 0
      },
      {
        year: '0000',
        league: 'Name League',
        game: '01 sep, Name team - Name Team',
        pa: 0,
        r: 0,
        er: 0,
        h: 0,
        '2b': 0,
        '3b': 0,
        hr: 0,
        bb: 0,
        ibb: 0,
        hp: 0,
        sh: 0,
        sf: 0,
        so: 0,
        wp: 0,
        era: 0,
        np: 0,
        ns: 0,
        nb: 0
      },
      {
        year: '0000',
        league: 'Name League',
        game: '01 sep, Name team - Name Team',
        pa: 0,
        r: 0,
        er: 0,
        h: 0,
        '2b': 0,
        '3b': 0,
        hr: 0,
        bb: 0,
        ibb: 0,
        hp: 0,
        sh: 0,
        sf: 0,
        so: 0,
        wp: 0,
        era: 0,
        np: 0,
        ns: 0,
        nb: 0
      },
      {
        year: '0000',
        league: 'Name League',
        game: '01 sep, Name team - Name Team',
        pa: 0,
        r: 0,
        er: 0,
        h: 0,
        '2b': 0,
        '3b': 0,
        hr: 0,
        bb: 0,
        ibb: 0,
        hp: 0,
        sh: 0,
        sf: 0,
        so: 0,
        wp: 0,
        era: 0,
        np: 0,
        ns: 0,
        nb: 0
      },
      {
        year: '0000',
        league: 'Name League',
        game: '01 sep, Name team - Name Team',
        pa: 0,
        r: 0,
        er: 0,
        h: 0,
        '2b': 0,
        '3b': 0,
        hr: 0,
        bb: 0,
        ibb: 0,
        hp: 0,
        sh: 0,
        sf: 0,
        so: 0,
        wp: 0,
        era: 0,
        np: 0,
        ns: 0,
        nb: 0
      }
    ]
  };

  const TABLE_OPTIONS = ['Batting', 'Pitching'];

  const handleTableOptionClick = option => setTableType(option);
  return (
    <section>
      <div className='container'>
        <div className={cl.content}>
          {error !== '' ? (
            <ErrorLoader />
          ) : isStatsLoading ? (
            <Loader styles={{margin: '5rem auto 10rem'}}/>
          ) : statsData.length === 0 ? (
            <></>
          ) : (
            <>
              <p className={cl.playerChr}>P | B/T: R/R | 6' 4" 220LBS | Age: 31</p>
              <div className={cl.dropWrapper}>
                <Dropdown
                  title={tableType}
                  options={TABLE_OPTIONS}
                  currentOption={tableType}
                  handleClick={handleTableOptionClick}
                />
              </div>
              {tableType === 'Batting' ? (
                <ContentBattingTable TABLE_DATA={TABLE_DATA} playerYears={playerYears} />
              ) : (
                <ContentPitchingTable TABLE_DATA={TABLE_DATA} playerYears={playerYears} />
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Content;

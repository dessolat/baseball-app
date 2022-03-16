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
import { setPlayerStatsData } from 'redux/playerStatsReducer';

const Content = ({ playerYears }) => {
  const [error, setError] = useState('');
  const [isStatsLoading, setIsStatsLoading] = useState(false);
  const [tableType, setTableType] = useState('Batting');

  const statsData = useSelector(state => state.playerStats.playerStatsData);

  const TABLE_OPTIONS = ['Batting', 'Pitching'];

  const handleTableOptionClick = option => setTableType(option);

  return (
    <section>
      <div className='container'>
        <div className={cl.content}>
          {error !== '' ? (
            <ErrorLoader />
          ) : isStatsLoading ? (
            <Loader styles={{ margin: '5rem auto 10rem' }} />
          ) : Object.keys(statsData).length === 0  ? (
            <></>
          ) : (
            <>
              <p className={cl.playerChr}>
                {statsData.pos || '—'} | B/T: {statsData.bat_hand}/{statsData.throw_hand} | {statsData.height}{' '}
                {statsData.weight}LBS | Age: {new Date().getFullYear() - statsData.yob}
              </p>
              <div className={cl.dropWrapper}>
                <Dropdown
                  title={tableType}
                  options={TABLE_OPTIONS}
                  currentOption={tableType}
                  handleClick={handleTableOptionClick}
                />
              </div>
              {tableType === 'Batting' ? (
                <ContentBattingTable leagues={statsData.leagues} playerYears={playerYears} />
              ) : (
                <ContentPitchingTable leagues={statsData.leagues} playerYears={playerYears} />
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Content;

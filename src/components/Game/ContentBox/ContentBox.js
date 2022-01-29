import React, { useState, useEffect, useRef } from 'react';
import cl from './ContentBox.module.scss';
import ContentBoxTable from './ContentBoxTable';
import { setSearchParam } from 'utils';
import Loader from 'components/UI/loaders/Loader/Loader';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ContentBoxFooter from '../ContentBoxFooter/ContentBoxFooter';

const ContentBox = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [boxData, setBoxData] = useState({});
  const [activeButton, setActiveButton] = useState('guests');

  const { gameId } = useParams();

  const preview = useSelector(state => state.game.preview);

  const cancelTokenRef = useRef();

  const { footer } = boxData || {};

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

	const getShortName = name => (name.length > 8 ? name.slice(0, 7) + '…' : name);
  
	const tableData = boxData[activeButton];
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
                toFixList={['AVG', 'SLG', 'OBP', 'OPS', 'SB_pr']}
              />
              <ContentBoxTable
                tableData={tableData}
                tableClass={cl.pitchingTable}
                tableName='pitching'
                footerOffset={1}
                toFixList={['ERA']}
              />
              <div className={cl.wrapper}>
                <ContentBoxTable
                  tableData={tableData}
                  tableClass={cl.fieldingTable}
                  tableName='fielding'
                  toFixList={['FLD']}
                  footerOffset={1}
                />
                <ContentBoxTable
                  tableData={tableData}
                  tableClass={cl.catchingTable}
                  tableName='catching'
                  footerOffset={1}
                />
              </div>
              <div className={cl.buttons}>
                <span className={getClassName('guests')} onClick={handleButtonClick('guests')}>
                  {preview && getShortName(preview.guests.name)}
                </span>
                <span className={getClassName('owners')} onClick={handleButtonClick('owners')}>
                  {preview && getShortName(preview.owners.name)}
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

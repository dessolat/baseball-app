import React, { useState, useEffect, useRef } from 'react';
import cl from './ContentBox.module.scss';
import { setSearchParam } from 'utils';
import Loader from 'components/UI/loaders/Loader/Loader';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ContentBoxFooter from '../ContentBoxFooter/ContentBoxFooter';
import ContentMobileBox from './ContentMobileBox';
import ContentBoxTables from './ContentBoxTables';

const ContentBox = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [boxData, setBoxData] = useState({});

  const { gameId } = useParams();

  const activeButton = useSelector(state => state.game.boxActiveButton);

  const cancelTokenRef = useRef();

  const { footer } = boxData || {};

  useEffect(() => {
    setSearchParam('tab', 'box');

    const fetchBoxData = async () => {
      cancelTokenRef.current = axios.CancelToken.source();

      try {
        setIsLoading(true);
        const response = await axios.get(`http://baseball-gametrack.ru/api/game_${gameId}/box`, {
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
    // eslint-disable-next-line
  }, []);

  const tableData = boxData[activeButton];
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : Object.keys(boxData).length === 0 ? (
        <></>
      ) : (
        <>
          <div className={cl.box}>
            <ContentBoxTables tableData={tableData}/>
            <ContentBoxFooter footer={footer} />
          </div>
          <ContentMobileBox tableData={tableData} footer={footer} />
        </>
      )}
    </>
  );
};

export default ContentBox;

import React, { useState, useEffect, useRef } from 'react';
import { setSearchParam } from 'utils';
import Loader from 'components/UI/loaders/Loader/Loader';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ContentMobileBox from './ContentMobileBox';
import ContentBoxDesktop from './ContentBoxDesktop';

const ContentBox = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [boxData, setBoxData] = useState({});
  const [boxGraphsData, setBoxGraphsData] = useState({});

  const { gameId } = useParams();

  const { boxActiveButton: activeButton, preview } = useSelector(state => state.game);

  const cancelTokenRef = useRef();

  const { footer } = boxData || {};

  useEffect(() => {
    setSearchParam('tab', 'box');

    const fetchBoxData = async () => {
      cancelTokenRef.current = axios.CancelToken.source();

      try {
        setIsLoading(true);
        let response = await axios.get(`http://baseball-gametrack.ru/api/game_${gameId}/box`, {
          cancelToken: cancelTokenRef.current.token
        });

        const newBoxData = response.data;
        setBoxData(newBoxData);
				
        response = await axios.get(`http://baseball-gametrack.ru/api/game_metrix?game_id=${gameId}`, {
					cancelToken: cancelTokenRef.current.token
        });
				
				setBoxGraphsData(response.data);
        // console.log(newBoxData);
        // console.log(response.data);
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
	const graphsData = boxGraphsData
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : Object.keys(boxData).length === 0 ? (
        <></>
      ) : (
        <>
          <ContentBoxDesktop tableData={tableData} footer={footer} />
          <ContentMobileBox tableData={tableData} footer={footer} />
        </>
      )}
    </>
  );
};

export default ContentBox;

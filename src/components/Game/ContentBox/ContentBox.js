import React, { useState, useEffect, useRef } from 'react';
import { setSearchParam } from 'utils';
import Loader from 'components/UI/loaders/Loader/Loader';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ContentMobileBox from './MobileBox/ContentMobileBox';
import ContentBoxDesktop from './ContentBoxDesktop';
import { setBoxData } from 'redux/gameReducer';

const ContentBox = () => {
  const [isLoading, setIsLoading] = useState(false);
  // const [boxData, setBoxData] = useState({});
  const [boxGraphsData, setBoxGraphsData] = useState({});

  const { gameId } = useParams();

  const boxData = useSelector(state => state.game.boxData);
  const activeButton = useSelector(state => state.game.boxActiveButton);

  const dispatch = useDispatch();

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

        dispatch(setBoxData(response.data));
        setIsLoading(false);

        response = await axios.get(`http://baseball-gametrack.ru/api/game_metrix?game_id=${gameId}`, {
          cancelToken: cancelTokenRef.current.token
        });

        setBoxGraphsData(response.data);
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
  const graphsData = boxGraphsData[activeButton] || {};

  // Loader
  if (isLoading) return <Loader />;

  // Empty boxData render
  if (Object.keys(boxData).length === 0) return <></>;

	// Main render
  return (
    <>
      <ContentBoxDesktop tableData={tableData} footer={footer} graphsData={graphsData} />
      <ContentMobileBox tableData={tableData} footer={footer} />
    </>
  );
};

export default ContentBox;

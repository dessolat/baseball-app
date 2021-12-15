import React, { useEffect, useLayoutEffect, useRef, useMemo } from 'react';
import cl from './ContentCardComplexHeader.module.scss';
import 'scss/colorWords.scss';
import PortraitImg from 'images/portrait.png';
import BallsStrikes from 'components/UI/icons/BallsStrikes/BallsStrikes';
import Bases from 'components/UI/icons/Bases/Bases';
import ContentCardReplacement from '../ContentCardReplacement/ContentCardReplacement';
import RectText from 'components/UI/icons/Rects/RectText';
import RectScore from 'components/UI/icons/Rects/RectScore';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { setImagesData } from 'redux/gameReducer';
import { useDispatch } from 'react-redux';
import Outs from 'components/UI/icons/Outs/Outs';

const ContentCardComplexHeader = ({ player, sit }) => {
  const ref = useRef(null);
  const playersInfo = useSelector(state => state.game.playersInfo);
  const imagesData = useSelector(state => state.game.imagesData);
  const dispatch = useDispatch();

  const { r1, r2, r3, outs, balls, strikes } = sit.table;

  const eventsSummary = useMemo(
    () => sit.events.reduce((sum, event) => [...sum, event.description], []),
    [sit.events]
  );

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await axios.get(`http://84.201.172.216:3030/logo/${playersInfo[player.who]}`, {
          responseType: 'arraybuffer'
        });

        dispatch(
          setImagesData({
            [player.who]: 'data:image/jpg;base64, ' + Buffer.from(response.data, 'binary').toString('base64')
          })
        );
      } catch (err) {
        console.log(err.message);
      }
    };

    playersInfo[player.who] && playersInfo[player.who] !== '' && !imagesData[player.who] && fetchImage();
		// eslint-disable-next-line
  }, []);

  useLayoutEffect(() => {
    ref.current.innerHTML = eventsSummary.join('.') + '.';
  }, [eventsSummary, sit.icons.rect_text]);

  return (
    <div>
      <div className={cl.top}>
        <p className={cl.playerName}>{`${player.hit_order}. ${player.who}`}</p>
        <div className={cl.portraitTextWrapper}>
          <div className={cl.portrait}>
            <img
              className={!imagesData[player.who] ? cl.default : ''}
              src={imagesData[player.who] || PortraitImg}
              alt='Portrait'
            />
          </div>
          <p className={cl.text} ref={ref}>
            {eventsSummary.join('.') + '.'}
          </p>
        </div>
      </div>

      <div className={cl.bottom}>
        {sit.icons.rect_text !== 'Replacement' && <RectText icons={sit.icons} />}
        {sit.icons.score_own !== undefined && <RectScore icons={sit.icons} />}
        <div className={cl.ellipses}>
          <Outs outs={outs} />
          <BallsStrikes balls={balls} strikes={strikes} />
        </div>
        <Bases r1={r1} r2={r2} r3={r3} />
      </div>

      {sit.icons.rect_text === 'Replacement' && (
        <ContentCardReplacement text={eventsSummary.join('.') + '.'} />
      )}
    </div>
  );
};

export default ContentCardComplexHeader;

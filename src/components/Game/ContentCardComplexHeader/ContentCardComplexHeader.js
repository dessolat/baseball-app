import React, { useEffect, useLayoutEffect, useRef, useMemo } from 'react';
import cl from './ContentCardComplexHeader.module.scss';
import PortraitImg from 'images/portrait.png';
import BallsStrikes from 'components/UI/icons/BallsStrikes/BallsStrikes';
import RectanglesEllipses from 'components/UI/icons/RectanglesEllipses/RectanglesEllipses';
import ContentCardReplacement from '../ContentCardReplacement/ContentCardReplacement';
import RectText from 'components/UI/icons/Rects/RectText';
import RectScore from 'components/UI/icons/Rects/RectScore';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { setImagesData } from 'redux/gameReducer';
import { useDispatch } from 'react-redux';

const ContentCardComplexHeader = ({ player, sit }) => {
  const ref = useRef(null);
  const playersInfo = useSelector(state => state.game.playersInfo);
  const imagesData = useSelector(state => state.game.imagesData);
	const dispatch = useDispatch()

  const { r1, r2, r3, outs, balls, strikes } = sit.table;

  const textClasses = [cl.text, cl[sit.icons.rect_color]];
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
				
				dispatch(setImagesData({[player.who]: "data:image/jpg;base64, " + Buffer.from(response.data, 'binary').toString('base64')}))
			} catch (err) {
				console.log(err.message)
			}
    };

    playersInfo[player.who] && playersInfo[player.who] !== '' && !imagesData[player.who] && fetchImage();
  }, []);

  useLayoutEffect(() => {
    ref.current.innerHTML = sit.icons.rect_text !== 'Replacement' ? eventsSummary.join('.') + '.' : '';
  }, [eventsSummary, sit.icons.rect_text]);

  return (
    <div>
      <div className={cl.top}>
        <div className={cl.textWrapper}>
          <p className={cl.playerName}>{`${player.hit_order}. ${player.who}`}</p>
          <p className={textClasses.join(' ')} ref={ref}>
            {sit.icons.rect_text !== 'Replacement' ? eventsSummary.join('.') + '.' : ''}
          </p>
        </div>
        <div className={cl.portrait}>
          <img
            // src={
            //   playersInfo[player.who] && playersInfo[player.who] !== ''
            //     ? `http://84.201.172.216:3030/logo/${playersInfo[player.who]}`
            //     : PortraitImg
            // }
						className={!imagesData[player.who] ? cl.default : ''}
            src={imagesData[player.who] || PortraitImg}
            alt='Portrait'
          />
        </div>
      </div>
      <div className={cl.bottom}>
        <RectanglesEllipses r1={r1} r2={r2} r3={r3} outs={outs} />
        {sit.icons.rect_text !== 'Replacement' && <RectText icons={sit.icons} />}
        {sit.icons.score_own !== undefined && <RectScore icons={sit.icons} />}
        <BallsStrikes balls={balls} strikes={strikes} />
      </div>

      {sit.icons.rect_text === 'Replacement' && (
        <ContentCardReplacement text={eventsSummary.join('.') + '.'} />
      )}
    </div>
  );
};

export default ContentCardComplexHeader;

import React, {useEffect} from 'react';
import cl from './ContentCardSimple.module.scss';
import Ellipses from 'components/UI/icons/Ellipses/Ellipses';
import RectanglesEllipses from 'components/UI/icons/RectanglesEllipses/RectanglesEllipses';
import PortraitImg from 'images/portrait.png';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setImagesData } from 'redux/gameReducer';

const ContentCardSimple = ({ player }) => {
  const playersInfo = useSelector(state => state.game.playersInfo);
	const imagesData = useSelector(state => state.game.imagesData);
	const dispatch = useDispatch()

  const lastMoment = player.moments.slice(-1)[0];
  const { r1, r2, r3, outs, balls, strikes } = lastMoment?.table || 0;
	
  const eventsSummary = lastMoment?.events?.reduce((sum, event) => [...sum, event.description], []) || [];
	const cardText = eventsSummary.length > 0 ? eventsSummary.join('.') + '.' : ''
	const imgClassName = !imagesData[player.who] ? cl.default : ''
	
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

  return (
    <div className={cl.classic}>
      <div className={cl.textRectanglesWrapper}>
        <p className={cl.playerName}>{`${player.hit_order}. ${player.who}`}</p>
        <p className={cl.text}>{cardText}</p>
        <RectanglesEllipses r1={r1} r2={r2} r3={r3} outs={outs} />
      </div>
      <div className={cl.portraitEllipsesWrapper}>
        <div className={cl.portrait}>
          <img
            // src={
            //   playersInfo[player.who] && playersInfo[player.who] !== ''
            //     ? `http://84.201.172.216:3030/logo/${playersInfo[player.who]}`
            //     : PortraitImg
            // }
						className={imgClassName}
            src={imagesData[player.who] || PortraitImg}
            alt='Portrait'
          />
        </div>
        <Ellipses balls={balls} strikes={strikes} />
      </div>
    </div>
  );
};

export default ContentCardSimple;

import React from 'react';
import cl from './Videos.module.scss';
import PlaysEvents from '../PlaysEvents/PlaysEvents';
import VideoOptions from '../VideoOptions/VideoOptions';
import HeaderLogo from '../HeaderLogo/HeaderLogo';
import { useSelector } from 'react-redux';
import Outs from 'components/UI/icons/Outs/Outs';
import BallsStrikes from 'components/UI/icons/BallsStrikes/BallsStrikes';
import Bases from 'components/UI/icons/Bases/Bases';


const SidePanel = () => {
  const { guests, owners } = useSelector(state => state.game.preview);
  const imagesData = useSelector(state => state.game.imagesData);
  const currentCard = useSelector(state => state.game.currentCard);

	const situationsArr = [];
  currentCard.moments?.forEach(moment => moment.icons?.rect_text && situationsArr.push(moment));

  const { r1, r2, r3, outs, balls, strikes } = situationsArr[situationsArr.length - 1]?.table || {};


  return (
    <div className={cl.sidePanelFull}>
      <div className={cl.events}>
        <PlaysEvents />
      </div>

      <div className={cl.teamInfo}>
        <HeaderLogo teamName={guests.name} images={imagesData} />
        {/* <span className={cl.teamTitle}>{guests.name}</span> */}
        <h3 className={cl.scoreTitle}>{guests.score}</h3>
      </div>

			<div className={cl.teamInfo}>
        <HeaderLogo teamName={owners.name} side='right' images={imagesData} />
        {/* <span className={cl.teamTitle}>{owners.name}</span> */}
        <h3 className={cl.scoreTitle}>{owners.score}</h3>
      </div>

			<div className={cl.signs}>
        <BallsStrikes balls={balls} strikes={strikes} />
        <Bases r1={r1} r2={r2} r3={r3} />
        <Outs outs={outs} />
      </div>

      <div className={cl.options}>
        <VideoOptions />
      </div>
    </div>
  );
};

export default SidePanel;

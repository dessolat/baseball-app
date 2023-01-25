import React from 'react';
import cl from './Videos.module.scss';
import Timeline from '../Timeline/Timeline';
import { useSelector } from 'react-redux';
import HeaderLogo from '../HeaderLogo/HeaderLogo';
import Outs from 'components/UI/icons/Outs/Outs';
import BallsStrikes from 'components/UI/icons/BallsStrikes/BallsStrikes';
import Bases from 'components/UI/icons/Bases/Bases';

const BottomPanel = () => {
  const { guests, owners } = useSelector(state => state.game.preview);
  const imagesData = useSelector(state => state.game.imagesData);
  const currentCard = useSelector(state => state.game.currentCard);
  const currentMoment = useSelector(state => state.game.currentMoment);

  const situationsArr = [];
  currentCard.moments?.forEach(moment => moment.icons?.rect_text && situationsArr.push(moment));

  const { r1, r2, r3, outs, balls, strikes } = situationsArr[situationsArr.length - 1]?.table || {};

  const pitcherName = currentCard?.moments
    ?.slice(-1)[0]
    ?.pitcher.pitches_name.replace(' ', ' ')
    .toUpperCase();
  const ballPlayerName = currentCard?.who?.replace(' ', ' ').toUpperCase();

  const speedValue = currentMoment?.metering?.pitch?.start_speed.toFixed(1) ?? '';
  return (
    <div className={cl.bottomPanelFull}>
      <Timeline forFullscreen={true} />
      <div className={cl.signs}>
        <BallsStrikes balls={balls} strikes={strikes} />
        <Bases r1={r1} r2={r2} r3={r3} />
        <Outs outs={outs} />
      </div>
      <div className={cl.teamInfo}>
        <HeaderLogo teamName={guests.name} images={imagesData} />
        <span className={cl.teamTitle}>{guests.name}</span>
        <h3 className={cl.scoreTitle}>{guests.score}</h3>
      </div>
      <div className={cl.teamInfo}>
        <HeaderLogo teamName={owners.name} side='right' images={imagesData} />
        <span className={cl.teamTitle}>{owners.name}</span>
        <h3 className={cl.scoreTitle}>{owners.score}</h3>
      </div>
      <div className={cl.playersInfo}>
        <div className={cl.players}>
          <div>
            <span>P:</span>
            {pitcherName}
          </div>
          <div>
            <span>B:</span>
            {ballPlayerName}
          </div>
        </div>
        <span className={cl.speed}>{speedValue} mph</span>
      </div>
    </div>
  );
};

export default BottomPanel;

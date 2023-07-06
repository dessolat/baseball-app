import React from 'react';
import cl from '../Videos.module.scss';
import Timeline from '../../Timeline/Timeline';
import { useSelector } from 'react-redux';
import CurrentCard from './CurrentCard';

const BottomPanel = () => {
  const currentCard = useSelector(state => state.game.currentCard);
  const currentMoment = useSelector(state => state.game.currentMoment);

  const pitcherName = currentCard?.moments
    ?.slice(-1)[0]
    ?.pitcher.pitches_name.replace(' ', ' ')
    .toUpperCase();
  const ballPlayerName = currentCard?.who?.replace(' ', ' ').toUpperCase();

  const speedValue = currentMoment?.metering?.pitch?.start_speed.toFixed(1) ?? '';
  return (
    <div className={cl.bottomPanelFull}>
      <Timeline forFullscreen={true} />
      {currentCard?.moments && <CurrentCard currentCard={currentCard} />}
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

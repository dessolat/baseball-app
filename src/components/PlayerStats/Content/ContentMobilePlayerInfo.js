import React from 'react';
import cl from './Content.module.scss';
import PortraitImg from 'images/portrait.png';
import { useParams } from 'react-router-dom';

const ContentMobilePlayerInfo = ({ statsData }) => {
  const { playerName, playerSurname } = useParams();

  return (
    <div className={cl.mobilePlayerChr}>
      <div className={cl.playerInfo}>
        <img src={PortraitImg} alt='' />
        <div>
          <div className={cl.fullName}>
            {playerName} {playerSurname}
          </div>
          <p className={cl.playerChr}>
            {statsData.pos || '—'} | B/T: {statsData.bat_hand}/{statsData.throw_hand} | {statsData.height}{' '}
            {statsData.weight}LBS | Age: {new Date().getFullYear() - statsData.yob}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContentMobilePlayerInfo;

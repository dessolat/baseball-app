import React from 'react';
import cl from './Content.module.scss';
import { Logo } from '../HeaderSelections/HeaderSelections';

const ContentMobilePlayerInfo = ({ statsData }) => {
  return (
    <div className={cl.mobilePlayerChr}>
      <div className={cl.playerInfo}>
				<Logo />
        <div>
          <div className={cl.fullName}>
            {statsData.name} {statsData.surname}
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

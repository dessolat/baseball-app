import React from 'react';
import cl from './GameHeader.module.scss';
import LeftLogo from '../../images/left-logo.png';
import RightLogo from '../../images/right-logo.png';
import GameTabs from '../GameTabs/GameTabs';
import GameScoresList from '../GameScoresList/GameScoresList';
import GameInfo from '../GameInfo/GameInfo';
import GameTeams from '../GameTeams/GameTeams';

const GameHeader = ({inningsData, gameInfoData, teamNames}) => {
  return (
    <header className={cl.header}>
      <div className='container'>
        <div className={cl.headerContent}>
          <div>
            <p className={cl.date}>Aug 23, 2021</p>
            <p className={cl.location}>at Moscow (Russtar Arena)</p>
            <GameTabs />
          </div>
          <img src={LeftLogo} className={cl.leftLogo} alt='attack-team' />
          <h2 className={cl.teamScore}>4</h2>
          <div className={cl.scoresWrapper}>
            <GameTeams names={teamNames}/>
            <GameScoresList data={inningsData} />
            <GameInfo data={gameInfoData} />
          </div>
          <h2 className={cl.teamScore + ' ' + cl.defenceTeamScore}>6</h2>
          <img src={RightLogo} className={cl.rightLogo} alt='defence-team' />
        </div>
      </div>
    </header>
  );
};

export default GameHeader;

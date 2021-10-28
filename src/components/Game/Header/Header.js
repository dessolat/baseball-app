import React from 'react';
import cl from './Header.module.scss';
import LeftLogo from 'images/left-logo.png';
import RightLogo from 'images/right-logo.png';
import HeaderTabs from '../HeaderTabs/HeaderTabs';
import HeaderScoresList from '../HeaderScoresList/HeaderScoresList';
import HeaderInfo from '../HeaderInfo/HeaderInfo';
import HeaderTeams from '../HeaderTeams/HeaderTeams';

const Header = ({inningsData, gameInfoData, teamNames, inningNumber, setInningNumber}) => {
  return (
    <header className={cl.header}>
      <div className='container'>
        <div className={cl.headerContent}>
          <div>
            <p className={cl.date}>Aug 23, 2021</p>
            <p className={cl.location}>at Moscow (Russtar Arena)</p>
            <HeaderTabs />
          </div>
          <img src={LeftLogo} className={cl.leftLogo} alt='attack-team' />
          <h2 className={cl.teamScore}>4</h2>
          <div className={cl.scoresWrapper}>
            <HeaderTeams names={teamNames}/>
            <HeaderScoresList data={inningsData} inningNumber={inningNumber} setInningNumber={setInningNumber}/>
            <HeaderInfo data={gameInfoData} />
          </div>
          <h2 className={cl.teamScore + ' ' + cl.defenceTeamScore}>6</h2>
          <img src={RightLogo} className={cl.rightLogo} alt='defence-team' />
        </div>
      </div>
    </header>
  );
};

export default Header;

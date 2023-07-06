import cl from '../Videos.module.scss';
import HeaderLogo from '../../HeaderLogo/HeaderLogo';

const TeamInfo = ({ score, side }) => {
  return (
    <div className={cl.teamInfo}>
      <HeaderLogo side={side}/>
      {/* <span className={cl.teamTitle}>{guests.name}</span> */}
      <h3 className={cl.scoreTitle}>{score}</h3>
    </div>
  );
};

export default TeamInfo;

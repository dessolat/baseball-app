import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setBoxActiveButton } from 'redux/gameReducer';
import { getShortName } from 'utils';
import cl from './HeaderTeams.module.scss';

const HeaderTeams = ({ names, currentTab }) => {
  const currentCard = useSelector(state => state.game.currentCard);
  const boxActiveButton = useSelector(state => state.game.boxActiveButton);
  const dispatch = useDispatch();

  const guestsClasses = [cl.guests];
  const ownersClasses = [cl.owners];
  currentTab === 'box'
    ? boxActiveButton === 'guests'
      ? guestsClasses.push(cl.active)
      : ownersClasses.push(cl.active)
    : currentCard.side === 'top'
    ? guestsClasses.push(cl.active)
    : ownersClasses.push(cl.active);

  const handleTeamClick = name => () => dispatch(setBoxActiveButton(name));
  return (
    <div className={cl.teamNames}>
      <span className={guestsClasses.join(' ')} onClick={handleTeamClick('guests')}>
        {getShortName(names[0], 8)}
      </span>
      <span className={ownersClasses.join(' ')} onClick={handleTeamClick('owners')}>
        {getShortName(names[1], 8)}
      </span>
    </div>
  );
};

export default HeaderTeams;

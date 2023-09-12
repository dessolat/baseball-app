import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setBoxActiveButton } from 'redux/gameReducer';
import { getShortName } from 'utils';
import cl from './HeaderTeams.module.scss';
import classNames from 'classnames';

const HeaderTeams = ({ names, currentTab }) => {
  const currentCard = useSelector(state => state.game.currentCard);
  const boxActiveButton = useSelector(state => state.game.boxActiveButton);
  const dispatch = useDispatch();

  const guestsClasses = classNames([cl.guests], {
    [cl.active]:
      (currentTab === 'box' && boxActiveButton === 'guests') ||
      (currentTab !== 'box' && currentCard.side === 'top')
  });

  const ownersClasses = classNames([cl.owners], {
    [cl.active]:
      (currentTab === 'box' && boxActiveButton !== 'guests') ||
      (currentTab !== 'box' && currentCard.side !== 'top')
  });

  const handleTeamClick = name => () => dispatch(setBoxActiveButton(name));
  return (
    <div className={cl.teamNames}>
      <span className={guestsClasses} onClick={handleTeamClick('guests')}>
        {getShortName(names[0], 8)}
      </span>
      <span className={ownersClasses} onClick={handleTeamClick('owners')}>
        {getShortName(names[1], 8)}
      </span>
    </div>
  );
};

export default HeaderTeams;

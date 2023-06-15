import classNames from 'classnames';
import cl from './MobileOptionsBar.module.scss';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { setBoxActiveButton } from 'redux/gameReducer';

const ScoreInfo = () => {
  const preview = useSelector(s => s.game.preview, shallowEqual);
  const isVideo = useSelector(s => s.game.isVideo);
  const currentTab = useSelector(s => s.game.currentTab);
  const boxActiveButton = useSelector(s => s.game.boxActiveButton);

	const dispatch = useDispatch()

	const handleTeamClick = teamSide => () => dispatch(setBoxActiveButton(teamSide))

	const getTeamClasses = teamSide => classNames(cl.teamName, {
		[cl.active]: teamSide === boxActiveButton && currentTab === 'box'
	})

  const scoreWrapperClasses = classNames(cl.scoreInfo, {
    [cl.noVideo]: !isVideo
  });
  return (
    <div className={scoreWrapperClasses}>
      <div className={cl.team} onClick={handleTeamClick('guests')}>
        <span className={getTeamClasses('guests')}>{preview.guests.name}</span>
        <span className={cl.teamScore}>{preview.guests.score}</span>
      </div>
      <div className={cl.team} onClick={handleTeamClick('owners')}>
        <span className={getTeamClasses('owners')}>{preview.owners.name}</span>
        <span className={cl.teamScore}>{preview.owners.score}</span>
      </div>
    </div>
  );
};

export default ScoreInfo;

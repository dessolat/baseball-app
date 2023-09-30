import cl from './Header.module.scss';
import Dropdown from 'components/UI/dropdown/GamesDropdown/Dropdown';
import { useDispatch, useSelector } from 'react-redux';
import { setBoxMode } from 'redux/gameReducer';

const BOX_MODES = ['Batting', 'Running', 'Fielding', 'Pitching', 'Catching', 'Machine Vision Statistics'];

const MobileBoxModes = () => {
  const boxMode = useSelector(s => s.game.boxMode);

  const dispatch = useDispatch();

  const handleClick = option => {
    dispatch(setBoxMode(option));
  };

  return (
    <div className={cl.mobileBoxModesWrapper}>
      <Dropdown
        title={'Stats game'}
        options={BOX_MODES}
        currentOption={boxMode}
        handleClick={handleClick}
        listWrapperStyles={{
          left: 'unset',
          right: 0,
          maxHeight: '72vh',
					marginRight: -7
        }}
        itemStyles={{ paddingLeft: '30%' }}
      />
    </div>
  );
};

export default MobileBoxModes;

import cl from './Header.module.scss';
import Dropdown from 'components/UI/dropdown/GamesDropdown/Dropdown';
import { useSortFilteredSituations } from 'hooks/useFilterSituations';
import { useDispatch, useSelector } from 'react-redux';
import { setPlaybackMode, setSituationFilter } from 'redux/gameReducer';

const MobileFilters = () => {
  const situations = useSelector(s => s.game.situations);
  const playbackMode = useSelector(s => s.game.playbackMode);
  const situationFilter = useSelector(s => s.game.situationFilter);

  const dispatch = useDispatch();

  const handleClick = e => {
    playbackMode !== 'pause' && dispatch(setPlaybackMode('pause'));
    const newSituationFilter = situationFilter !== e ? e : 'All';
    dispatch(setSituationFilter(newSituationFilter));
  };

  const filteredSituations = useSortFilteredSituations(situations).reduce((sum, cur) => {
    sum.push(cur.name);
    return sum;
  }, []);
  return (
    <div className={cl.mobileFiltersWrapper}>
      <Dropdown
        title={'Filter'}
        options={filteredSituations}
        currentOption={situationFilter}
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

export default MobileFilters;

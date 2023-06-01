import cl from './Header.module.scss';
import Dropdown from 'components/UI/dropdown/GamesDropdown/Dropdown';
import { useSortFilteredSituations } from 'hooks/useFilterSituations';
import { useDispatch, useSelector } from 'react-redux';
import { setPlaybackMode, setSituationFilter } from 'redux/gameReducer';

const MobileFilters = () => {
  const situations = useSelector(state => state.game.situations);
  const playbackMode = useSelector(state => state.game.playbackMode);
  const situationFilter = useSelector(state => state.game.situationFilter);

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
        // wrapperStyles={{ paddingRight: '.5rem' }}
        listWrapperStyles={{
          left: 'unset',
          right: 0,
          maxHeight: '72vh'
        }}
        itemStyles={{ paddingLeft: '30%' }}
      />
    </div>
  );
};

export default MobileFilters;

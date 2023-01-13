import Dropdown from 'components/UI/dropdown/GamesDropdown/Dropdown';
import { useSortFilteredSituations } from 'hooks/useFilterSituations';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPlaybackMode, setSituationFilter } from 'redux/gameReducer';
import ContentControls from '../ContentControls/ContentControls';
import ContentPitcher from '../ContentPitcher/ContentPitcher';
import cl from './Content.module.scss';

const MobilePitcherFilters = () => {
  const isVideo = useSelector(state => state.game.isVideo);
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
    <div className={cl.mobilePitcherFilters}>
      <ContentPitcher />
      <div className={cl.filtersWrapper}>
        <Dropdown
          title={'Filter'}
          options={filteredSituations}
          currentOption={situationFilter}
          handleClick={handleClick}
          listStyles={{ left: '-1rem', width: 'calc(100% + 2.3rem)', fontSize: '13px', maxHeight: '72vh' }}
          itemStyles={{ padding: '0 1rem' }}
        />
      </div>
      <ContentControls noPlayPause={!isVideo} isPlayOnline={false} />
    </div>
  );
};

export default MobilePitcherFilters;

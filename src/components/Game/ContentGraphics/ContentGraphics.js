import React from 'react';
import cl from './ContentGraphics.module.scss';
import Videos from '../Videos/Videos';
import Plays from '../Plays/Plays';
import LandscapeScores from './LandscapeScores';
import PlaysEvents from '../PlaysEvents/PlaysEvents';
import useGameFocus from 'hooks/useGameFocus';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import OptionsDropdown from '../Header/MobileOptionsBar/OptionsDropdown/OptionsDropdown';

const ContentGraphics = ({ currentTab, isVideo }) => {
  const isMobileScoreboard = useSelector(s => s.shared.isMobileScoreboard);
  const isMobileTimeline = useSelector(s => s.shared.isMobileTimeline);

  const renderTab = () => {
    switch (currentTab) {
      case 'videos':
        return isVideo ? <Videos currentTab={currentTab} /> : <Plays isVideo={isVideo} />;
      default:
        return <Plays isVideo={isVideo} />;
    }
  };

  const topShift = isMobileScoreboard ? '83.5px' : '0px';

  const graphicsClasses = classNames(cl.graphics, {
    [cl.mobileLandscapeVideo]: currentTab === 'videos',
    [cl.videoTab]: currentTab === 'videos'
  });

  const scoresClasses = classNames({
    [cl.portraitDisplayNone]: currentTab !== 'videos',
    [cl.displayNone]: currentTab === 'videos'
  });
  const optionsClasses = classNames(cl.onlyMobileLandscape, {
    [cl.withMobileTimeline]: isMobileTimeline,
    [cl.verticalEvents]: currentTab === 'videos'
  });
  return (
    <div className={graphicsClasses} onClick={useGameFocus('timeline')} style={{ '--top-shift': topShift }}>
      {isVideo && (
        <div className={scoresClasses}>
          <LandscapeScores cl={cl} currentTab={currentTab} />
        </div>
      )}
      {renderTab()}
      <div className={optionsClasses}>
        <OptionsDropdown
          panelStyles={{ right: 'unset', left: '100%', top: 0 }}
          mobileLandscapeVisible={currentTab === 'videos'}
        />
        <PlaysEvents />
      </div>
    </div>
  );
};

export default ContentGraphics;

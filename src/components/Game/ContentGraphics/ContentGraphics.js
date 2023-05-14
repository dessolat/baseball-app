import React from 'react';
import cl from './ContentGraphics.module.scss';
import Videos from '../Videos/Videos';
import Plays from '../Plays/Plays';
import LandscapeScores from './LandscapeScores';
import PlaysEvents from '../PlaysEvents/PlaysEvents';
import useGameFocus from 'hooks/useGameFocus';
import { useSelector } from 'react-redux';

const ContentGraphics = ({ currentTab, isVideo }) => {
	const isMobileScoreboard = useSelector(s => s.shared.isMobileScoreboard)

  const renderTab = () => {
    switch (currentTab) {
      case 'videos':
        return isVideo ? <Videos /> : <Plays isVideo={isVideo} />;
      default:
        return <Plays isVideo={isVideo} />;
    }
  };

	const topShift = isMobileScoreboard ? '83.5px' : '0px';
  return (
    <div className={cl.graphics} onClick={useGameFocus('timeline')} style={{'--top-shift': topShift}}>
      {isVideo && (
        <div className={cl.portraitDisplayNone}>
          <LandscapeScores cl={cl} currentTab={currentTab} />
        </div>
      )}
      {renderTab()}
			<div className={cl.onlyMobileLandscape}>
        <PlaysEvents />
      </div>
    </div>
  );
};

export default ContentGraphics;

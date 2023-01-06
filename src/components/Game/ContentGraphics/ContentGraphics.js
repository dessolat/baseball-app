import React from 'react';
import cl from './ContentGraphics.module.scss';
import Videos from '../Videos/Videos';
import Plays from '../Plays/Plays';
import LandscapeScores from './LandscapeScores';
import PlaysEvents from '../PlaysEvents/PlaysEvents';
import useGameFocus from 'hooks/useGameFocus';

const ContentGraphics = ({ currentTab, isVideo }) => {
  const renderTab = () => {
    switch (currentTab) {
      case 'videos':
        return isVideo ? <Videos /> : <Plays isVideo={isVideo} />;
      default:
        return <Plays isVideo={isVideo} />;
    }
  };

  return (
    <div className={cl.graphics} onClick={useGameFocus('timeline')}>
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

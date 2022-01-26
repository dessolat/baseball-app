import React from 'react';
import cl from './ContentGraphics.module.scss';
import Videos from '../Videos/Videos';
import Plays from '../Plays/Plays';
import { useSelector } from 'react-redux';

const ContentGraphics = ({ currentTab }) => {
	const innings = useSelector(state => state.game.innings)

	const isVideo = innings[0]['top/guests'][0].moments[0].video !== null

  const renderTab = () => {
    switch (currentTab) {
      case 'videos':
        return isVideo ? <Videos /> : <Plays />;
      default:
        return <Plays />;
    }
  };

  return <div className={cl.graphics}>{renderTab()}</div>;
};

export default ContentGraphics;

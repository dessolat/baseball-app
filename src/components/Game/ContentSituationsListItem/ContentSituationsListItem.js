import React from 'react';
import cl from './ContentSituationsListItem.module.scss';
import PortraitImg from 'images/portrait.png';
import Ellipse from 'components/UI/icons/Ellipse';
import Rectangle from 'components/UI/icons/Rectangle';

const ContentSituationsListItem = ({ situation }) => {
  return (
    <li className={cl.listItem}>
      <button>
        <div className={cl.portraitRectanglesWrapper}>
          <img className={cl.portrait} src={PortraitImg} alt='Portrait' />
          <div className={cl.rectangles}>
            <Rectangle className={cl.topRectangle + ' ' + cl.absolute} />
            <Rectangle className={cl.leftRectangle + ' ' + cl.absolute} />
            <Rectangle className={cl.rightRectangle + ' ' + cl.absolute} fill='#FFAB00' />
            <Ellipse className={cl.leftEllipse + ' ' + cl.absolute} fill='#1A4C96' />
            <Ellipse className={cl.rightEllipse + ' ' + cl.absolute} />
          </div>
        </div>
        <div className={cl.textEllipsesWrapper}>
          <p className={cl.text}>{situation.text}</p>
          <div className={cl.ellipsesWrapper}>
            <div className={cl.ellipses}>
              <Ellipse fill='#2B9D6A' />
              <Ellipse />
              <Ellipse />
              <Ellipse fill='#E2001C' />
              <Ellipse fill='#E2001C' />
            </div>
          </div>
        </div>
      </button>
    </li>
  );
};

export default ContentSituationsListItem;

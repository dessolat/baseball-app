import React from 'react';
import cl from './SkeletonHeader.module.scss';

const SkeletonHeader = () => {
  return (
    <header className={cl.header}>
      <div className='container'>
        <div className={cl.headerContent}>
          <div className={cl.leftSide}>
            <div className={cl.date}></div>
            <div className={cl.location}></div>
            <div className={cl.tabs}>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
          <div className={cl.leftLogo}></div>
          <div className={cl.score}></div>
          <div className={cl.teamNames}>
            <div></div>
            <div></div>
          </div>
          <ul className={cl.scoresTable}>
            <li>
              <span></span>
              <span></span>
              <span></span>
            </li>
            <li>
              <span></span>
              <span></span>
              <span></span>
            </li>
            <li>
              <span></span>
              <span></span>
              <span></span>
            </li>
            <li>
              <span></span>
              <span></span>
              <span></span>
            </li>
            <li>
              <span></span>
              <span></span>
              <span className={cl.hidden}></span>
            </li>
            <li>
              <span></span>
              <span className={cl.hidden}></span>
              <span className={cl.hidden}></span>
            </li>
            <li>
              <span></span>
              <span className={cl.hidden}></span>
              <span className={cl.hidden}></span>
            </li>
            <li>
              <span></span>
              <span className={cl.hidden}></span>
              <span className={cl.hidden}></span>
            </li>
            <li>
              <span></span>
              <span className={cl.hidden}></span>
              <span className={cl.hidden}></span>
            </li>
          </ul>
          <ul className={cl.info}>
            <li>
              <span></span>
              <span></span>
              <span></span>
            </li>
            <li>
              <span></span>
              <span></span>
              <span></span>
            </li>
            <li>
              <span></span>
              <span></span>
              <span></span>
            </li>
          </ul>
          <div className={cl.score}></div>
          <div className={cl.rightLogo}></div>
        </div>
      </div>
    </header>
  );
};

export default SkeletonHeader;

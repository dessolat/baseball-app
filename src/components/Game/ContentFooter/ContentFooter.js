import React from 'react';
import cl from './ContentFooter.module.scss';
import ContentPitcher from '../ContentPitcher/ContentPitcher';
import ContentControls from '../ContentControls/ContentControls';

const ContentFooter = () => (
  <div className={cl.controlsWrapper}>
    <ContentPitcher />
    <ContentControls isPlayOnline={false}/>
  </div>
);

export default ContentFooter;

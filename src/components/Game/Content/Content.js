import React from 'react';
import cl from './Content.module.scss';
import $ from 'jquery';
import ContentSituationsList from '../ContentSituationsList/ContentSituationsList';

const Content = ({ viewMode, contentSituationsList }) => {
  return (
    <div className={cl.content}>
      <ContentSituationsList situations={contentSituationsList} />
      <div className={cl.situationsControls}></div>
      <div className={cl.graphics}></div>
    </div>
  );
};

export default Content;

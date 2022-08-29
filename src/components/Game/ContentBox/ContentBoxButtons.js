import React from 'react';
import cl from './ContentBox.module.scss';
import ContentBoxButton from './ContentBoxButton';

const ContentBoxButtons = () => (
  <div className={cl.buttons}>
    <ContentBoxButton team={'guests'} />
    <ContentBoxButton team={'owners'} />
  </div>
);

export default ContentBoxButtons;

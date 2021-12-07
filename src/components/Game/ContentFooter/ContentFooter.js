import React from 'react';
import cl from './ContentFooter.module.scss';
import ContentPitcher from '../ContentPitcher/ContentPitcher';
import ContentControls from '../ContentControls/ContentControls';
import { useSearchParams } from 'react-router-dom';

const ContentFooter = () => {
	const [searchParams] = useSearchParams();
  const tab = searchParams.get('tab');

  return (
    <div className={cl.controlsWrapper}>
      <ContentPitcher />
      {tab === 'videos' && <ContentControls />}
    </div>
  );
};

export default ContentFooter;

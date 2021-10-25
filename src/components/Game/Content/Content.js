import React from 'react';
import cl from './Content.module.scss';
import $ from 'jquery';
import { useParams } from 'react-router';
import ContentSituationsList from '../ContentSituationsList/ContentSituationsList';
import PlaysImg from 'images/plays.jpg';

const Content = ({ viewMode, contentSituationsList }) => {
  const { tab } = useParams();

  const renderTab = tab => {
    switch (tab) {
      case 'videos':
        return (
          <iframe
            width='100%'
            height='100%'
            src='https://www.youtube.com/embed/gN7RdRGmBF4?autoplay=1'
            title='YouTube video player'
            frameBorder='0'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
            allowFullScreen></iframe>
        );
      case 'plays':
        return <img src={PlaysImg} alt='plays' width='100%' />;
      default:
        break;
    }
  };

  return (
    <section className='container'>
      <div className={cl.content}>
        <ContentSituationsList situations={contentSituationsList} />
        <div className={cl.situationsControls}></div>
        <div className={cl.graphics}>{renderTab(tab)}</div>
      </div>
    </section>
  );
};

export default Content;

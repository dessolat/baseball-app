import React from 'react';
import cl from './ContentSituationsList.module.scss';
import ContentSituationsListItem from '../ContentSituationsListItem/ContentSituationsListItem';

const ContentSituationsList = ({ situations }) => {
  return (
    <ul className={cl.list}>
      {situations.map(situation => (
        <ContentSituationsListItem key={situation.id} situation={situation} />
      ))}
    </ul>
  );
};

export default ContentSituationsList;

import React from 'react';
import cl from './ContentCardTitle.module.scss';
import { Link } from 'react-router-dom';

const ContentCardTitle = ({ player }) => {
  const { h, '2b': b2, '3b': b3, ab, hr, pa } = player;

  const isStats = b2 !== undefined && b3 !== undefined && hr !== undefined;

  const getStats = () => {
    let subStr = [];
    b2 && subStr.push(`${b2 > 1 ? `${b2} ` : ''}2B`);
    b3 && subStr.push(`${b3 > 1 ? `${b3} ` : ''}3B`);
    hr && subStr.push(`${hr > 1 ? `${hr} ` : ''}HR`);
    subStr = subStr.join(', ');
    const isSubstr = subStr.length > 0;

    return `PA:${pa}, ${h} of ${ab}${isSubstr ? ` (${subStr})` : ''}`;
  };

  const stats = isStats ? getStats() : '';

  return (
    <p className={cl.playerName}>
      <Link to={`/stats/player/${player.who_id}`}>{`${player.hit_order}. ${player.who}. ${stats}`}</Link>
    </p>
  );
};

export default ContentCardTitle;

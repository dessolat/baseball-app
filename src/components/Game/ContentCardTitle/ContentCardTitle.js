import React from 'react';
import cl from './ContentCardTitle.module.scss';

const ContentCardTitle = ({ player }) => {
  const { h, '2b': b2, '3b': b3, ab, hr, pa } = player;

  const isStats = b2 !== undefined && b3 !== undefined && hr !== undefined;

  const getStats = () => {
    let subStr = [];
    b2 && subStr.push(`${b2} 2B`);
    b3 && subStr.push(`${b3} 3B`);
    hr && subStr.push(`${hr} HR`);
    subStr = subStr.join(', ');
    const isSubstr = subStr.length > 0;

    return `PA:${pa}, ${h}of${ab}${isSubstr ? `(${subStr})` : ''}`;
  };

  const stats = isStats ? getStats() : '';
  return <p className={cl.playerName}>{`${player.hit_order}. ${player.who} ${stats}`}</p>;
};

export default ContentCardTitle;

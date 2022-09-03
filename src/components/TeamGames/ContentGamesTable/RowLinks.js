import React from 'react';
import RowLink from './RowLink';

const RowLinks = ({ game }) => {
  return (
    <div>
      <div>
        <RowLink to='box' id={game.id} />
        <RowLink to='plays' id={game.id} />
        {game.has_records && <RowLink to='videos' id={game.id} />}
      </div>
    </div>
  );
};

export default RowLinks;

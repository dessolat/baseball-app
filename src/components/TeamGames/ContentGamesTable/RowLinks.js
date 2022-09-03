import React from 'react';
import { Link } from 'react-router-dom';

const RowLinks = ({ game }) => {
  return (
    <div>
      <div>
        <Link to={`/game/${game.id}?tab=box`}>Box</Link>
        <Link to={`/game/${game.id}?tab=plays`}>Plays</Link>
        {game.has_records && <Link to={`/game/${game.id}?tab=videos`}>Videos</Link>}
      </div>
    </div>
  );
};

export default RowLinks;

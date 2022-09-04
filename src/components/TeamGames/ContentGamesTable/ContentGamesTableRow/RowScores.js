import React from 'react';

const RowScores = ({ game }) => (
  <div>
    {game.homies.score} - {game.visitors.score}
  </div>
);
export default RowScores;

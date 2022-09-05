import React from 'react';

const RowPlayerHands = ({ player }) => (
  <div>
    {player.bat_hand}/{player.throw_hand}
  </div>
);

export default RowPlayerHands;

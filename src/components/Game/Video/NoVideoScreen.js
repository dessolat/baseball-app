import React from 'react';

const NoVideoScreen = () => {
  return (
    <div
      style={{
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        display: 'grid',
        placeItems: 'center',
        background: 'black',
        color: 'white',
        fontWeight: 600
      }}>
      No video
    </div>
  );
};

export default NoVideoScreen;

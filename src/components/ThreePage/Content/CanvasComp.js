import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import Galaxy from './Galaxy';
import Buttons from './Buttons';
import { useSelector } from 'react-redux';

const CanvasComp = ({ cl }) => {
  const count = useSelector(state => state.three.count);
  const isStars = useSelector(state => state.three.isStars);
  const isEvents = useSelector(state => state.three.isEvents);

  return (
    <>
      <Canvas camera={{ position: [0, 12, 24] }} style={{ position: 'absolute', left: 0, top: 0, pointerEvents: isEvents ? 'All' : 'none' }}>
        <Suspense fallback={null}>
          <Galaxy count={count} isStars={isStars} isEvents={isEvents} />
        </Suspense>
      </Canvas>
      <Buttons cl={cl} count={count} isStars={isStars} isEvents={isEvents} />
    </>
  );
};

export default CanvasComp;

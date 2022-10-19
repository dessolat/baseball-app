import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
const CanvasComp = ({ cl }) => {
  return (
    <>
      <Canvas camera={{ position: [0, 12, 24] }} style={{ position: 'absolute', left: 0, top: 0, pointerEvents: isEvents ? 'All' : 'none' }}>
      </Canvas>
    </>
  );
};

export default CanvasComp;

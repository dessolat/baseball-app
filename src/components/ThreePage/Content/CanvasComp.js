import React, { Suspense, lazy } from 'react';
import { Canvas } from '@react-three/fiber';
import Galaxy from './Galaxy';
import Buttons from './Buttons';
import { useSelector } from 'react-redux';
// import { Model } from './Car';
import Loader from 'components/UI/loaders/Loader/Loader';
import { OrbitControls } from '@react-three/drei';
// (async () => {

const Model = lazy(() => import('./Stadium'));
// })();

// (async () => {
//   const { Component1 } = await import('./Component1');
// })();

// const MyComponent = lazy(() => import('./MyComponent'))
const CanvasComp = ({ cl }) => {
  // const count = useSelector(state => state.three.count);
  // const isStars = useSelector(state => state.three.isStars);
  const isEvents = useSelector(state => state.three.isEvents);

  return (
    <>
      <Suspense fallback={<Loader />}>
        <Canvas
          camera={{ position: [0, 12, 24], zoom: 1 }}
          style={{ position: 'absolute', left: 0, top: 0, pointerEvents: isEvents ? 'All' : 'none' }}>
          {/* <Galaxy count={count} isStars={isStars} isEvents={isEvents} /> */}
          {/* <Model /> */}
          <ambientLight position={[0, 1.5, 0]} intensity={2} />
          {/* <directionalLight position={[10, 50, 0]} /> */}
          <OrbitControls enableZoom={true} />
        </Canvas>
      </Suspense>
      {/* <Buttons cl={cl} count={count} isStars={isStars} isEvents={isEvents} /> */}
    </>
  );
};

export default CanvasComp;

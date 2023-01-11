import React, { Suspense, useMemo } from 'react';
import cl from './PlaysHitting.module.scss';
import { Canvas } from '@react-three/fiber';
import { TextureLoader } from 'three';
import { OrbitControls } from '@react-three/drei';
import FieldBg from 'images/field_right.jpg';

const HittingField = ({ hit }) => {
  const { data_2d } = hit || 0;

	const textureRef = useMemo(() => new TextureLoader().load(FieldBg), [])

  // let ballPath = data_2d ? `M${data_2d[0][0]} ${data_2d[0][1]}` : '';
  // data_2d && data_2d.slice(1).forEach(coords => (ballPath += `L${coords[0]} ${coords[1]}`));

  // const intermediatePoints = data_2d
  //   ? data_2d
  //       .filter(coords => coords[3] === 1)
  //       .map((coords, i) => <circle key={i} cx={coords[0]} cy={coords[1]} r={18} fill='red'></circle>)
  //   : '';

  // const setCords = e => {
	// 	console.log(e);
  //   setCameraCoords([e.point.x, e.point.y, e.point.z]);
  // };

  return (
    <div className={cl.field}>
      {/* <Canvas> */}
      {/* <Canvas camera={{ position: [-150, 300, 300] }}> */}
        <Canvas camera={{ position: [0, 550, 200] }}>
        <Suspense fallback={null}>
          {/* <mesh position={[0, 0, -120]}> */}
          <mesh position={[0, 0, 50]} rotation={[-Math.PI / 2, 0, 0]}>
          {/* <mesh position={[0, 0, -120]} rotation={[-Math.PI / 2, 0, 0]} onClick={setCords}> */}
          {/* <mesh position={[270, 0, -120]} rotation={[-Math.PI / 2, 0, 0]} onClick={setCords}> */}
            <planeGeometry args={[1280, 918]} />
            <meshBasicMaterial map={textureRef} toneMapped={false} />
          </mesh>
          {data_2d?.map(coord => (
            <mesh position={[coord[0]/3.5 - 450, coord[2] * 20, (coord[1] - 1490 ) / 3+ 150]}>
            {/* <mesh position={[coord[0] - 795 + 270, coord[2] * 30, (coord[1] - 1490 - 120) / 2]}> */}
              <sphereGeometry args={[5, 40, 40]} />
              <meshStandardMaterial color={'blue'} />
            </mesh>
          ))}
          {data_2d
            ?.filter(coords => coords[3] === 1)
            .map(coord => (
              <mesh position={[coord[0]/3.5 - 450, coord[2] * 20, (coord[1] - 1490 ) / 3+ 150]}>
              {/* <mesh position={[coord[0] - 795 + 270, coord[2] * 30, (coord[1] - 1490 - 120) / 2]}> */}
                <sphereGeometry args={[5, 40, 40]} />
                <meshStandardMaterial color={'red'} />
              </mesh>
            ))}
          {/* <mesh position={[50, 50, 50]}>
            <sphereGeometry args={[5, 40, 40]} />
            <meshStandardMaterial color={'blue'} />
          </mesh>
          <mesh position={[150, 100, 150]}>
            <sphereGeometry args={[5, 40, 40]} />
            <meshStandardMaterial color={'blue'} />
          </mesh> */}

          <ambientLight
            // position={[0, 1.5, 0]}
            intensity={1}
          />
          {/* <directionalLight /> */}

          <OrbitControls enableZoom={true} />
          {/* <color attach='background' args={['white']} /> */}
        </Suspense>
      </Canvas>

      {/* <div className={cl.fieldBg}>
        <svg width='100%' height='100%' viewBox='0 0 2560 2560' fill='none' preserveAspectRatio='none'>
          <path
            d={ballPath}
            stroke='#4AA0F0'
            strokeWidth='20'
            strokeLinejoin='round'
            strokeLinecap='round'></path>
          {intermediatePoints}
        </svg>
      </div> */}
    </div>
  );
};

export default HittingField;

import { createContext } from 'react';
import { CatmullRomCurve3, FrontSide, Vector3 } from 'three';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';

export const ctx = createContext();

const ThreeTextCtx = ({ children }) => {
  return (
    <ctx.Provider value={{ CatmullRomCurve3, FrontSide, Vector3, TextGeometry, FontLoader }}>
      {children}
    </ctx.Provider>
  );
};

export default ThreeTextCtx;

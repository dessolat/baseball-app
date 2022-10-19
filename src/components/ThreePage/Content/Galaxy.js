import React, { useRef } from 'react';
import Planet from './Planet';
import SunMap from 'images/sun_texture.jpg';
import MercuryMap from 'images/mercury_texture.jpg';
import VenusMap from 'images/venus_texture.jpg';
import EarthMap from 'images/earth_texture.jpg';
import MarsMap from 'images/mars_texture.jpg';
import JupiterMap from 'images/jupiter_texture.jpg';
import SaturnMap from 'images/saturn_texture.jpg';
import UranusMap from 'images/uranus_texture.jpg';

const PLANETS = [
  {
    radius: 0.4,
    moveSpeed: 0.04,
    rotationSpeed: 0.001,
    clockwiseRotation: false,
    positionX: 4,
    texture: MercuryMap
  },
  {
    radius: 0.8,
    moveSpeed: 0.013,
    rotationSpeed: 0.0147,
    clockwiseRotation: true,
    positionX: 7,
    texture: VenusMap
  },
  {
    radius: 0.85,
    moveSpeed: 0.0087,
    rotationSpeed: 0.006,
    clockwiseRotation: false,
    positionX: 10,
    texture: EarthMap
  },
  {
    radius: 0.5,
    moveSpeed: 0.0044,
    rotationSpeed: 0.006,
    clockwiseRotation: false,
    positionX: 13,
    texture: MarsMap
  },
  {
    radius: 1.9,
    moveSpeed: 0.0007,
    rotationSpeed: 0.015,
    clockwiseRotation: false,
    positionX: 16,
    texture: JupiterMap
  },
  {
    radius: 1.6,
    name: 'saturn',
    moveSpeed: 0.00035,
    rotationSpeed: 0.014,
    clockwiseRotation: false,
    positionX: 25,
    texture: SaturnMap
  },
  {
    radius: 1.6,
    moveSpeed: 0.00012,
    rotationSpeed: 0.014,
    clockwiseRotation: false,
    positionX: 35,
    texture: UranusMap
  }
];
const Galaxy = ({ count, isStars, isEvents }) => {
  return (
    <>
    </>
  );
};

export default Galaxy;

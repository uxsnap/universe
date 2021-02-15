import { MeshBasicMaterial } from 'three/build/three.module.js';
import { Planet } from './Planet';
import { PLANETS_TEXTURES, PLANET_SIZE } from './consts';
import { randomFromArr } from './helpers';

export class PlanetFactory {
  static generateRandomPlanets(planetQuantity, raycaster) {
    const planets = [];
    for (let i = 0; i < planetQuantity; i++) {
      planets.push(new Planet(Math.random() * PLANET_SIZE, randomFromArr(PLANETS_TEXTURES)));
    }
    return planets;
  }
}
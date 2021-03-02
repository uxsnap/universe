import * as THREE from 'three/build/three.module.js';
import { LehrmerInt, getLehrmer, Lehrmer, setLehrmer, randomStarColor } from './helpers';
import glow from './assets/glow.png';
import { Galaxy } from './Galaxy';

export class GalaxyCluster {
  constructor(startPos) {
    this.startPos = { ...startPos };
  }

  galaxyExists(x, y, z) {
    // console.log(getLehrmer())
    setLehrmer(x, y, z);
    return LehrmerInt(0, 10000) === 1;
    // Lehrmer();
  }

 generateCluster(height, width, offset) {
    let xSectors = width / 4;
    let ySectors = height / 4;
    let zSectors = 80;

    const distantStars = [];
    const galaxies = [];

    const texture = new THREE.TextureLoader().load(glow);

    for (let xi = 0; xi < xSectors; xi++) {
      for (let yj = 0; yj < ySectors; yj++) {
        for (let zk = 0; zk < zSectors; zk++) {
          if (this.galaxyExists(xi + offset.x, yj + offset.y, zk + offset.z)) {
            galaxies.push(...this.createGalaxy(xi, yj, zk));
          }
        }
      }
    }

    return galaxies;
  }

  createGalaxy(x, y, z) {
    const GALAXY_OFFSET = (val) => val * 8 - 300;

    const object = Galaxy.create({
      glowScale: { scaleX: 20, scaleY: 20, scaleZ: 20 },
      glowColor: 0xf3f3f3,
      galaxyWidth: LehrmerInt(0, 10),
      galaxyAngle: LehrmerInt(0, 7),
      galaxyScale: .3,
      position: {
        x: GALAXY_OFFSET(x),
        y: GALAXY_OFFSET(y),
        z: GALAXY_OFFSET(z)
      },
      starsAmount: LehrmerInt(500, 3000)
    });
    
    return object;
  }
}
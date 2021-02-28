import * as THREE from 'three/build/three.module.js';
import { LehrmerInt, getLehrmer, Lehrmer, setLehrmer } from './helpers';

export class GalaxyCluster {
  constructor(startPos) {
    this.startPos = { ...startPos };
  }

  galaxyExists(x, y, z) {
    // console.log(getLehrmer())
    setLehrmer(x, y, z);
    return LehrmerInt(0, 20) === 1;
    // Lehrmer();
  }

  generateCluster(height, width, offset) {
     const geometry = new THREE.BufferGeometry();

    let xSectors = width / 16;
    let ySectors = height / 16;
    let zSectors = 50;

    // const { x: cX, y: cY, z: cZ } = position;
    // console.log(this.startPos, position);
    // console.log(cX, cY, cZ);
    const vertices = [];

    // let xOffset = cX - this.startPos.x;
    // let yOffset = cY - this.startPos.y;
    // let zOffset = cZ - this.startPos.z;

    for (let xi = 0; xi < xSectors; xi++) {
      for (let yj = 0; yj < ySectors; yj++) {
        for (let zk = 0; zk < zSectors; zk++) {
          if (this.galaxyExists(xi + offset.x, yj + offset.y, zk + offset.z)) {
            const x = xi * 8 - 200;
            const y = yj * 8 - 200;
            const z = zk * 8 - 200;

            vertices.push(x, y, z);
          }
        }
      }
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

    const material = new THREE.PointsMaterial( { color: 0x888888 } );

    const points = new THREE.Points( geometry, material );
    
    return points;
  }
}
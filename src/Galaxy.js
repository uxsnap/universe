import {
  Int16BufferAttribute,
  Float32BufferAttribute,
  VertexColors,
  Color,
  Vector3,
  ImageUtils,
  PointCloud,
  Points,
  PointsMaterial,
  MathUtils,
  BufferGeometry,
  SpriteMaterial,
  AdditiveBlending,
  Sprite
} from 'three/build/three.module.js';
import { randomStarColor } from './helpers';
import roundPoint from './assets/roundPoint.png';
import glow from './assets/glow.png';

export class Galaxy {
  constructor() {
    const r = 50;
    
    const vertices = [];
    const colors = [];
    const geometry = new BufferGeometry();

    const color = new Color();

    const glowmap = ImageUtils.loadTexture(glow);

    const glow1 = new Sprite(
      new SpriteMaterial({
        color: 0xffffff,
        map: glowmap,
        transparent: true,
        blending: AdditiveBlending,
        opacity: 1
      })
    );
    
    glow1.scale.set(100, 100, 100);
    this.glow1 = glow1;

    for (let i = 0; i < 1000; i++) {
      const theta = MathUtils.randFloatSpread(360); 
      const phi = MathUtils.randFloatSpread(360); 

      const x = r * Math.sin(theta) * Math.cos(phi);
      const y = r * Math.sin(theta) * Math.sin(phi) / 2;
      const z = r * Math.cos(theta);

      vertices.push(x, y, z);
      // console.log(...randomStarColor());
      color.setRGB(...randomStarColor());
      colors.push( color.r, color.g, color.b );
    }

    geometry.setAttribute('position', new Float32BufferAttribute(vertices, 3));
    geometry.setAttribute('color', new Float32BufferAttribute(colors, 3));
    geometry.computeBoundingSphere();
  
    const material = new PointsMaterial({ size: 1, vertexColors: true });

    this.galaxy = new Points(geometry, material);
  }

}
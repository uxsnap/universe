import {
  Int32BufferAttribute,
  Float32BufferAttribute,
  VertexColors,
  Color,
  TextureLoader,
  ShaderMaterial,
  Vector3,
  ImageUtils,
  PointCloud,
  Points,
  PointsMaterial,
  MathUtils,
  BufferGeometry,
  SpriteMaterial,
  AdditiveBlending,
  Sprite,
  Vector2
} from 'three/build/three.module.js';
import { randomStarColor, vertexShader, fragmentShader, LehrmerInt } from './helpers';
import roundPoint from './assets/roundPoint.png';
import glow from './assets/glow.png';

export class Galaxy {
  static create({ glowScale, glowColor, position, starsAmount, galaxyScale, galaxyWidth, galaxyAngle }) {
    const amount = starsAmount;

    const vertices = [];
    const colors = [];
    const sizes = [];
    const geometry = new BufferGeometry();

    const color = new Color();

    const glowmap = ImageUtils.loadTexture(glow);

    const firstGlow = new Sprite(
      new SpriteMaterial({
        color: glowColor,
        map: glowmap,
        transparent: true,
        blending: AdditiveBlending,
        opacity: 1
      })
    );

    const secondGlow = new Sprite(
      new SpriteMaterial({
        color: glowColor,
        map: glowmap,
        transparent: true,
        blending: AdditiveBlending,
        opacity: 1
      })
    );

    const { scaleX, scaleY, scaleZ } = glowScale;
    const { x, y, z } = position;

    secondGlow.scale.set(scaleX, scaleY, scaleZ);
    secondGlow.position.set(x, y, z);

    firstGlow.scale.set(scaleX, scaleY / 2, scaleZ / 2);
    firstGlow.position.set(x, y, z);

    const glows = [
      secondGlow, 
      firstGlow
    ];

    const starColor = randomStarColor();

    for (let i = 0; i < amount; i++) {
      const r = Math.random() * 5 + i / 100;
      const phi = i / 500 * Math.PI + Math.random();

      const x = Math.sin(phi) * r * galaxyWidth;
      const z = Math.cos(phi) * r * galaxyAngle;
      const y = Math.random() * galaxyAngle;

      vertices.push(x, y, z);

      color.setHex(starColor);
      color.toArray(colors, i * 3);
      sizes[i] = .5;
    }

    geometry.setAttribute('position', new Float32BufferAttribute(vertices, 3));
    geometry.setAttribute('customColor', new Float32BufferAttribute(colors, 3));
    geometry.setAttribute('size', new Float32BufferAttribute( sizes, 1 ) );

    const material = new ShaderMaterial({ 
      uniforms: {
        color: { value: new Color( 0xffffff ) },
        pointTexture: { value: new TextureLoader().load(roundPoint) },
      },
      vertexShader,
      fragmentShader,
      blending: AdditiveBlending,
      transparent: true,
      depthTest: false,
    });

    const newGalaxy = new Points(geometry, material);

    newGalaxy.position.x = x;
    newGalaxy.position.y = y;
    newGalaxy.position.z = z;

    newGalaxy.scale.set(galaxyScale, galaxyScale, galaxyScale);

    return [newGalaxy, ...glows];
  }
}
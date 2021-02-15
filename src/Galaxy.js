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
import { randomStarColor } from './helpers';
import roundPoint from './assets/roundPoint.png';
import glow from './assets/glow.png';

export class Galaxy {
  constructor() {
    const amount = 50000;
    const r = 50;
    
    const vertices = [];
    const colors = [];
    const sizes = [];
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

    const glow2 = new Sprite(
      new SpriteMaterial({
        color: 0xf3f3f3,
        map: glowmap,
        transparent: true,
        blending: AdditiveBlending,
        opacity: 1
      })
    );

    glow2.scale.set(200, 50, 100);
    glow2.position.set(0, 0, 0.1);

    glow1.scale.set(100, 100, 100);

    this.glows = [glow2, glow1];

    for (let i = 5000; i < amount; i++) {
      const r = Math.random() * 12 + i / 700;
      const phi = i / 7000 * Math.PI + Math.random() * 2;

      const x = Math.sin(phi) * r;
      const z = Math.cos(phi) * r;
      const y = Math.random() - 2;

      vertices.push(x, y, z);

      color.setHex(randomStarColor());
      // color.setHSL( 0.5 + 0.1 * ( i / amount ), 0.7, 0.5 );
      color.toArray(colors, i * 3);
      sizes[ i ] = .5;
      // colors.push( color.r, color.g, color.b );
    }

    geometry.setAttribute('position', new Float32BufferAttribute(vertices, 3));
    geometry.setAttribute('customColor', new Float32BufferAttribute(colors, 3));
    geometry.setAttribute( 'size', new Float32BufferAttribute( sizes, 1 ) );

    const material = new ShaderMaterial({ 
      uniforms: {
        color: { value: new Color( 0xffffff ) },
        pointTexture: { value: new TextureLoader().load( roundPoint ) },
      },
      vertexShader: `
        attribute float size;
        attribute vec3 customColor;

        varying vec3 vColor;

        void main() {

          vColor = customColor;

          vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );

          gl_PointSize = size * ( 1000.0 / -mvPosition.z );

          gl_Position = projectionMatrix * mvPosition;

        }
      `,
      fragmentShader: `
        uniform vec3 color;
        uniform sampler2D pointTexture;

        varying vec3 vColor;

        void main() {

          gl_FragColor = vec4( color * vColor, 2 );
          gl_FragColor = gl_FragColor * texture2D( pointTexture, gl_PointCoord );

        }
      `,
      blending: AdditiveBlending,
      transparent: true,
      depthTest: false,
    });

    this.galaxy = new Points(geometry, material);
    this.galaxy.name = "Galaxy";
  }

}
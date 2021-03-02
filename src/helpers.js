export const rad = (angle) => (Math.PI * angle) / 180;

export const randomNumberTo = max => Math.floor(Math.random() * max);
export const randomFromArr = arr => arr[randomNumberTo(arr.length)];
export const randomRgbColor = () => [randomNumberTo(255), randomNumberTo(255), randomNumberTo(255)];

const starColors = [
  0x460b70,
  0xb9f75c,
  0x574366,
  0xbf5300,
  0x9d60b5,
  0x7605ab,
  0x765396,
  0x6c508a,
  0x220e82,
  0xffae6b,
  0xd0bade,
  0xb36270,
  0xa87e36,
  0x9fa0b3,
  0x7d1d25,
  0x3e6bab,
  0x2a4b8c,
  0x1f1b96,
];

export const randomStarColor = () => {
  return starColors[LehrmerInt(0, starColors.length)];
};

export const newCoordsIn3D = (r, phi, theta) => {
  return {
    x: r * Math.sin(theta) * Math.cos(phi),
    y: r * Math.sin(theta) * Math.sin(phi),
    z: r * Math.cos(theta)
  };
};

export let LehrmerSeed = 0x41A7; // 16807
const m = 0x7fffffff; // 2 147 483 647 ( 2^31 - 1 )

export const setLehrmer = (x, y, z) => {
  // LehrmerSeed = x * 1024 * 1024 + y * 1024 + z;
  LehrmerSeed = x * LehrmerInt(0, 40) * LehrmerInt(0, 40) + y * LehrmerInt(0, 40) + z;
  // console.log(LehrmerSeed);
};

export const getLehrmer = () => LehrmerSeed;

export const Lehrmer = () => {
  const product = LehrmerSeed * 48271;
  let x = (product & m) + (product >> 31);
  x = (x & m) + (x >> 31);
  LehrmerSeed = x;
  return x;
};

export const LehrmerInt = (min, max) => {
  return (Lehrmer() % (max - min)) + min;
}



export const vertexShader =  `
  attribute float size;
  attribute vec3 customColor;

  varying vec3 vColor;

  void main() {
    vColor = customColor;

    vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );

    gl_PointSize = size * ( 1000.0 / -mvPosition.z );

    gl_Position = projectionMatrix * mvPosition;
  }
`;

export const fragmentShader = `
  uniform vec3 color;
  uniform sampler2D pointTexture;

  varying vec3 vColor;

  void main() {

    gl_FragColor = vec4( color * vColor, 2 );
    gl_FragColor = gl_FragColor * texture2D( pointTexture, gl_PointCoord );

  }
`;
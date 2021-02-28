export const rad = (angle) => (Math.PI * angle) / 180;

export const randomNumberTo = max => Math.floor(Math.random() * max);
export const randomFromArr = arr => arr[randomNumberTo(arr.length)];
export const randomRgbColor = () => [randomNumberTo(255), randomNumberTo(255), randomNumberTo(255)];

const starColors = [
  // 0xd1310d,
  // 0xffb81f,
  0x28454a,
  0xdcc494,
  0xcfc5a4,
  0x063c5c,
  0x5691a4
];

export const randomStarColor = () => {
  return randomFromArr(starColors);
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
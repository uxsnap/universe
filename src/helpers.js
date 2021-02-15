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
export const rad = (angle) => (Math.PI * angle) / 180;

export const randomNumberTo = max => Math.floor(Math.random() * max);
export const randomFromArr = arr => arr[randomNumberTo(arr.length)];
export const randomRgbColor = () => [randomNumberTo(255), randomNumberTo(255), randomNumberTo(255)];

const starColors = [
  [220, 20, 20], // red
  [220, 107, 20], // orange
  [245, 253, 23], // yellow
  [31, 189, 25], // green
  [250, 255, 255], // white
  [84, 201, 225] // blue
];

export const randomStarColor = () => {
  return randomFromArr(starColors);
};
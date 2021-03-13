import * as THREE from 'three/build/three.module.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { StarSystem } from './StarSystem';
import { SideStars } from './SideStars';
import { Galaxy } from './Galaxy';
import { GalaxyCluster } from './GalaxyCluster';
import { InitScene } from './InitScene';
import starTexture from './assets/star.jpg';
import { Z_CAMERA, VELOCITY } from './consts';
import { Lehrmer, LehrmerSeed, newCoordsIn3D } from './helpers';

// let camera, scene, renderer;
// let geometry, material, mesh;
// let axesHelper, raycaster = new THREE.Raycaster(), mouse = new THREE.Vector2(), controls;

// let currentStarSystem;
// let generatedGalaxy;

// let sphere;

// init();

// function init() {
//   scene = new THREE.Scene();
//   camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 10 );
//   renderer = new THREE.WebGLRenderer( { antialias: true } );

//   controls = new OrbitControls(camera, renderer.domElement);

//   currentStarSystem = new StarSystem({ 
//     starSize: Z_CAMERA * 0.2,
//     starTexture,
//     planetsQuantity: Math.floor(Math.random() * 5),
//   });
//   camera.position.set(0, 2, -5);

//   const sideStars = SideStars.generateSideStars();

//   generatedGalaxy = new Galaxy(); 

//   // const light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );
//   // scene.add(currentStarSystem.star);
//   // scene.add(...currentStarSystem.getPlanets());
//   // scene.add(sideStars);
//   // scene.add( light );
//   for (const glow of generatedGalaxy.glows) {
//     scene.add(glow);
//   }
//   scene.add(generatedGalaxy.galaxy);
//   camera.position.z = Z_CAMERA;

//   renderer.setSize(window.innerWidth, window.innerHeight);
  
//   document.body.appendChild(renderer.domElement);

//   const sphereGeometry = new THREE.SphereGeometry( 0.1, 32, 32 );
//   const sphereMaterial = new THREE.MeshBasicMaterial( { color: 0xff0000 } );

//   sphere = new THREE.Mesh( sphereGeometry, sphereMaterial );
//   scene.add(sphere);
// }

// let intersects;
// let clicked;

// function onMouseMove(event) {
//   mouse.x = ( event.clientX  / window.innerWidth ) * 2 - 1.01;
//   mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1.02;
// }

// function onClick() {

// }

Lehrmer();

const height = window.innerHeight;
const width  = window.innerWidth;

const threeScene = new InitScene(width, height);

document.body.appendChild(
  threeScene.getRenderer().domElement
);

let startPos = threeScene.getCamera().position;
let offset = { x: 0, y: 0, z: 0 };

let generatedGalaxies = new GalaxyCluster();
let cluster = generatedGalaxies.generateCluster(height, width, offset);
threeScene.addObjectsToScene(cluster);

const light = new THREE.DirectionalLight( 0xffffff, 1 );
threeScene.addObjectsToScene( light );

function animate() {
  threeScene.render();
  requestAnimationFrame(animate); 
}


const Deg0 = 0;
const Deg90 = Math.PI / 2; 
const Deg180 = Math.PI;
const Deg270 = Math.PI * 3 / 2;

console.log(Deg90, Deg270, Deg180);
const onKeyPress = (e) => {
  let theta = Math.abs(threeScene.getControls().getPolarAngle());
  let phi = Math.abs(threeScene.getControls().getAzimuthalAngle());
  // console.log(Math.abs(phi), Deg0 < Math.abs(phi) && Deg90 > Math.abs(phi));
  const { x, y, z } = newCoordsIn3D(5, phi, theta);
  if (/[wasder]/.test(e.key)) {
    if (e.key === 'w') {
      // offset.z += 2.5;
      offset.x += 5;
    } 
    else if (e.key === 's') offset.x -= 5; 
    else if (e.key === 'e') offset.y += 5;
    else if (e.key === 'r') offset.y -= 5;
    else if (e.key === 'a') offset.z -= 5; 
    else if (e.key === 'd') offset.z += 5 ; 
    threeScene.removeObjectsFromScene(cluster);
    cluster = generatedGalaxies.generateCluster(height, width, offset);
    threeScene.addObjectsToScene(cluster);
  }
};

window.addEventListener('keypress', onKeyPress);

animate();
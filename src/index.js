import * as THREE from 'three/build/three.module.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { StarSystem } from './StarSystem';
import { SideStars } from './SideStars';
import { Galaxy } from './Galaxy';
import starTexture from './assets/star.jpg';
import { Z_CAMERA, VELOCITY } from './consts';

let camera, scene, renderer;
let geometry, material, mesh;
let axesHelper, raycaster, mouse, controls;

let currentStarSystem;

init();

function init(cb) {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
  renderer = new THREE.WebGLRenderer( { antialias: true } );

  controls = new OrbitControls(camera, renderer.domElement);

  currentStarSystem = new StarSystem({ 
    starSize: Z_CAMERA * 0.2,
    starTexture,
    planetsQuantity: Math.floor(Math.random() * 5),
  });
  camera.position.set(0, 2, -5);

  const sideStars = SideStars.generateSideStars();

  const generatedGalaxy = new Galaxy(); 

  // const light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );
  // scene.add(currentStarSystem.star);
  // scene.add(...currentStarSystem.getPlanets());
  // scene.add(sideStars);
  // scene.add( light );
  scene.add(generatedGalaxy.galaxy);
  scene.add(generatedGalaxy.glow1);
  camera.position.z = Z_CAMERA;

  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild( renderer.domElement );
  // console.log(scene.children);
}

function animate() {
  currentStarSystem.star.rotation.y -= VELOCITY / 10;

  currentStarSystem.planetRotate();
  controls.update();

  renderer.render(scene, camera);
  requestAnimationFrame(animate); 
}

animate();

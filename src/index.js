import * as THREE from 'three/build/three.module.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { StarSystem } from './StarSystem';
import { SideStars } from './SideStars';
import { Galaxy } from './Galaxy';
import starTexture from './assets/star.jpg';
import { Z_CAMERA, VELOCITY } from './consts';

let camera, scene, renderer;
let geometry, material, mesh;
let axesHelper, raycaster = new THREE.Raycaster(), mouse = new THREE.Vector2(), controls;

let currentStarSystem;
let generatedGalaxy;

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

  generatedGalaxy = new Galaxy(); 

  // const light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );
  // scene.add(currentStarSystem.star);
  // scene.add(...currentStarSystem.getPlanets());
  // scene.add(sideStars);
  // scene.add( light );
  for (const glow of generatedGalaxy.glows) {
    scene.add(glow);
  }
  scene.add(generatedGalaxy.galaxy);
  camera.position.z = Z_CAMERA;

  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild( renderer.domElement );
  console.log(scene.children);
}

let intersects;
let clicked;

function onClick(event) {
  // console.log('here');
  clicked = intersects[intersects.length - 1];
  console.log(clicked);
  // mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
  // mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
}

function animate() {
  currentStarSystem.star.rotation.y -= VELOCITY / 10;

  raycaster.setFromCamera( mouse, camera );

  intersects = raycaster.intersectObjects([generatedGalaxy.galaxy]);

  clicked && clicked.object.material.color && clicked.object.material.color.set( 0xff0000 );

  currentStarSystem.planetRotate();
  controls.update();

  renderer.render(scene, camera);
  requestAnimationFrame(animate); 
}

window.addEventListener( 'click', onClick);

animate();

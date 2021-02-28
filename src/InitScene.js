import * as THREE from 'three/build/three.module.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export class InitScene {
  constructor(width, height) {
    const FOV = 45;
    const RATIO = width / height;
    const NEAR = 1;
    const FAR = 1000;

    this._cameraStart = 1;
    this._scene    = new THREE.Scene();
    this._renderer = new THREE.WebGLRenderer({ antialias: true });
    this._camera   = new THREE.PerspectiveCamera(FOV, RATIO, NEAR, FAR); 

    const axesHelper = new THREE.AxesHelper( 3 );
    this._controls = new OrbitControls(this._camera, this._renderer.domElement);
    // 
    // this._controls.enableZoom = false;

    this._scene.add(axesHelper);

    // this._camera.position. = 100;

    this._camera.position.z = this._cameraStart;
    this._renderer.setSize(width, height);

  }

  addObjectsToScene(generatedObject) {
    if (Array.isArray(generatedObject)) generatedObject.forEach((item) => this._scene.add(item));
    else this._scene.add(generatedObject);
  }

  removeObjectsFromScene(generatedObject) {
    this._scene.remove(generatedObject);
  }

  changeCameraPosition(newZ) {
    this._camera.position.z = newZ;
  }

  getRenderer() {
    return this._renderer;
  }

  getControls() {
    return this._controls;
  }

  getCamera() {
    return this._camera;
  }

  render() {
    this._renderer.render(this._scene, this._camera);
  }
}
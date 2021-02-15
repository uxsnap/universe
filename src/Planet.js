import { SphereGeometry, Mesh, ImageUtils, MeshBasicMaterial, TextureLoader  } from 'three/build/three.module.js';
import { rad } from './helpers';
// import moon from './assets/moonish.jpg';
import { VELOCITY } from './consts';

export class Planet {
  constructor(planetSize, texture) {
    const planet = new SphereGeometry(planetSize, 32, 32);
    const planetMaterial = new MeshBasicMaterial();
    planetMaterial.map = ImageUtils.loadTexture(texture);
    this.planetMesh = new Mesh(planet, planetMaterial); 
    this.planetMesh.name = "Planet";
    
    this.currentAngle = Math.floor(Math.random() * 360);
    this.speed = VELOCITY / planetSize * 2;
    this.planetPosInSystem = Math.random() * 10;
    if (this.planetPosInSystem < 3) this.planetPosInSystem += 3;
  }

  rotateAfterStar() {
    if (this.currentAngle > 360)
      this.currentAngle = -1;
    this.currentAngle += this.speed;
    this.planetMesh.position.set(...this.newAngleCoords(this.currentAngle));
  };


  newAngleCoords(currentAngle) {
    return [
      this.planetPosInSystem * Math.cos(rad(this.currentAngle)), 
      0,
      this.planetPosInSystem * Math.sin(rad(this.currentAngle))
    ];
  }
}
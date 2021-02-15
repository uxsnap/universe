import { Sprite, AdditiveBlending, SpriteAlignment, 
  SphereGeometry, MeshLambertMaterial, Mesh, ImageUtils, TextureLoader, SpriteMaterial } from 'three/build/three.module.js';
import { PlanetFactory } from './PlanetFactory';
import glow from './assets/glow.png';

export class StarSystem {
  constructor({ starSize, starTexture, planetsQuantity, starColor }) {
    const star = new SphereGeometry(starSize, 32, 32);
    const starMaterial = new MeshLambertMaterial({ color: starColor });

    starMaterial.map = ImageUtils.loadTexture(starTexture);
    this.star = new Mesh(star, starMaterial);

    this.planets = PlanetFactory.generateRandomPlanets(planetsQuantity);
  }

  planetRotate() {
    this.planets.forEach(planet => planet.rotateAfterStar());
  }

  getPlanets() {
    return this.planets.map((p) => p.planetMesh);
  }
} 
import { BufferGeometry, MathUtils, Float32BufferAttribute, PointsMaterial, Points } from 'three/build/three.module.js';

export class SideStars {
  static generateSideStars() {
    const vertices = [];

    for (let i = 0; i < 4000; i++) {
      const x = MathUtils.randFloatSpread( 1000 );
      const y = MathUtils.randFloatSpread( 1000 );
      const z = MathUtils.randFloatSpread( 1000 );
      vertices.push( x, y, z );
    }
    
    const geometry = new BufferGeometry();
    geometry.setAttribute( 'position', new Float32BufferAttribute( vertices, 3 ) );

    const material = new PointsMaterial({ color: 0x888888, size: 0.3 });

    return new Points(geometry, material);
  }
}
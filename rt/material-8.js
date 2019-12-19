import { Ray } from './ray-1.js';

export class Material {

    constructor() {}

    
    randomInUnitSphere() {
        let p;
        do {
            p = new THREE.Vector3( 2*Math.random() - 1, 2*Math.random() - 1, 2*Math.random() -1 );
        }
        while ( p.lengthSq() >= 1);
        return p;
    }

}


export class LambertianMaterial extends Material {

    constructor ( albedo ) { 

        super();
        this.albedo = albedo;

    }

    scatter ( r, attenuation, hitRecord, scattered ) {
        
        const target = this.randomInUnitSphere().add( hitRecord.p).add(hitRecord.n);
        scattered.origin = hitRecord.p;
        scattered.dir = target.sub( hitRecord.p);
        attenuation.setRGB( this.albedo.r, this.albedo.g, this.albedo.b );

        return true;


    }

}

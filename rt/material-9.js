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

export class MetalMaterial extends Material {

    constructor ( albedo, fuzziness ) { 

        super();
        this.albedo = albedo;
        this.fuzziness = fuzziness;

    }

    scatter ( r, attenuation, hitRecord, scattered ) {
        
        const reflected = r.dir.reflect( hitRecord.n );
        scattered.origin = hitRecord.p;
        scattered.dir = reflected;
        if (this.fuzziness > 0) {
            scattered.dir.add( this.randomInUnitSphere().multiplyScalar( this.fuzziness ));
        }
        attenuation.setRGB( this.albedo.r, this.albedo.g, this.albedo.b );

        return ( scattered.dir.dot(hitRecord.n) > 0);


    }

}



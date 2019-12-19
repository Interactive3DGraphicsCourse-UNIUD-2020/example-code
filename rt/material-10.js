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

    refract ( v, n, ni_over_nt, refracted) {
        
        const vu = v.clone().normalize();
        const dt = n.dot( vu );
        const discriminant = 1 - ni_over_nt * ni_over_nt * (1-dt*dt);
        if (discriminant > 0) {
            refracted.copy(  vu.sub( n.clone().multiplyScalar(dt) ).multiplyScalar(ni_over_nt).sub( n.clone().multiplyScalar(Math.sqrt(discriminant)) )  );
            return true;
        } else {
            return false;
        }

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
        
        const reflected = r.dir.clone().reflect( hitRecord.n );
        scattered.origin = hitRecord.p;
        scattered.dir = reflected;
        if (this.fuzziness > 0) {
            scattered.dir.add( this.randomInUnitSphere().multiplyScalar( this.fuzziness ));
        }
        attenuation.setRGB( this.albedo.r, this.albedo.g, this.albedo.b );

        return ( scattered.dir.dot(hitRecord.n) > 0);


    }

}


export class DielectricMaterial extends Material {

    constructor ( ri ) { 

        super();
        this.ref_idx = ri;

    }

    schlick( cosine, ref_idx) {
        let r0 = ( 1 - ref_idx) / ( 1 + ref_idx);
        r0 = r0 * r0;
        return r0 + (1-r0)*Math.pow(1-cosine,5);
    }

    scatter ( r, attenuation, hitRecord, scattered ) {
        
        let outward_normal = new THREE.Vector3();
        let ni_over_nt;
        attenuation.setRGB(1,1,1);
        let refracted = new THREE.Vector3();
        let reflected_prob;
        let cosine;
        if ( r.dir.dot( hitRecord.n) > 0 ) {
            outward_normal.copy(hitRecord.n).negate();
            ni_over_nt = this.ref_idx;
            cosine = this.ref_idx * r.dir.dot( hitRecord.n) / r.dir.length();
        } else {
            outward_normal.copy(hitRecord.n);
            ni_over_nt = 1 / this.ref_idx;
            cosine = - r.dir.dot( hitRecord.n) / r.dir.length();
        }
        if ( this.refract(r.dir, outward_normal, ni_over_nt, refracted )) {
            reflected_prob = this.schlick( cosine, this.ref_idx);
        } else {
            scattered.origin = hitRecord.p;
            scattered.dir = r.dir.clone().reflect( hitRecord.n );;
            reflected_prob = 1.0;
        }
        if (Math.random() < reflected_prob ) {
            scattered.origin = hitRecord.p;
            scattered.dir = r.dir.clone().reflect( hitRecord.n );;
        } else {
            scattered.origin = hitRecord.p;
            scattered.dir = refracted;
        }
        return true;


    }

}

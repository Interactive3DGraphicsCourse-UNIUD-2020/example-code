import { Ray } from "./ray-1.js";

export class Camera {

    constructor ( lookfrom, lookat, up, vfov, aspect, aperture, focus_dist ) { 

        this.lens_radius = aperture / 2;
        const halfHeight = Math.tan(vfov / 2.0);
        const halfWidth = halfHeight * aspect;
        this.origin = lookfrom.clone();
        const w = lookfrom.clone().sub( lookat).normalize();
        this.u = new THREE.Vector3().crossVectors(up, w);
        this.v = new THREE.Vector3().crossVectors(w, this.u);
        this.lowerLeftCorner = new THREE.Vector3().copy(this.origin).sub( this.u.clone().multiplyScalar(halfWidth * focus_dist) ).
            sub(this.v.clone().multiplyScalar(halfHeight*focus_dist)).sub(w.multiplyScalar(focus_dist));

        this.horizontal = this.u.clone().multiplyScalar(2*halfWidth*focus_dist);
        this.vertical =  this.v.clone().multiplyScalar(2*halfHeight*focus_dist);
        

    }

    randomInUnitDisk() {
        let p;
        do {
            p = new THREE.Vector3( 2*Math.random() - 1, 2*Math.random() - 1, 0 );
        }
        while ( p.lengthSq() >= 1);
        return p;
    }

    getRay( s, t) {

        const rd = this.randomInUnitDisk().multiplyScalar(this.lens_radius);
        const offset = this.u.clone().multiplyScalar(rd.x).add( this.v.clone().multiplyScalar(rd.y));

        let hor = this.horizontal.clone();
        hor.multiplyScalar( s );

        let vert = this.vertical.clone();
        vert.multiplyScalar( t );

        let dir = this.lowerLeftCorner.clone();
        const origin = this.origin.clone();

        dir.add ( hor);
        dir.add ( vert );
        dir.sub ( this.origin ).sub(offset);

        return new Ray( origin.add(offset), dir);

    }

}
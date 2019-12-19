import { Ray } from "./ray-1.js";

export class Camera {

    constructor ( lookfrom, lookat, vup, vfov, aspect ) { 

        const halfHeight = Math.tan(vfov / 2.0);
        const halfWidth = halfHeight * aspect;
        this.origin = lookfrom.clone();
        const w = lookfrom.clone().sub( lookat).normalize();
        const u = new THREE.Vector3().crossVectors(vup, w);
        const v = new THREE.Vector3().crossVectors(w, u);
        this.lowerLeftCorner = new THREE.Vector3().copy(this.origin).sub( u.clone().multiplyScalar(halfWidth) ).
            sub(v.clone().multiplyScalar(halfHeight)).sub(w);

        this.horizontal = u.clone().multiplyScalar(2*halfWidth);
        this.vertical =  v.clone().multiplyScalar(2*halfHeight);
        

    }

    getRay( s, t) {

        let hor = this.horizontal.clone();
        hor.multiplyScalar( s );

        let vert = this.vertical.clone();
        vert.multiplyScalar( t );

        let dir = this.lowerLeftCorner.clone();
        const origin = this.origin.clone();

        dir.add ( hor);
        dir.add ( vert );
        dir.sub ( this.origin );

        return new Ray( origin, dir);

    }

}
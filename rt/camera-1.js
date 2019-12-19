import { Ray } from "./ray-1.js";

export class Camera {

    constructor ( vfov, aspect ) { 

        const halfHeight = Math.tan(vfov / 2.0);
        const halfWidth = halfHeight * aspect;
        this.lowerLeftCorner = new THREE.Vector3(-halfWidth, -halfHeight, -1);
        this.horizontal = new THREE.Vector3( 2*halfWidth, 0, 0);
        this.vertical = new THREE.Vector3( 0, 2*halfHeight, 0);
        this.origin = new THREE.Vector3(0,0,0);

    }

    getRay( u, v) {

        let hor = this.horizontal.clone();
        hor.multiplyScalar( u );

        let vert = this.vertical.clone();
        vert.multiplyScalar( v );

        let dir = this.lowerLeftCorner.clone();
        const origin = this.origin.clone();

        dir.add ( hor);
        dir.add ( vert );
        dir.sub ( this.origin );

        return new Ray( origin, dir);

    }

}
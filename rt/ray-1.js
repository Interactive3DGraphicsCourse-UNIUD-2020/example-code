export class Ray {

    constructor ( origin, dir) {

        this.origin = origin;
        this.dir = dir;

    }

    pointAtParameter( t ) {
        
        let result = new THREE.Vector3( this.dir.x, this.dir.y, this.dir.z);
        result.multiplyScalar( t );
        result.add( this.origin );
        return result;
    
    }

}
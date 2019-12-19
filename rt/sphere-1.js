export class Sphere {

    constructor ( center, radius ) { 

        this.center = center;
        this.radius = radius;
    }


    hit (r) {

        let oc = new THREE.Vector3();
        oc.subVectors(r.origin, this.center);
        const a = r.dir.dot(r.dir);
        const b = 2.0 * oc.dot(r.dir);
        const c = oc.dot(oc) - this.radius * this.radius;
        const discriminant = b * b - 4 * a * c;
        if (discriminant > 0) {
            return true;
        }
        return false;
    }

}
export class Sphere {

    constructor ( center, radius ) { 

        this.center = center;
        this.radius = radius;
    }


    hit (r, tmin, tmax, hitRecord) {

        let oc = new THREE.Vector3();
        oc.subVectors(r.origin, this.center);
        const a = r.dir.dot(r.dir);
        const b = oc.dot(r.dir);
        const c = oc.dot(oc) - this.radius * this.radius;
        const discriminant = b * b - a * c;
        if (discriminant > 0) {
            let temp = ( -b - Math.sqrt(b*b - a*c))/a;
            if (temp > tmin && temp < tmax) {
                hitRecord.t = temp;
                hitRecord.p = r.pointAtParameter(hitRecord.t);
                hitRecord.n.subVectors( hitRecord.p, this.center );
                hitRecord.n.divideScalar( this.radius);
                return true;
            }

            temp = ( -b + Math.sqrt(b*b - a*c))/a;

            if (temp > tmin && temp < tmax) {
                hitRecord.t = temp;
                hitRecord.p = r.pointAtParameter(hitRecord.t);
                hitRecord.n.subVectors( hitRecord.p, this.center );
                hitRecord.n.divideScalar( this.radius);
                
                return true;
            }
        }

        return false;
    
    }

}
import * as THREE from 'three';

export class CameraEntity {
    constructor({
        fov = 45,
        position = [3, 3, 3],
        lookAt = [0, 0, 0]
    }) {
        this.fov = fov;
        this.position = new THREE.Vector3(...position)
        this.lookAt = new THREE.Vector3(...lookAt);

        this.camera = new THREE.PerspectiveCamera(
            this.fov,
            1.0,
            0.1,
            1000
        );
    }

    sync(aspect) {
        this.camera.fov = this.fov;
        this.camera.aspect = aspect;

        this.camera.position.copy(this.position);
        this.camera.lookAt(this.lookAt);

        this.camera.updateProjectionMatrix();
    }
}
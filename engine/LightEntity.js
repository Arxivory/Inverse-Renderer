import * as THREE from 'three';

export class LightEntity {
    constructor({
        type = "point",
        color = [1, 1, 1],
        intensity = 1.0,
        position = [5, 5, 5]
    }) {
        this.type = type;
        this.color = new THREE.Color(...color);
        this.intensity = intensity;
        this.position = new THREE.Vector3(...position);

        if (this.type === 'point')
            this.light = new THREE.PointLight(this.color, this.intensity);
        else if (this.type === 'directional')
            this.light = new THREE.DirectionalLight(this.color, this.intensity);

        this.light.position.copy(this.position);
    }

    sync() {
        this.light.color.copy(this.color);
        this.light.intensity = this.intensity;
        this.light.position.copy(this.position);
    }
}
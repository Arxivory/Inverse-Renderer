import { SceneState } from "./SceneState";
import { ParameterDescriptor } from "./ParameterDescriptor";

export class ParameterVector {
    constructor() {
        this.parameters = [];
        this.build();
    }

    build() {
        this.parameters = [];

        this._addCameraParams();
        this._addLightParams();
        this._addObjectParams();
    }

    _addCameraParams() {
        const cam = SceneState.camera;
        if (!cam) return;

        ['x', 'y', 'z'].forEach(axis => {
            this.parameters.push(new ParameterDescriptor({
                get: () => cam.position[axis],
                set: v => cam.position[axis] = v,
                step: 1e-2
            }));
        });

        ['x', 'y', 'z'].forEach(axis => {
            this.parameters.push(new ParameterDescriptor({
                get: () => cam.lookAt[axis],
                set: v => cam.lookAt[axis] = v,
                step: 1e-2
            }));
        });

        this.parameters.push(new ParameterDescriptor({
            get: () => cam.fov,
            set: v => cam.fov = Math.max(1, Math.min(120, v)),
            step: 0.1
        }));
    }
}
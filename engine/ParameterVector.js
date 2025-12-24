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

    _addLightParams() {
        SceneState.lights.forEach(light => {
            ['x', 'y', 'z'].forEach(axis => {
                this.parameters.push(new ParameterDescriptor({
                    get: () => light.position[axis],
                    set: v => light.position[axis] = v,
                    step: 1e-2
                }));
            });

            ['r', 'g', 'b'].forEach(channel => {
                this.parameters.push(new ParameterDescriptor({
                    get: () => light.color[channel],
                    set: v => light.color[channel] = Math.min(1, Math.max(0, v)),
                    step: 1e-2
                }))
            });

            this.parameters.push(new ParameterDescriptor({
                get: () => light.intensity,
                set: v => light.intensity = Math.max(0, v),
                step: 1e-2
            }));
        });
    }

    _addObjectParams() {
        SceneState.objects.forEach(obj => {
            ['x', 'y', 'z'].forEach(axis => {
                this.parameters.push(new ParameterDescriptor({
                    get: () => obj.position[axis],
                    set: v => obj.position[axis] = v,
                    step: 1e-2
                }));
            });

            ['x', 'y', 'z'].forEach(axis => {
                this.parameters.push(new ParameterDescriptor({
                    get: () => obj.rotation[axis],
                    set: v => obj.rotation[axis] = v,
                    step: 1e-3
                }));
            });

            ['x', 'y', 'z'].forEach(axis => {
                this.parameters.push(new ParameterDescriptor({
                    get: () => obj.scale[axis],
                    set: v => obj.scale[axis] = Math.max(1e-3, v),
                    step: 1e-3
                }));
            });
        })
    }

    getLength() {
        return this.parameters.length;
    }

    getValues() {
        return this.parameters.map(p => p.get());
    }

    setValues(values) {
        values.forEach((v, i) => {
            this.parameters[i].set(v);
        })
    }
}
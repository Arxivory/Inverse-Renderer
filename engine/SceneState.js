export const SceneState = {
    objects: [],
    lights: [],
    camera: null,

    reset() {
        this.objects = [];
        this.lights = [];
        this.camera = null;
    }
};
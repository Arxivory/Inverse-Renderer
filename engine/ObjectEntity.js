export class ObjectEntity {
    constructor({
        id,
        mesh,
        position,
        rotation,
        scale,
        materialParams
    }) {
        this.id = id;

        this.position = position.clone();
        this.rotation = rotation.clone();
        this.scale = scale.clone();

        this.mesh = mesh;
    }

    syncToMesh() {
        this.mesh.position.copy(this.position);
        this.mesh.rotation.set(
            this.rotation.x,
            this.rotation.y,
            this.rotation.z
        );
        this.mesh.scale.copy(this.scale);
    }
}
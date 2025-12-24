import * as THREE from "three";
import { SceneState } from './SceneState.js';
import { CameraEntity } from "./CameraEntity.js";
import { LightEntity } from "./LightEntity.js";
import { ObjectEntity } from './ObjectEntity.js';
import { loadOBJMTL } from '../renderer/loaders.js';
import { addToScene } from "../renderer/renderer.js";

export async function loadSceneFromJSON(path) {
    const response = await fetch(path);
    const data = await response.json();

    SceneState.camera = new CameraEntity(data.camera);

    for (const lightDef of data.lights) {
        const light = new LightEntity(lightDef);
        SceneState.lights.push(light);
        addToScene(light.light);
    }

    for (const objDef of data.objects) {
        const mesh = await loadOBJMTL(
            objDef.model.obj,
            objDef.model.mtl
        )

        addToScene(mesh);

        const objEntity = new ObjectEntity({
            id: objDef.id,
            mesh,
            position: new THREE.Vector3(...objDef.transform.position),
            rotation: new THREE.Vector3(...objDef.transform.rotation),
            scale: new THREE.Vector3(...objDef.transform.scale)
        });

        SceneState.objects.push(objEntity);
    }
}
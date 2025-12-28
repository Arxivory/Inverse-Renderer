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
        light.light.castShadow = true;
        light.light.shadow.mapSize.width = 1024;
        light.light.shadow.mapSize.height = 1024;
        SceneState.lights.push(light);
        addToScene(light.light);
    }

    for (const objDef of data.objects) {
        const mesh = ("tex" in objDef.model) ? await loadOBJMTL(
            objDef.model.obj,
            objDef.model.mtl,
            objDef.model.tex
        ) : await loadOBJMTL(
            objDef.model.obj,
            objDef.model.mtl
        )

        mesh.traverse(child => {
            if (child.isMesh) {
                child.material.side = THREE.DoubleSide;
                child.material.needsUpdate = true;
                child.castShadow = objDef.castShadow;
                child.receiveShadow = objDef.receiveShadow;
            }
        });


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
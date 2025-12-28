import * as THREE from "three";
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';

export async function loadOBJMTL(objPath, mtlPath, texturePath = "none") {
    const mtlLoader = new MTLLoader();
    const materials = await mtlLoader.loadAsync(mtlPath);
    materials.preload();

    const objLoader = new OBJLoader();
    objLoader.setMaterials(materials);

    const object = await objLoader.loadAsync(objPath);

    if (texturePath !== "none") {
        const textureLoader = new THREE.TextureLoader();
        const texture = await textureLoader.loadAsync(texturePath);

        const texturedMaterial = new THREE.MeshPhysicalMaterial({ map: texture });

        object.traverse((child) => {
            if (child.isMesh) {
                child.material = texturedMaterial;
            }
        });
    }

    return object;
}
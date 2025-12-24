import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';

export async function loadOBJMTL(objPath, mtlPath) {
    const mtlLoader = new MTLLoader();
    const materials = await mtlLoader.loadAsync(mtlPath);
    materials.preload();

    const objLoader = new OBJLoader();
    objLoader.setMaterials(materials);

    return await objLoader.loadAsync(objPath);
}
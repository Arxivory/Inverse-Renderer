import * as THREE from 'three';
import { ObjectEntity } from './ObjectEntity.js';
import { SceneState } from './SceneState.js';
import { loadOBJMTL } from '../renderer/loaders.js';
import { addToScene } from '../renderer/renderer.js';

export async function loadTestObject() {
    const mesh = await loadOBJMTL('../assets/objects/Sofa.obj', '../assets/materials/Sofa.mtl');

    addToScene(mesh);

    const objEntity = new ObjectEntity({
        id: 'sofa1',
        mesh,
        position: new THREE.Vector3(0, 0, 0),
        rotation: new THREE.Vector3(0, 0, 0),
        scale: new THREE.Vector3(1, 1, 1)
    });

    SceneState.objects.push(objEntity);
}


import * as THREE from "three";
import { SceneState } from './SceneState';
import { ObjectEntity } from './ObjectEntity';
import { loadOBJMTL } from '../renderer/loaders';
import { addToScene } from "../renderer/renderer";

export async function loadSceneFromJSON(path) {
    const response = await fetch(path);
    const data = await response.json();

    SceneState.camera = data.camera;

    
}
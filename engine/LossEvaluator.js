import { referenceImageData } from "../utils/imageReferenceLoader.js";

export function computeLoss(renderedPixels) {
    if (!referenceImageData)
        throw new Error("Reference Image is not loaded");

    let loss = 0;
    const n = renderedPixels.length;

    for (let i = 0; i < n; i += 4) {
        const r1 = renderedPixels[i] / 255;
        const g1 = renderedPixels[i + 1] / 255;
        const b1 = renderedPixels[i + 2] / 255;

        const r2 = referenceImageData[i] / 255;
        const g2 = referenceImageData[i + 1] / 255;
        const b2 = referenceImageData[i + 2] / 255;

        const dr = r1 - r2;
        const dg = g1 - g2;
        const db = b1 - b2;

        loss += (dr * dr) + (dg * dg) + (db * db);
    }

    return loss / (n / 4);
}
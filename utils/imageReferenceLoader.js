export let referenceImageData = null;

export function loadReferenceImage(url, width, height) {
    return new Promise((resolve) => {
        const img = new Image();
        img.src = url;
        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;

            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, width, height);

            referenceImageData = ctx.getImageData(0, 0, width, height).data;
            resolve();
        }
    })
}
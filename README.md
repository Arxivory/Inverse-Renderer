# Inverse Rendering with Non-Differentiable Three.js Renderer

## Project Overview

This project demonstrates **inverse rendering** in a web-based environment using Three.js. The system estimates **camera pose, light position and color, and object placements** by optimizing an image-space loss relative to a reference image. Unlike differentiable rendering approaches, the Three.js forward renderer is **non-differentiable**, so **numerical gradient approximation via finite differences** is leveraged to iteratively update scene parameters.

## The implementation runs entirely in the browser, making it accessible and interactive.

## Key Features

- **Inverse Rendering**: Recover scene parameters from a single reference image.
- **Non-Differentiable Renderer**: Works with standard Three.js without modifying the rendering pipeline.
- **Camera Optimization**: Optimizes camera position and orientation along with scene parameters.
- **Light and Object Parameter Optimization**: Adjusts light color, position, and object translations to match the reference image.
- **Numerical Gradients**: Uses finite-difference approximation for gradient-based optimization.

---

## Motivation

Three.js is a popular browser-based 3D rendering library, but it lacks differentiability required for traditional gradient-based inverse rendering. This project demonstrates that meaningful **inverse graphics** can still be achieved using numerical gradients.

Applications and motivations include:

- **Educational Demonstration**: Visualize inverse rendering concepts without complex frameworks.
- **Content Creation Tools**: Enable parameter tuning in interactive 3D web editors.
- **Research Prototyping**: Serve as a lightweight testbed for optimization-based scene inference.

---

## How It Works

1. **Load Preset Scene**: Reference image and initial scene parameters are loaded from JSON.
2. **Initialize Three.js Scene**: Sets up camera, light, and objects.
3. **Render Offscreen**: The scene is rendered into a WebGL render target for pixel readback.
4. **Compute Loss**: Compare rendered image to reference image using L2 loss.
5. **Estimate Gradients**: Perturb each parameter slightly and compute finite-difference gradients.
6. **Update Parameters**: Apply gradient descent step to camera, light, and object positions.
7. **Iterate**: Repeat until convergence or maximum iterations.
8. **Display**: Render the updated scene and show loss progress and parameter updates.

---

## Usage

1. Open `index.html` in a web browser (no server required).
2. Select a preset scene from the dropdown.
3. Click **Run Optimization** to begin inverse rendering.
4. Observe the scene converging toward the reference image in real-time.
5. Optional: Inspect the loss, iteration count, and parameter values in the UI.

---

## Implementation Notes

- **Numerical Gradient Approximation**: Uses the definition of derivative to compute approximate gradients for non-differentiable forward rendering.
- **Staged Optimization**: Camera is optimized first, followed by light, then objects, and finally a joint refinement.
- **Parameter Constraints**: All parameters are clamped to physically plausible ranges to maintain stability.
- **Offscreen Rendering**: Essential for loss computation without interfering with the visible canvas.

---

## Future Improvements

- Multi-view reference images for improved convergence.
- GPU-accelerated numerical gradient computation via WebGL shaders.
- Support for more complex materials and textures.
- Integration with WebAssembly for faster performance in browser.

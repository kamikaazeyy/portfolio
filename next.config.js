module.exports = {
  turbopack: {
    // three-globe statically imports three/webgpu + three/tsl (WebGPU-only paths
    // never used with WebGLRenderer). Stub them to avoid a second Three.js
    // instance loading and triggering the duplicate-instance warning.
    resolveAlias: {
      'three/webgpu': { browser: './src/stubs/three-webgpu-stub.js' },
      'three/tsl': { browser: './src/stubs/three-tsl-stub.js' },
    },
  },
};

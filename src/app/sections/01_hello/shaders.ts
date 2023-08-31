export const vertexShader: string = `
precision highp float;

attribute vec2 position, uv;

varying vec2 vUV;

void main() {
  gl_Position = vec4(position, 0, 1);
  vUV = uv;
}`;

export const fragmentShader: string = `
  float perlin_2d(vec2 p) {
    
  }

  float rand2(vec2 n) { 
	return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
}
 `;

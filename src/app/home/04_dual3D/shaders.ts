export const vertexShader = `
precision highp float;

attribute float pindex;
attribute vec3 offset;
attribute float angle;

uniform float uClock;
uniform float uRandom;
uniform float uDepth;
uniform float uSize;
uniform vec2 uTextureSize;
uniform sampler2D uTexture;
uniform int uMoving;

varying vec2 vPUv;
varying vec2 vUv;


float rand(float n){
    return fract(sin(n) * 43758.5453123);
}

float rand2(vec2 n) { 
	return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
}


float noise(float p){
	float fl = floor(p);
    float fc = fract(p);
	return mix(rand(fl), rand(fl + 1.0), fc);
}
	
float noise2(vec2 n) {
	const vec2 d = vec2(0.0, 1.0);
    vec2 b = floor(n), f = smoothstep(vec2(0.0), vec2(1.0), fract(n));
	return mix(mix(rand2(b), rand2(b + d.yx), f.x), mix(rand2(b + d.xy), rand2(b + d.yy), f.x), f.y);
}


void main() {
    vUv = uv;
    //particule uv
    vPUv = offset.xy / uTextureSize;

	vec4 colA = texture2D(uTexture, vPUv);
	float grey = colA.r * 0.01 + colA.g * 0.01 + colA.b * 0.97;

	vec3 displaced = offset;

	if(uMoving == 0){
		displaced.y += sin(uClock + noise(noise(pindex)) + 1.0);
		displaced.y +=  noise(noise(pindex) + uClock + 1.0);
	
		displaced.x +=  noise(noise(pindex) + uClock);

	}
	else{
		displaced.xy += vec2(rand(pindex) * (uRandom * rand(uClock * 0.004)) - 0.5, rand(offset.x + pindex) - 0.5) * uRandom * rand(uClock * 0.004);

	}
	// float rndz = (rand(pindex) + noise2(vec2(pindex * 0.1, uClock * 0.4)));
	// displaced.z += rndz * (rand(pindex) * 1.0 * uDepth);

	displaced.xy -= uTextureSize * 0.5;
    
	float psize = (noise2(vec2(uClock, pindex) * 0.5) + 2.0);
	psize *= max(grey, 0.2);
	psize *= uSize;

	vec4 mvPosition = modelViewMatrix * vec4(displaced, 1.0);
    mvPosition.xyz += position * psize;

	vec4 finalPosition = projectionMatrix * mvPosition;
    
	gl_Position = finalPosition;

}
`;

export const fragmentShader = `
precision highp float;
uniform sampler2D uTexture;

varying vec2 vUv;
varying vec2 vPUv;

void main() {
    vec4 color = vec4(0.0);
	vec2 uv = vUv;
	vec2 puv = vPUv;

	// pixel color
	vec4 colA = texture2D(uTexture, puv);

	// bluescale
	float grey = colA.r * 0.21 + colA.g * 0.07 + colA.b * 0.71;

	vec4 colB = vec4(grey/ (2.0 / colA.b), grey /(0.75 / colA.b), grey * 2.0, 1.0);

	// circle
	float border = 0.1;
	float radius = 0.5;
	float dist = radius - distance(uv, vec2(0.5));
	float t = smoothstep(0.0, border, dist);

	// final color
	color = colB;
	color.a = t;
    gl_FragColor = color;
}`;

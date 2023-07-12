export const vertex = `void main(){
    attribute vec3 center;
    varying vec3 vCenter;

    vec4 finalePosition = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
    gl_Position = finalPosition;
}`;

export const fragment = `
varying vec3 vCenter;

void main(){
    vec3 afwidth = fwidth( vCenter.xyz );

    vec3 edge3 = smoothstep( ( 0.3 - 1.0 ) * afwidth, 0.3 * afwidth, vCenter.xyz );

    float edge = 1.0 - min( min( edge3.x, edge3.y ), edge3.z );

    gl_FragColor.rgb = gl_FrontFacing ? vec3( 0.9, 0.9, 1.0 ) : vec3( 0.4, 0.4, 0.5 );
    gl_FragColor.a = edge;
}
`;

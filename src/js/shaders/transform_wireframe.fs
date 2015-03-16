#extension GL_OES_standard_derivatives : enable

varying vec3 vCenter;

float edgeFactorTri() {

    vec3 d = fwidth( vCenter.xyz );
    vec3 a3 = smoothstep( vec3( 1.0 ), d * 1.5, vCenter.xyz );
    return min( min( a3.x, a3.y ), a3.z );

}

void main() {
    if(gl_FrontFacing){
        gl_FragColor = vec4(0.0, 0.0, 0.0, (1.0-edgeFactorTri())*0.95);
    }
    else{
        gl_FragColor = vec4(0.0, 0.0, 0.0, (1.0-edgeFactorTri())*0.7);
    }

}

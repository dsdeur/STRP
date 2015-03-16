
uniform float t;
uniform float bt;
uniform float var1;
uniform float var2;
uniform float level;
uniform float len;

attribute float ox;
attribute float oy;
attribute float oz;

attribute float displacement;
varying vec3 vNormal;

void main() {

	vNormal = normal;

	float scale = 1.0 + sin(t + displacement * ((1.0 + displacement)/(1.0 + displacement * var2)) * var1/40.0) * sin(bt * displacement/len) * level;
    float x = ox * scale;
    float y = oy * scale;
    float z = oz * scale;

	vec3 newPosition = position + position * scale;


	gl_Position = projectionMatrix *
	            modelViewMatrix *
	            vec4(newPosition, 1.0);
}

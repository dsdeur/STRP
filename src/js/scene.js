var THREE = require('three');

module.exports = function(element) {
    var self = this;
    this.element = element;

    // Init the scene camera and lights
    this.init = function(element) {
        // Create the objects
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 1, 10000);
        this.renderer = new THREE.WebGLRenderer();

        // Append the scene to the body
        this.renderer.shadowMapEnabled = true;
        this.element.appendChild(this.renderer.domElement);

        // Let there be light
        this.ambient = new THREE.AmbientLight(0x999999);
        this.light = new THREE.DirectionalLight(0x999999);

        // Light settings
        this.light.castShadow = true;
        this.light.shadowMapWidth = 2048;
        this.light.shadowMapHeight = 2048;
        this.light.shadowCameraLeft = -500;
        this.light.shadowCameraRight = 500;
        this.light.shadowCameraTop = 500;
        this.light.shadowCameraBottom = -500;
        this.light.shadowCameraFar = 3500;

        // Set camera position
        this.camera.position.y = 100;
        this.camera.position.z = 300;

        // Add lights to the scene
        this.scene.add(this.ambient);
        this.scene.add(this.light);
    };

    // Resize the canvas
    this.resize = function(width, height) {
        this.camera.aspect = width / height;
        this.renderer.setSize(width, height);
        this.camera.updateProjectionMatrix();
    };

    // Add object to the scene
    this.add = function(obj) {
        this.scene.add(obj);
    };

    // Render the scene
    this.render = function() {
        self.renderer.render(self.scene, self.camera);
    };

    this.init(element);
}

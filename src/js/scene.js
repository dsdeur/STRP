var THREE = require('three');

module.exports = function(element) {
    var self = this;
    this.element = element;

    this.init = function(element) {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 1, 10000);
        this.renderer = new THREE.WebGLRenderer();

        this.renderer.shadowMapEnabled = true;
        this.element.appendChild(this.renderer.domElement);

        this.ambient = new THREE.AmbientLight(0x999999);
        this.light = new THREE.DirectionalLight(0x999999);

        this.light.castShadow = true;
        this.light.shadowMapWidth = 2048;
        this.light.shadowMapHeight = 2048;
        this.light.shadowCameraLeft = -500;
        this.light.shadowCameraRight = 500;
        this.light.shadowCameraTop = 500;
        this.light.shadowCameraBottom = -500;
        this.light.shadowCameraFar = 3500;

        this.camera.position.y = 100;
        this.camera.position.z = 300;

        this.scene.add(this.ambient);
        this.scene.add(this.light);
    }

    this.resize = function(width, height) {
        this.camera.aspect = width/height;
        this.renderer.setSize(width, height);
        this.camera.updateProjectionMatrix();
    },

    this.render = function() {
        requestAnimationFrame(self.render);

        self.renderer.render(self.scene, self.camera);
    }

    this.init(element);
}

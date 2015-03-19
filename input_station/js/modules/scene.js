var Scene = function(element) {
    var self = this;
    this.element = element;

    this.init = function(blob) {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, 500/500, 1, 10000);
        this.renderer = new THREE.WebGLRenderer( { alpha: true } );

        this.camera.position.y = 0;
        this.camera.position.z = 300;

        this.renderer.setSize( 500, 500 );
        this.renderer.autoClear = false;
        this.element.appendChild(this.renderer.domElement);

        // Add the blob
        this.blob = blob;
        this.scene.add(blob.object);

        this.render();
    };

    this.render = function() {
        requestAnimationFrame(self.render);

        // Animate the blob
        self.blob.animate();

        self.renderer.render(self.scene, self.camera);
    };
}

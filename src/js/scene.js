var THREE = require('three');

module.exports = function(element) {
    var self = this;
    this.element = element;
    this.z = 300;


    //Mapping properties
    this.skew = 0;

    this.positions = [
        //Links boven | Rechts boven |  Links onder |   Rechts onder
        [{x:-1,y:1},        {x:1,y:1},      {x:-1,y:-1},        {x:1,y:-1}],
        [{x:-1,y:1},        {x:1,y:1},      {x:-1,y:-1},        {x:1,y:-1}],
    ]

    this.cameraRTT1;
    this.cameraRTT2;

    this.rtTexture1;
    this.rtTexture2;
    this.rtMaterial1;
    this.rtMaterial2;
    this.rtGeometry = [];

    this.output1;
    this.output2;
    this.sceneRTT = new THREE.Scene();



    // Init the scene camera and lights
    this.init = function(element) {
        // Create the objects
        this.scene = new THREE.Scene();
        this.camera = new THREE.OrthographicCamera(window.innerWidth / - 2, window.innerWidth / 2,window.innerHeight / 2,window.innerHeight / -2, -1000, 10000);
        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true
        });

        //Mapping cameras 1 camera per beamer
        this.cameraRTT1 = new THREE.OrthographicCamera( window.innerWidth / - 2, this.skew, window.innerHeight / 2, window.innerHeight / - 2, -10000, 10000 );
        this.cameraRTT1.position.z = 100;

        this.cameraRTT2 = new THREE.OrthographicCamera( this.skew, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, -10000, 10000 );
        this.cameraRTT2.position.z = 100;

        this.rtTexture1 = new THREE.WebGLRenderTarget( window.innerWidth * 2, window.innerHeight * 2, { minFilter: THREE.LinearFilter, magFilter: THREE.NearestFilter, format: THREE.RGBFormat } );
        this.rtTexture2 = new THREE.WebGLRenderTarget( window.innerWidth * 2, window.innerHeight * 2, { minFilter: THREE.LinearFilter, magFilter: THREE.NearestFilter, format: THREE.RGBFormat } );


        this.rtGeometry[0] = new THREE.PlaneGeometry(window.innerWidth / 2,window.innerHeight);
        this.rtGeometry[1] = new THREE.PlaneGeometry(window.innerWidth / 2,window.innerHeight);


        for(var x = 0; x < this.rtGeometry.length; x++){
            for(var i = 0; i < this.rtGeometry[x].vertices.length; i++) {
                this.rtGeometry[x].vertices[i].x = this.positions[x][i].x * (window.innerWidth / 4);
                this.rtGeometry[x].vertices[i].y = this.positions[x][i].y * (window.innerHeight / 2);
            }
            this.rtGeometry[x].verticesNeedUpdate = true;
        }


        this.rtMaterial1 = new THREE.MeshBasicMaterial( { color: 0xffffff,map:this.rtTexture1} );
        this.rtMaterial2 = new THREE.MeshBasicMaterial( { color: 0xffffff,map:this.rtTexture2} );

        this.output1 = new THREE.Mesh( this.rtGeometry[0], this.rtMaterial1 );
        this.output2 = new THREE.Mesh( this.rtGeometry[1], this.rtMaterial2 );

        this.sceneRTT.add( this.output1 );
        this.sceneRTT.add( this.output2 );

        this.output1.position.set(-window.innerWidth / 4,0,0)
        this.output2.position.set(window.innerWidth / 4,0,0)


        // Append the scene to the body
        this.renderer.shadowMapEnabled = true;
        this.renderer.setSize( window.innerWidth, window.innerHeight );
        this.renderer.autoClear = false;
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
        this.camera.position.z = this.z;

        // Add lights to the scene
        this.scene.add(this.ambient);
        this.scene.add(this.light);

    };

    // Resize the canvas
    this.resize = function(width, height) {
        this.camera.aspect = width / height;
        this.renderer.setSize(width, height);
        this.camera.updateProjectionMatrix();

        this.recalculateVrRegion();
    };

    this.recalculateVrRegion = function() {
        window.vrRegionX = Math.abs(this.camera.right);
        window.vrRegionY = Math.abs(this.camera.bottom);
    };

    // Add object to the scene
    this.add = function(obj) {
        this.scene.add(obj);
    };

    // Render the scene
    this.render = function() {
        //self.renderer.setClearColor(new THREE.Color().setRGB( 0, 0, 1 ));
        self.renderer.render( self.scene, self.cameraRTT1, self.rtTexture1, true );

        //self.renderer.setClearColor(new THREE.Color().setRGB( 0.5, 0.9, 0.4 ));
        self.renderer.render( self.scene, self.cameraRTT2, self.rtTexture2, true );

        self.renderer.render(self.sceneRTT, self.camera);
    };

    this.init(element);
}

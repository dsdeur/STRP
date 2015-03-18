module.exports = function() {

	var container, stats;

	var cameraRTT1,cameraRTT2, camera, sceneRTT1,sceneRTT2, scene, renderer;

	var rtTexture1,rtTexture2, material;

	var output1,output2;


	var blobs = [];
	var geometry = [];

	var positions = [
		//Links onder | Rechts onder |  Links boven |   Rechts boven
		[{x:-0.5,y:0.8},		{x:1,y:1},		{x:-1,y:-1},		{x:1,y:-1}],
		[{x:-1,y:1},		{x:1,y:1},		{x:-1,y:-1},		{x:1,y:-1}],
	]

	var skew = 300;


	init();


	function init() {

		container = document.getElementById( 'container' );

		camera = new THREE.OrthographicCamera( window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, -10000, 10000 );
		camera.position.z = 100;

		cameraRTT1 = new THREE.OrthographicCamera( window.innerWidth / - 2, skew, window.innerHeight / 2, window.innerHeight / - 2, -10000, 10000 );
		cameraRTT1.position.z = 100;

		cameraRTT2 = new THREE.OrthographicCamera( skew, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, -10000, 10000 );
		cameraRTT2.position.z = 100;



		scene = new THREE.Scene();
		sceneRTT1 = new THREE.Scene();

		var light = new THREE.DirectionalLight( 0xffffff );
		light.position.set( 0, 0, 1 ).normalize();
		sceneRTT1.add( light );

		light = new THREE.DirectionalLight( 0xffffff, 1.5 );
		light.position.set( 0, 0, -1 ).normalize();
		sceneRTT1.add( light );

		light = new THREE.DirectionalLight( 0xffaaaa, 1.5 );
		light.position.set( 0, 0, -1 ).normalize();
		scene.add( light );



		rtTexture1 = new THREE.WebGLRenderTarget( window.innerWidth * 2, window.innerHeight * 2, { minFilter: THREE.LinearFilter, magFilter: THREE.NearestFilter, format: THREE.RGBFormat } );
		rtTexture2 = new THREE.WebGLRenderTarget( window.innerWidth * 2, window.innerHeight * 2, { minFilter: THREE.LinearFilter, magFilter: THREE.NearestFilter, format: THREE.RGBFormat } );


		for(var i = 0; i < 100; i++){
			blobs[i] = new Blob({scene:[sceneRTT1],radius:50,position:new THREE.Vector3(Math.random() * window.innerWidth - window.innerWidth / 2,Math.random() * window.innerHeight - window.innerHeight / 2,0)})
		}


		geometry[0] = new THREE.PlaneGeometry(window.innerWidth / 2,window.innerHeight);
		geometry[1] = new THREE.PlaneGeometry(window.innerWidth / 2,window.innerHeight);


		for(var x = 0; x < geometry.length; x++){
			for(var i = 0; i < geometry[x].vertices.length; i++) {
	       		geometry[x].vertices[i].x = positions[x][i].x * (window.innerWidth / 4);
	        	geometry[x].vertices[i].y = positions[x][i].y * (window.innerHeight / 2);
	    	}
	    	geometry[x].verticesNeedUpdate = true;
		}


		var material1 = new THREE.MeshBasicMaterial( { color: 0xffffff,map:rtTexture1} );
		var material2 = new THREE.MeshBasicMaterial( { color: 0xffffff,map:rtTexture2} );

		output1 = new THREE.Mesh( geometry[0], material1 );
		output2 = new THREE.Mesh( geometry[1], material2 );

		scene.add( output1 );
		scene.add( output2 );

		output1.position.set(-window.innerWidth / 4,0,0)
		output2.position.set(window.innerWidth / 4,0,0)


		renderer = new THREE.WebGLRenderer({clearColor:0x333333,antialias:true});

		renderer.setSize( window.innerWidth, window.innerHeight );
		renderer.autoClear = false;
		container.appendChild( renderer.domElement );

		stats = new Stats();
		stats.domElement.style.position = 'absolute';
		stats.domElement.style.top = '0px';
		container.appendChild( stats.domElement );


		render();

	}


	function render() {


		requestAnimationFrame( render );

		renderer.clear();

		renderer.setClearColor(new THREE.Color().setRGB( 1, 1, 1 ));

		// Render first scene into texture
		renderer.render( sceneRTT1, cameraRTT1, rtTexture1, true );

		renderer.setClearColor(new THREE.Color().setRGB( 0.5, 0.9, 0.4 ));

		renderer.render( sceneRTT1, cameraRTT2, rtTexture2, true );


		renderer.setClearColor(new THREE.Color().setRGB( 0.0, 0.0, 0.0 ));
		// Render second scene to screen
		// (using first scene as regular texture)
		renderer.render( scene, camera );

		stats.update();

	}
};

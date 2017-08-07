﻿    var scene, renderer, camera, light;
    var t;
    var s = str;

    function init() {
        scene = new THREE.Scene();

        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(800, 600);

        light = new THREE.PointLight({ color: 0xff0000 });
        light.position.set(100, 500, 0);
        scene.add(light);



        camera = new THREE.PerspectiveCamera(40, 400 / 300, 1, 1000);
        camera.position.set(100, 800, 100);
        camera.lookAt(scene.position);




        renderer.setClearColor(0xffffff);

        document.getElementById("main").appendChild(renderer.domElement);
        renderer.render(scene, camera);

        t = new squareScene(500, 500, scene);

       


    }

    document.addEventListener('mousedown', onMouseDown, false);


    function onMouseDown(e) {
        event.preventDefault();

        var vector = new THREE.Vector3(
            (event.clientX / window.innerWidth) * 2 - 1,
            - (event.clientY / window.innerHeight) * 2 + 1,
            0.5
        );
        projector.unprojectVector(vector, camera);

        var ray = new THREE.Ray(camera.position,
            vector.subSelf(camera.position).normalize());

        var intersects = ray.intersectObjects(objects);

        if (intersects.length > 0) {

            intersects[0].object.materials[0].color.setHex(Math.random() * 0xffffff);

            var particle = new THREE.Particle(particleMaterial);
            particle.position = intersects[0].point;
            particle.scale.x = particle.scale.y = 8;
            scene.add(particle);

        }

    /*
    // Parse all the faces
    for ( var i in intersects ) {
        intersects[ i ].face.material[ 0 ].color
            .setHex( Math.random() * 0xffffff | 0x80000000 );
    }
    */
    }

    init();
    animate();

    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }
   


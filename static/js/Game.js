console.log("Wczytano plik Game.js")

class Game {

    constructor() {
        ui.clicks()
        this.szachownica = [

            [1, 0, 1, 0, 1, 0, 1, 0],
            [0, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 0],
            [0, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 0],
            [0, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 0],
            [0, 1, 0, 1, 0, 1, 0, 1],

        ];
        this.plansza()

    }

    plansza() {
        var x = window.innerWidth
        var y = window.innerHeight
        var scene = new THREE.Scene();
        var camera = new THREE.PerspectiveCamera(
            60,    // kąt patrzenia kamery (FOV - field of view)
            x / y,    // proporcje widoku, powinny odpowiadać proporjom naszego ekranu przeglądarki
            0.1,    // minimalna renderowana odległość
            10000    // maxymalna renderowana odległość od kamery 
        );
        var renderer = new THREE.WebGLRenderer();
        renderer.setClearColor(0xfcffff);
        var axes = new THREE.AxesHelper(1000)
        scene.add(axes)
        $("#root").append(renderer.domElement)
        camera.position.set(100, 100, 100)
        camera.lookAt(scene.position);
        var geometry = new THREE.BoxGeometry(20, 20, 20)
        var material = new THREE.MeshBasicMaterial({
            color: 0x21ff12,
            side: THREE.DoubleSide,
            wireframe: false,
            transparent: true,
            opacity: 0.6,
        });

        var cube = new THREE.Mesh(geometry, material);
        cube.position.set(-80, 0, -80)
        var y = -80
        for (let i = 0; i < 8; i++) {
            var x = -80
            for (let j = 0; j < 8; j++) {
                var clone = new THREE.Mesh(geometry, material);
                clone.position.set(x, 0, y)
                if (this.szachownica[i][j] == 1)
                    clone.material.color.setHex(0x000000);
                x += 20
                scene.add(clone)
            }
            y += 20
        }

        $("#root").append(renderer.domElement)
        camera.position.set(100, 100, 100)
        camera.lookAt(scene.position);
        function render() {
            var x = window.innerWidth
            var y = window.innerHeight
            renderer.setSize(x, y)
            requestAnimationFrame(render);
            console.log("render leci")
            renderer.render(scene, camera);
        }
        render();
    }
}

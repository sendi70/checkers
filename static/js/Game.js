console.log("Wczytano plik Game.js")

class Game {
    constructor() {
        this.camera;
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
        this.pionki = [
            [2, 0, 2, 0, 2, 0, 2, 0],
            [0, 2, 0, 2, 0, 2, 0, 2],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [1, 0, 1, 0, 1, 0, 1, 0],
            [0, 1, 0, 1, 0, 1, 0, 1],
        ];
        this.canvas()
    }


    //TWORZENIE OTOCZENIA I SCENY
    canvas() {
        var x = window.innerWidth
        var y = window.innerHeight
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(
            90, // kąt patrzenia kamery (FOV - field of view)
            x / y, // proporcje widoku, powinny odpowiadać proporjom naszego ekranu przeglądarki
            0.1, // minimalna renderowana odległość
            10000 // maxymalna renderowana odległość od kamery 
        );
        this.camera.position.set(0, 150, 0)
        this.camera.lookAt(this.scene.position);
        var renderer = new THREE.WebGLRenderer();
        renderer.setClearColor(0x252525);
        var axes = new THREE.AxesHelper(1000)
        this.scene.add(axes)
        $("#root").append(renderer.domElement)
        var that = this

        function render() {
            var x = window.innerWidth
            var y = window.innerHeight
            renderer.setSize(x, y)
            that.camera.aspect = x / y
            that.camera.updateProjectionMatrix()
            requestAnimationFrame(render);
            console.log("render leci")
            renderer.render(that.scene, that.camera);
        }
        $("#root").append(renderer.domElement)
        render();
        this.plansza(this.scene)
    }

    //TWORZENIE PLANSZY
    plansza(a) {
        var geometry = new THREE.BoxGeometry(20, 10, 20)
        var bright_material = [];
        for (let i = 0; i < 6; i++) {
            bright_material.push(new THREE.MeshBasicMaterial({
                side: THREE.DoubleSide,
                map: new THREE.TextureLoader().load('img/bright.jpg')
            }));
        }

        var dark_material = [];
        for (let i = 0; i < 6; i++) {
            dark_material.push(new THREE.MeshBasicMaterial({
                side: THREE.DoubleSide,
                map: new THREE.TextureLoader().load('img/dark.jpg')
            }));
        }

        var black = new THREE.Mesh(geometry, bright_material);
        var dark = new THREE.Mesh(geometry, dark_material);
        var y = -70
        for (let i = 0; i < 8; i++) {
            var x = -70
            for (let j = 0; j < 8; j++) {
                if (this.szachownica[i][j] == 1) {
                    var clone = black.clone()
                    clone.position.set(x, 0, y)
                } else {
                    var clone = dark.clone()
                    clone.position.set(x, 0, y)
                }
                x += 20
                a.add(clone)
            }
            y += 20
        }
    }

    //TWORZENIE PIONKOW
    pion() {
        var geometry = new THREE.CylinderGeometry(8, 8, 5, 100)

        var black_material = [];
        for (let i = 0; i < 6; i++) {
            black_material.push(new THREE.MeshBasicMaterial({
                side: THREE.DoubleSide,
                map: new THREE.TextureLoader().load('img/black.jpg')
            }));
        }

        var white_material = [];
        for (let i = 0; i < 6; i++) {
            white_material.push(new THREE.MeshBasicMaterial({
                side: THREE.DoubleSide,
                map: new THREE.TextureLoader().load('img/white.jpg')
            }));
        }

        var black = new THREE.Mesh(geometry, black_material);
        var white = new THREE.Mesh(geometry, white_material);
        var y = -70
        for (let i = 0; i < 8; i++) {
            var x = -70
            for (let j = 0; j < 8; j++) {
                if (this.pionki[i][j] == 2) {
                    var clone = black.clone()
                    clone.position.set(x, 8, y)
                } else if (this.pionki[i][j] == 1) {
                    var clone = white.clone()
                    clone.position.set(x, 8, y)
                }
                x += 20
                this.scene.add(clone)
            }
            y += 20
        }
    }

    //ZMIANA PERSPEKTYWY W ZALEZNOSCI OD GRACZA
    camera_change(a) {
        this.camera.position.set(0, 80, 120 * a)
        this.camera.lookAt(this.scene.position);
    }
}
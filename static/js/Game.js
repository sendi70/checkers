console.log("Wczytano plik Game.js")

class Game {
    constructor() {
        this.scene = null
        this.gracz = null
        this.camera;
        this.raycaster = new THREE.Raycaster(); // obiekt symulujący "rzucanie" promieni
        this.mouseVector = new THREE.Vector2() // ten wektor
        this.choose_material = []
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
        this.pionkiTab = [];
        this.canvas()
        //this.raycast()
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
        //var axes = new THREE.AxesHelper(1000)
        //this.scene.add(axes)
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
                map: new THREE.TextureLoader().load('img/bright.jpg'),
                name: "bright"
            }));
        }

        var dark_material = [];
        for (let i = 0; i < 6; i++) {
            dark_material.push(new THREE.MeshBasicMaterial({
                side: THREE.DoubleSide,
                map: new THREE.TextureLoader().load('img/dark.jpg'),
                name: "dark"
            }));
        }
        for (let i = 0; i < 3; i++) {
            this.choose_material.push(new THREE.MeshBasicMaterial({
                side: THREE.DoubleSide,
                map: new THREE.TextureLoader().load('img/red.jpg')

            }));
        }

        var black = new THREE.Mesh(geometry, bright_material);
        var dark = new THREE.Mesh(geometry, dark_material);
        var y = 0
        for (let i = 0; i < 8; i++) {
            var x = 0
            for (let j = 0; j < 8; j++) {
                if (this.szachownica[i][j] == 1) {
                    var clone = black.clone()
                    clone.name = "" + i + j
                    clone.x = x
                    clone.y = y
                    clone.position.set(-70 + x * 20, 0, -70 + y * 20)
                } else {
                    var clone = dark.clone()
                    clone.name = "" + i + j
                    clone.x = x
                    clone.y = y
                    clone.position.set(-70 + x * 20, 0, -70 + y * 20)
                }
                x += 1
                a.add(clone)
            }
            y += 1
        }
    }

    //TWORZENIE PIONKOW
    pion() {
        this.raycast()
        var y = 0
        for (let i = 0; i < 8; i++) {
            var x = 0
            for (let j = 0; j < 8; j++) {
                var pionek = new Pionek()
                console.log(pionek)
                if (this.pionki[i][j] == 2) {
                    pionek.color = "black"
                    pionek.position_x = x
                    pionek.position_y = y
                    this.pionkiTab.push(pionek.pioneczek)
                    this.scene.add(pionek.pioneczek)
                } else if (this.pionki[i][j] == 1) {
                    pionek.color = "white"
                    pionek.position_x = x
                    pionek.position_y = y
                    this.scene.add(pionek.pioneczek)
                    this.pionkiTab.push(pionek.pioneczek)
                }
                //this.pionkiTab[i][j] = null
                console.log(pionek.pioneczek)
                x += 1

            }
            y += 1
        }
    }

    //ZMIANA PERSPEKTYWY W ZALEZNOSCI OD GRACZA
    camera_change(a) {
        this.gracz = a
        console.log(this.gracz)
        this.camera.position.set(0, 80, 120 * a)
        this.camera.lookAt(this.scene.position);
    }

    raycast() {
        var that = this
        var zaznaczony = null
        $(document).mousedown(function (event) {
            that.mouseVector.x = (event.clientX / $(window).width()) * 2 - 1;
            that.mouseVector.y = -(event.clientY / $(window).height()) * 2 + 1;
            that.raycaster.setFromCamera(that.mouseVector, that.camera);
            var intersects = that.raycaster.intersectObjects(that.scene.children);
            if (intersects.length > 0) {
                console.log(intersects[0].object.y);
                if (intersects[0].object.geometry.type == "CylinderGeometry") {
                    console.log(zaznaczony)
                    if (that.gracz != 1 && intersects[0].object.name == "black") {
                        intersects[0].object.material = new THREE.MeshBasicMaterial({
                            side: THREE.DoubleSide,
                            map: new THREE.TextureLoader().load('img/red.jpg')
                        });
                        if (zaznaczony != undefined) {
                            zaznaczony.material = pionek.black_material
                            zaznaczony = undefined
                        }
                        zaznaczony = intersects[0].object
                    } else if (that.gracz == 1 && intersects[0].object.name == "white") {
                        intersects[0].object.material = new THREE.MeshBasicMaterial({
                            side: THREE.DoubleSide,
                            map: new THREE.TextureLoader().load('img/red.jpg')
                        });
                        if (zaznaczony != undefined) {
                            zaznaczony.material = pionek.white_material
                            zaznaczony = undefined
                        }
                        zaznaczony = intersects[0].object
                    }
                }
            }
            if (intersects[0].object.geometry.type == "BoxGeometry" && zaznaczony != undefined && intersects[0].object.material[0].name == "bright") {
                console.log(zaznaczony)
                var x = intersects[0].object.x
                var y = 8
                var z = intersects[0].object.y
                console.log(x, 0, z)
                zaznaczony.position.set(-70 + x * 20, y, -70 + z * 20)
                that.pionki[zaznaczony.y][zaznaczony.x] = 0
                zaznaczony.x = x
                zaznaczony.y = z
                if (zaznaczony.name == "white") {
                    that.pionki[zaznaczony.y][zaznaczony.x] = 1
                    zaznaczony.material = pionek.white_material
                } else {
                    zaznaczony.material = pionek.black_material
                    that.pionki[zaznaczony.y][zaznaczony.x] = 2
                }
                zaznaczony = undefined
                console.log(that.pionki)
                document.getElementById("tablica").innerHTML = ""
                for (let i = 0; i < 8; i++) {
                    for (let j = 0; j < 8; j++) {
                        document.getElementById("tablica").innerHTML += that.pionki[i][j] + "  "
                    }
                    document.getElementById("tablica").innerHTML += '</br>'
                }
                net.aktualizuj(that.pionki)
            }

        })

    }
    odliczaj(n) {
        n--;
        var s = n % 60;
        var m = Math.floor((n % 3600) / 60);
        var g = Math.floor(n / 3600);
        if (n == 0) {
            document.getElementById('zegar').innerHTML = '';
        } else {
            document.getElementById('zegar').innerHTML = '' + g + ':' + ((m < 10) ? '0' + m : m) + ':' + ((s < 10) ? '0' + s : s);
            if (n >= 0)
                setTimeout("odliczaj(" + n + ")", 1000);
        }
    }

}
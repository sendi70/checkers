class Pionek extends THREE.Mesh {
    constructor() {
        super()
        this._mname = ""
        this._x = 0
        this._y = 0
        this.black_material = [];
        this.white_material = [];
        this.choose_material = [];
        this.geometry = new THREE.CylinderGeometry(8, 8, 5, 100)
        console.log("constructor", Date.now())
        this.materialy()
    }

    //USTAWIAM KOLOR
    set mname(name) {
        this._name = name
    }
    //USTAWIAM POZYCJE
    set position_x(x) {
        this._x = x
    }
    //USTAWIAM POZYCJE
    set position_y(y) {
        this._y = y
    }
    get y() {
        return this._y
    }
    get x() {
        return this._x
    }

    //ZWRACAM PIONEK
    get pioneczek() {

        if (this.color == "white") {
            var white = new THREE.Mesh(this.geometry, this.white_material);
            white.position.set(-70 + this._x * 20, 8, -70 + this._y * 20)
            white.name = "white"
            white.x = this.x
            white.y = this.y
            return white
        }
        if (this.color == "black") {
            var black = new THREE.Mesh(this.geometry, this.black_material);
            black.position.set(-70 + this._x * 20, 8, -70 + this._y * 20)
            black.name = "black"
            black.x = this.x
            black.y = this.y
            return black
        }
        // return this._marka.toUpperCase()

    }

    //WYPELNIAM TEKSTURY
    materialy() {
        for (let i = 0; i < 3; i++) {
            this.black_material.push(new THREE.MeshBasicMaterial({
                side: THREE.DoubleSide,
                map: new THREE.TextureLoader().load('img/black.jpg')
            }));
        }

        for (let i = 0; i < 3; i++) {
            this.white_material.push(new THREE.MeshBasicMaterial({
                side: THREE.DoubleSide,
                map: new THREE.TextureLoader().load('img/white.jpg')
            }));
        }
        for (let i = 0; i < 3; i++) {
            this.choose_material.push(new THREE.MeshBasicMaterial({
                side: THREE.DoubleSide,
                map: new THREE.TextureLoader().load('img/red.jpg')
            }));
        }
    }

}
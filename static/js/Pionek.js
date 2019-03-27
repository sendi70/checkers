class Pionek {
    constructor() {
        this._color = ""
        this._x = 0
        this._y = 0
        this.black_material = [];
        this.white_material = [];
        this.geometry = new THREE.CylinderGeometry(8, 8, 5, 100)
        console.log("constructor", Date.now())
        this.materialy()
    }


    set col(color) {
        this._color = color
    }
    set position_x(x) {
        this._x = x
    }
    set position_y(y) {
        this._y = y
    }
    get pioneczek() {

        if (this.color == "white") {
            var white = new THREE.Mesh(this.geometry, this.white_material);
            white.position.set(this._x, 8, this._y)
            return white
        }
        if (this.color == "black") {
            var black = new THREE.Mesh(this.geometry, this.black_material);
            black.position.set(this._x, 8, this._y)
            return black
        }
        // return this._marka.toUpperCase()

    }


    materialy() {
        for (let i = 0; i < 6; i++) {
            this.black_material.push(new THREE.MeshBasicMaterial({
                side: THREE.DoubleSide,
                map: new THREE.TextureLoader().load('img/black.jpg')
            }));
        }

        for (let i = 0; i < 6; i++) {
            this.white_material.push(new THREE.MeshBasicMaterial({
                side: THREE.DoubleSide,
                map: new THREE.TextureLoader().load('img/white.jpg')
            }));
        }
    }

}
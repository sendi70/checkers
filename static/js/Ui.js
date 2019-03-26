console.log("wczytano plik Ui.js")

class Ui {

    constructor() {
        console.log("konstruktor klasy Ui")

    }

    //CLICKI
    clicks(a) {
        console.log("Włączam clicki")
        $("#zaloguj").on("click", a.zaloguj)
        $("#reset").on("click", a.reset)
    }
}
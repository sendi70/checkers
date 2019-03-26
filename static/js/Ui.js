console.log("wczytano plik Ui.js")

class Ui {

    constructor() {
        console.log("konstruktor klasy Ui")

    }
    clicks() {
        console.log("Włączam clicki")
        $("#zaloguj").on("click", net.zaloguj)
    }
}
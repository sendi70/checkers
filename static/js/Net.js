console.log("wczytano plik Net.js")
class Net {

    constructor() {
        console.log("konstruktor klasy Net")
        ui.clicks(this)
        this.myVar = null
    }
    dosth() {
        console.log("xD")
    }

    //LOGOWANIE
    zaloguj() {
        console.log($("#nick").val())
        $.ajax({
            url: "logowanie",
            data: {
                nick: $("#nick").val()
            },
            type: "POST",
            success: function (data) {
                var that = this
                var obj = JSON.parse(data)
                console.log(obj)
                switch (obj.akcja) {
                    case 'Za dużo użytkowników':
                        console.log("xd")
                        $("#nick").value = ""
                        $('#uwagi').text("W grze jest za dużo graczy!")
                        break;
                    case 'dodano użytkownika':
                        if (obj.color == 1) {
                            var color = "biały"
                            net.waiting()
                            game.pion()
                            game.camera_change(obj.color)
                            $('#uwagi').text("Witaj " + obj.users[0].nick + " twój kolor to: " + color)
                        } else {
                            var color = "czarny"
                            net.waiting()
                            game.pion()
                            game.camera_change(obj.color * (-0.5))
                            net.aktualizuj(game.pionki)
                            $('#uwagi').text("Witaj " + obj.users[1].nick + " twój kolor to: " + color)
                        }
                        $("#logowanie").css("display", "none")
                        break;
                }
            },
            error: function (xhr, status, error) {
                console.log(xhr);
            },
        });
    }

    waiting() {
        var myInterval = setInterval(function () {
            $.ajax({
                url: "wait",
                type: "POST",
                success: function (data) {
                    var obj = JSON.parse(data)
                    console.log(obj)
                    if (obj == 1) {
                        $("#overlay").css("display", "block")
                    } else {
                        clearInterval(myInterval)
                        $("#overlay").css("display", "none")
                    }
                },
                error: function (xhr, status, error) {
                    console.log(xhr);
                },
            });
        }, 500)

    }
    //RESETOWANIE GRACZY
    reset() {
        $.ajax({
            url: "usuwanie",
            type: "POST",
            success: function (data) {
                console.log("Usunąłem")
                clearInterval(myVar)
            },
            error: function (xhr, status, error) {
                console.log(xhr);
            },
        });
    }

    aktualizuj(tab) {
        $.ajax({
            url: "aktualizacja",
            type: "POST",
            data: {
                'pionki': JSON.stringify(tab)
            },
            success: function (data) {
                $("#zegar").css("display", "block")
                console.log("Zaktualizowałem")
                net.porownaj()
                $(document).off("mousedown")
                //game.odliczaj(30)

            },
            error: function (xhr, status, error) {
                console.log(xhr);
            },
        });
    }

    porownaj() {
        var myVar = setInterval(function () {
            $.ajax({
                url: "porownaj",
                type: "POST",
                success: function (data) {
                    var dane = JSON.parse(data)
                    if (dane.akcja == "ruch") {
                        game.pionki = JSON.parse(dane.tablica)
                        console.log(dane)
                        clearInterval(myVar)
                        $("#zegar").css("display", "none")

                        console.log(game.scene.children)
                        for (let j = 0; j < game.scene.children.length - 1; j++) {
                            if (game.scene.children[j].name == "black" || game.scene.children[j].name == "white")
                                game.scene.remove(game.scene.children[j])
                        }
                        game.scene.children.forEach(x => {
                            if (x.name == "black" || x.name == "white") {
                                game.scene.remove(x)
                            }
                        });
                        game.scene.children.forEach(x => {
                            if (x.name == "black" || x.name == "white") {
                                game.scene.remove(x)
                            }
                        });
                        game.scene.children.forEach(x => {
                            if (x.name == "black" || x.name == "white") {
                                game.scene.remove(x)
                            }
                        });
                        game.pion()
                    }

                },
                error: function (xhr, status, error) {
                    console.log(xhr);
                },
            });
        }, 1000)
    }
}
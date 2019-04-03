console.log("wczytano plik Net.js")
class Net {

    constructor() {
        console.log("konstruktor klasy Net")
        ui.clicks(this)

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
                            //net.waiting()
                            game.pion()
                            game.camera_change(obj.color)
                        } else {
                            var color = "czarny"
                            //net.waiting()
                            game.pion()
                            game.camera_change(obj.color * (-0.5))
                        }
                        $("#logowanie").css("display", "none")
                        $('#uwagi').text("Witaj " + obj.users[0].nick + " twój kolor to: " + color)
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
            },
            error: function (xhr, status, error) {
                console.log(xhr);
            },
        });
    }
}
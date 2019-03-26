console.log("wczytano plik Net.js")
class Net {

    constructor() {
        console.log("konstruktor klasy Net")
        ui.clicks(this)

    }
    dosth() {
        console.log("xD")
    }
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
                            game.pion()
                            game.camera_change(obj.color)
                        } else {
                            var color = "czarny"
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
}
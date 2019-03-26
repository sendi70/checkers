console.log("wczytano plik Net.js")
class Net {

    constructor() {
        this.a = 0 // użycie zmiennych
        this.b = "biały"
        console.log("konstruktor klasy Net")
    }

    zaloguj() {
        console.log($("#nick").val())
        $.ajax({
            url: "logowanie",
            data: { nick: $("#nick").val() },
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
                        console.log(that.b)
                        $("#logowanie").css("display", "none")
                        if (this.a % 2 != 0)
                            this.b = 'czarny'
                        $('#uwagi').text("Witaj " + obj.users[0].nick + " twój kolor to: " + this.b)
                        break;
                }
            },
            error: function (xhr, status, error) {
                console.log(xhr);
            },
        });
    }
}
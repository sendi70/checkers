var http = require("http");
var fs = require("fs");
var qs = require("querystring")
var zalogowani = {
    users: []
}
var users = []

var server = http.createServer(function (req, res) {
    console.log(req.url)
    switch (req.method) {
        case "GET":
            if (req.url == "/") {
                fs.readFile("static/index.html", function (error, data) {
                    res.writeHead(200, {
                        'Content-Type': 'text/html'
                    });
                    res.write(data);
                    res.end();
                })
            } else if (req.url.indexOf(".css") != -1) {
                fs.readFile("static" + req.url, function (error, data) {
                    res.writeHead(200, {
                        'Content-Type': 'text/css'
                    });
                    res.write(data);
                    res.end();
                })
            } else if (req.url.indexOf(".js") != -1) {
                fs.readFile("static" + req.url, function (error, data) {
                    res.writeHead(200, {
                        'Content-Type': 'aplication/javascript'
                    });
                    res.write(data);
                    res.end();
                })
            } else if (req.url.indexOf(".jpg") != -1) {
                fs.readFile("static" + decodeURI(req.url), function (error, data) {
                    res.writeHead(200, {
                        'Content-Type': 'image/jpeg'
                    });
                    res.write(data);
                    res.end();
                })
            } else if (req.url.indexOf(".png") != -1) {
                fs.readFile("static" + decodeURI(req.url), function (error, data) {
                    res.writeHead(200, {
                        'Content-Type': 'image/png'
                    });
                    res.write(data);
                    res.end();
                })
            } else if (req.url.indexOf(".mp3") != -1) {
                fs.readFile("static" + decodeURI(req.url), function (error, data) {
                    res.writeHead(200, {
                        'Content-Type': 'audio/mpeg'
                    });
                    res.write(data);
                    res.end();
                })
            }
            break;
        case "POST":
            if (req.url == "/logowanie") {
                var dane = ""
                req.on("data", function (data) {
                    dane += data
                })
                req.on("end", function () {
                    var nick = qs.parse(dane)
                    var nick2 = nick.nick
                    if (zalogowani.users.length == 2)
                        zalogowani.akcja = "Za dużo użytkowników"
                    else if (zalogowani.users.findIndex(x => x.nick == nick.nick) != -1)
                        zalogowani.akcja = "Ktoś już ma taki nick :/"
                    else if (zalogowani.users.length < 2) {
                        zalogowani.users.push(nick)
                        zalogowani.color = zalogowani.users.length
                        zalogowani.akcja = "dodano użytkownika"
                    }
                    console.log(zalogowani)
                    res.writeHead(200, {
                        'Content-Type': 'text/plane'
                    })
                    res.end(JSON.stringify(zalogowani))
                })
            }

        default:
            break;
    }
})

server.listen(3000, function () {
    console.log("serwer startuje na porcie 3000")
});
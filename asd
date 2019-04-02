1. serwer - logika logowania - klasa Net() - dokończenie:

- po zalogowaniu pierwszego gracza, musi on wiedzieć kiedy zaloguje się drugi
- zaraz po zalogowaniu pierwszemu wyświetla się informacja "czekam..." 
- oraz za pomocą setInterval() wysyła on na serwer zapytanie ajaxem co 500ms, sprawdzające czy tablica na serwerze ma jednego czy dwu userów
- jeśli dwu, to ekran oczekiwania znika i dowiadujemy się kto jest zalogowany  

2. zmiany w projekcie

{appDir}
|
|__ static
|   |__ Pionek.js   // klasa Pionka, zwraca cylindrycznego mesha
|
|__ server.js

3. dziedziczenie z klas THREEJS

najlepszy sposób konstrukcji klasy Pionek to taki, gdzie dziedziczymy z Mesha
w takim wypadku obiekt naszej klasy Pionek, z definicji będzie Meshem, bez tworzenia żadnych dodatkowych obiektów

wstaw poniższy skrypty do pustej strony html z załączonym threejs i przyjrzyj się console.log-om i kolejności ich wykonywania

class Pionek extends THREE.Mesh {
    constructor() {
        super() // wywołanie konstruktora klasy z której dziedziczymy czyli z Mesha
        console.log(this)
    }
}

var pionek = new Pionek()
console.log(p.type)

4. gettery/settery w klasach ES6 - jak zapisywać informacje w obiekcie 3D :

wstaw poniższe skrypty do pustej strony html i przyjrzyj się console.log-om i kolejności ich wykonywania

przykładowa klasa Pionek

class Pionek {
    constructor(kolor) {
        this._kolor = kolor
    }

    set kolor(val) {
        console.log("setter")
        this._kolor = val
    }
    get kolor() {
        console.log("getter")
        return this._kolor
    }

}

obiekt klasy Pionek:

var pionek = new Pionek(0xff0000)

pionek.kolor = 0x00ff00 // wywołanie setter-a czyli FUNKCJI kolor z klasy Pionek
console.log(pionek.kolor) // wywołanie gettera czyli FUNKCJI kolor z klasy Pionek
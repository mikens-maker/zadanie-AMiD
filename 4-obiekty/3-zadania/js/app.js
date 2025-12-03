console.log("=== ZADANIE 1 ===");

// Klasa User
class User {
    constructor(nick, name, surname, email, role = "reader") {
        this.nick = nick;
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.role = role;
        this.loginDates = [];
        this.active = true;
    }

    logIn() {
        const loginDate = new Intl.DateTimeFormat('pl-PL', { 
            dateStyle: 'full', 
            timeStyle: 'long' 
        }).format(new Date());
        this.loginDates.push(loginDate);
        console.log(`${this.nick} zalogował się: ${loginDate}`);
    }

    showLoginDates() {
        console.log(`Historia logowań ${this.nick}:`);
        if (this.loginDates.length === 0) {
            console.log("Brak logowań");
        } else {
            this.loginDates.forEach((date, index) => {
                console.log(`${index + 1}. ${date}`);
            });
        }
    }

    showDetails() {
        console.log(`Szczegóły użytkownika ${this.nick}:`);
        for (const key in this) {
            if (typeof this[key] !== 'function') {
                console.log(`${key}: ${this[key]}`);
            }
        }
    }

    toggleActive() {
        this.active = !this.active;
        console.log(`${this.nick} - aktywny: ${this.active}`);
    }
}

// Tworzenie użytkowników
const users = [
    new User("admin123", "Jan", "Kowalski", "jan@example.com", "admin"),
    new User("editor1", "Anna", "Nowak", "anna@example.com", "editor"),
    new User("reader99", "Piotr", "Wiśniewski", "piotr@example.com", "reader")
];

// Testowanie metod
console.log("Testowanie klasy User:");
users[0].logIn();
setTimeout(() => users[0].logIn(), 100); // Kolejne logowanie
users[0].showLoginDates();
users[0].showDetails();
users[0].toggleActive();
users[0].showDetails();

console.log("\n=== ZADANIE 2 ===");

// Tablica z nazwami
const names = [ 
    "Baraka", "Jax", "Johnny Cage", "Kitana", "Kung Lao", 
    "Liu Kang", "Mileena", "Raiden", "Reptile", "Scorpion", 
    "Shang Tsung", "Sub-Zero"
];

// Tablice globalne
let log = [];
let fighters = [];

// Klasa Fighter
class Fighter {
    constructor(name, live = 20, power = 3) {
        this.name = name;
        this.live = live;
        this.power = power;
        this.maxLive = live;
    }

    attack(who) {
        if (Math.random() < 0.5) {
            who.live -= this.power;
            if (who.live < 0) who.live = 0;
            
            const logEntry = `${this.name} atakuje ${who.name}! ${who.name} ma ${who.live} życia.`;
            log.push(logEntry);
            console.log(logEntry);
            return true;
        } else {
            const logEntry = `${this.name} chybił ${who.name}!`;
            log.push(logEntry);
            console.log(logEntry);
            return false;
        }
    }
}

// Funkcja do pobierania losowego wojownika
function getFighter() {
    if (fighters.length === 0) return null;
    
    const randomIndex = Math.floor(Math.random() * fighters.length);
    const fighter = fighters[randomIndex];
    fighters.splice(randomIndex, 1); // Usuwamy z puli dostępnych
    return fighter;
}

// Inicjalizacja wojowników
names.forEach(name => {
    fighters.push(new Fighter(name, 20, 3));
});

console.log(`Stworzono ${fighters.length} wojowników`);

// Zmienne dla aktualnych walczących
let leftFighter = null;
let rightFighter = null;
let round = 1;

// Symulacja walki
function fightRound() {
    if (!leftFighter || !rightFighter) {
        console.log("Nie można rozpocząć walki - brak wojowników!");
        return false;
    }

    console.log(`\n=== RUNDA ${round} ===`);
    console.log(`${leftFighter.name} (${leftFighter.live} HP) vs ${rightFighter.name} (${rightFighter.live} HP)`);

    // Losowanie kto zaczyna
    if (Math.random() < 0.5) {
        leftFighter.attack(rightFighter);
        if (rightFighter.live > 0) {
            rightFighter.attack(leftFighter);
        }
    } else {
        rightFighter.attack(leftFighter);
        if (leftFighter.live > 0) {
            leftFighter.attack(rightFighter);
        }
    }

    // Sprawdzenie czy ktoś przegrał
    if (leftFighter.live <= 0) {
        console.log(`${leftFighter.name} został pokonany!`);
        log.push(`${leftFighter.name} został pokonany przez ${rightFighter.name}!`);
        leftFighter = null;
        rightFighter.live = rightFighter.maxLive; // Przywrócenie życia
    }

    if (rightFighter.live <= 0) {
        console.log(`${rightFighter.name} został pokonany!`);
        log.push(`${rightFighter.name} został pokonany przez ${leftFighter.name}!`);
        rightFighter = null;
        if (leftFighter) leftFighter.live = leftFighter.maxLive; // Przywrócenie życia
    }

    round++;
    return true;
}

// Główna pętla turnieju
function tournamentLoop() {
    console.clear();
    
    // Wyświetlanie loga
    console.log("=== TURNIEJ MORTAL KOMBAT ===");
    console.log(`Pozostało wojowników: ${fighters.length}`);
    console.log(`Aktualni walczący: ${leftFighter ? leftFighter.name : 'brak'} vs ${rightFighter ? rightFighter.name : 'brak'}`);
    console.log("--- Historia walk ---");
    log.slice(-5).forEach(entry => console.log(entry)); // Ostatnie 5 wpisów

    // Sprawdzenie czy mamy zwycięzcę
    if (fighters.length === 0 && !leftFighter && !rightFighter) {
        console.log("\n=== KONIEC TURNIEJU ===");
        console.log("Wszyscy wojownicy zostali pokonani!");
        return false;
    }

    if (fighters.length === 0 && leftFighter && !rightFighter) {
        console.log("\n=== KONIEC TURNIEJU ===");
        console.log(`🏆 ZWYCIĘZCA: ${leftFighter.name}! 🏆`);
        return false;
    }

    if (fighters.length === 0 && !leftFighter && rightFighter) {
        console.log("\n=== KONIEC TURNIEJU ===");
        console.log(`🏆 ZWYCIĘZCA: ${rightFighter.name}! 🏆`);
        return false;
    }

    // Wybieranie nowych wojowników jeśli potrzeba
    if (!leftFighter && fighters.length > 0) {
        leftFighter = getFighter();
        console.log(`Nowy wojownik po lewej: ${leftFighter.name}`);
    }

    if (!rightFighter && fighters.length > 0) {
        rightFighter = getFighter();
        console.log(`Nowy wojownik po prawej: ${rightFighter.name}`);
    }

    // Jeśli mamy dwóch wojowników, walczymy
    if (leftFighter && rightFighter) {
        fightRound();
    }

    // Kontynuacja jeśli nie ma zwycięzcy
    setTimeout(() => tournamentLoop(), 2000);
}

// Rozpoczęcie turnieju
console.log("Rozpoczynam turniej Mortal Kombat!");
setTimeout(() => tournamentLoop(), 1000);

console.log("\n=== ZADANIE 3 ===");

// Rozszerzenie String o metodę sortText
String.prototype.sortText = function(char = ' ') {
    const parts = this.split(char);
    parts.sort();
    return parts.join(char);
};

// Test
const testText1 = "Marcin-Ania-Piotrek-Beata";
console.log(`Przed sortowaniem: ${testText1}`);
console.log(`Po sortowaniu: ${testText1.sortText('-')}`);

const testText2 = "banana apple cherry date";
console.log(`Przed sortowaniem: ${testText2}`);
console.log(`Po sortowaniu: ${testText2.sortText(' ')}`);

console.log("\n=== ZADANIE 4 ===");

// Rozszerzenie String o metodę reverse
String.prototype.reverse = function() {
    return this.split('').reverse().join('');
};

// Test
const testText3 = "Ala ma kota";
console.log(`Przed: ${testText3}`);
console.log(`Po: ${testText3.reverse()}`);

const testText4 = "Kajak";
console.log(`Przed: ${testText4}`);
console.log(`Po: ${testText4.reverse()}`);
console.log(`Czy to palindrom? ${testText4.toLowerCase() === testText4.toLowerCase().reverse()}`);

console.log("\n=== ZADANIE 5 ===");

// Rozszerzenie Array o metodę sum
Array.prototype.sum = function() {
    return this.reduce((total, num) => total + num, 0);
};

// Rozszerzenie Array o metodę sortNr
Array.prototype.sortNr = function() {
    return [...this].sort((a, b) => a - b);
};

// Test metody sum
const testArray1 = [1, 2, 3, 4, 5];
console.log(`Tablica: ${testArray1}`);
console.log(`Suma: ${testArray1.sum()}`);

const testArray2 = [10.5, 20.3, 5.2];
console.log(`Tablica: ${testArray2}`);
console.log(`Suma: ${testArray2.sum()}`);

// Test metody sortNr
const testArray3 = [1, 1.2, 11, 22, 2.1];
console.log(`\nPrzed sortowaniem: ${testArray3}`);
console.log(`Po sortowaniu: ${testArray3.sortNr()}`);

const testArray4 = [100, 5, 50, 0.5, 25];
console.log(`Przed sortowaniem: ${testArray4}`);
console.log(`Po sortowaniu: ${testArray4.sortNr()}`);

// Test poprawności - oryginalna tablica nie zmieniona
const originalArray = [3, 1, 2];
const sortedArray = originalArray.sortNr();
console.log(`\nOryginalna tablica: ${originalArray}`);
console.log(`Posortowana kopia: ${sortedArray}`);
console.log(`Czy to różne tablice? ${originalArray !== sortedArray}`);

console.log("\n=== DODATKOWE TESTY ===");

// Test wszystkich metod razem
console.log("Test wszystkich zadań:");

// Zadanie 1
const testUser = new User("test", "Test", "Testowy", "test@example.com");
testUser.logIn();
testUser.showDetails();

// Zadanie 3
console.log(`Sortowanie: "dog-cat-bird-anteater" -> "${"dog-cat-bird-anteater".sortText('-')}"`);

// Zadanie 4
console.log(`Odwracanie: "hello" -> "${"hello".reverse()}"`);

// Zadanie 5
const numbers = [5, 3, 8, 1];
console.log(`Tablica ${numbers} - suma: ${numbers.sum()}, posortowana: ${numbers.sortNr()}`);
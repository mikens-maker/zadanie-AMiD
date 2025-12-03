console.log("=== ZADANIE 1 ===");

// Obiekt rectangle
const rectangle = {
    height: 10,
    width: 20,
    showArea: function() {
        return this.height * this.width;
    }
};

// Obiekt circle
const circle = {
    radius: 5,
    showArea: function() {
        return Math.PI * Math.pow(this.radius, 2);
    }
};

console.log(rectangle);
console.log(circle);

console.log(`Kwadrat ma szerokość ${rectangle.width} i wysokość ${rectangle.height}`);
console.log(`Jego pole to ${rectangle.showArea()}`);

console.log(`Koło ma promień ${circle.radius}`);
console.log(`Jego pole to ${circle.showArea().toFixed(2)}`);

console.log("\n=== ZADANIE 2 ===");

// Obiekt currentUser
const currentUser = {
    name: "Jan",
    surname: "Kowalski",
    email: "jan.kowalski@example.com",
    www: "https://jankowalski.pl",
    userType: "admin",
    isActive: true,
    
    show: function() {
        console.log("Dane użytkownika:");
        console.log(`Imię: ${this.name}`);
        console.log(`Nazwisko: ${this.surname}`);
        console.log(`Email: ${this.email}`);
        console.log(`WWW: ${this.www}`);
        console.log(`Typ użytkownika: ${this.userType}`);
        console.log(`Aktywny: ${this.isActive}`);
    },
    
    setActive: function(active) {
        this.isActive = active;
        console.log(`Status aktywności zmieniony na: ${active}`);
    }
};

currentUser.show();
currentUser.setActive(false);
currentUser.show();

console.log("\n=== ZADANIE 3 ===");

// Obiekt book
const book = {
    title: "Wiedźmin",
    author: "Andrzej Sapkowski",
    pageCount: 320,
    publisher: "SuperNowa",
    
    showDetails: function() {
        console.log("Metoda 1: for...in");
        for (const key in this) {
            if (typeof this[key] !== 'function') {
                console.log(`${key}: ${this[key]}`);
            }
        }
        
        console.log("\nMetoda 2: Object.keys()");
        Object.keys(this).forEach(key => {
            if (typeof this[key] !== 'function') {
                console.log(`${key}: ${this[key]}`);
            }
        });
        
        console.log("\nMetoda 3: Object.values()");
        Object.entries(this).forEach(([key, value]) => {
            if (typeof value !== 'function') {
                console.log(`${key}: ${value}`);
            }
        });
        
        console.log("\nMetoda 4: Object.entries()");
        Object.entries(this).forEach(([key, value]) => {
            if (typeof value !== 'function') {
                console.log(`${key}: ${value}`);
            }
        });
    }
};

book.showDetails();

console.log("\n=== ZADANIE 4 ===");

// Obiekt spaceShip
const spaceShip = {
    name: "Enterprise",
    currentLocation: "Earth",
    flyDistance: 0,
    
    flyTo: function(place, distance) {
        this.currentLocation = place;
        this.flyDistance += distance;
        console.log(`Statek ${this.name} poleciał do ${place} (dystans: ${distance} km)`);
    },
    
    showInfo: function() {
        console.log(`
Informacje o statku:
----
Statek ${this.name}
doleciał do miejsca ${this.currentLocation}
Statek przeleciał już całkowity dystans ${this.flyDistance} km
        `);
    },
    
    meetClingon: function() {
        let positiveResults = 0;
        const totalRolls = 100;
        
        for (let i = 0; i < totalRolls; i++) {
            if (Math.random() > 0.5) {
                positiveResults++;
            }
        }
        
        const message = `Statek ${this.name} będący w okolicy ${this.currentLocation} `;
        
        if (positiveResults >= totalRolls / 2) {
            console.log(message + "zwycięsko wyszedł ze spotkania z Klingonami");
        } else {
            console.warn(message + "został pokonany przez Klingonów");
        }
    }
};

spaceShip.showInfo();
spaceShip.flyTo("Mars", 225000000);
spaceShip.flyTo("Jupiter", 550000000);
spaceShip.showInfo();
spaceShip.meetClingon();

console.log("\n=== ZADANIE 5 ===");

// Obiekt book (inny niż w zadaniu 3)
const phoneBook = {
    users: [],
    
    addUser: function(name, age, phone) {
        const newUser = {
            name: name,
            age: age,
            phone: phone
        };
        this.users.push(newUser);
        console.log(`Dodano użytkownika: ${name}`);
    },
    
    showUsers: function() {
        console.log("Wszyscy użytkownicy w książce:");
        this.users.forEach((user, index) => {
            console.log(`${index + 1}. ${user.name}, ${user.age} lat, tel: ${user.phone}`);
        });
    },
    
    findByName: function(name) {
        const foundUser = this.users.find(user => user.name.toLowerCase() === name.toLowerCase());
        if (foundUser) {
            console.log(`Znaleziono użytkownika: ${foundUser.name}, ${foundUser.age} lat, tel: ${foundUser.phone}`);
            return foundUser;
        } else {
            console.log(`Nie znaleziono użytkownika o imieniu: ${name}`);
            return false;
        }
    },
    
    findByPhone: function(phone) {
        const foundUser = this.users.find(user => user.phone === phone);
        if (foundUser) {
            console.log(`Znaleziono użytkownika: ${foundUser.name}, ${foundUser.age} lat, tel: ${foundUser.phone}`);
            return foundUser;
        } else {
            console.log(`Nie znaleziono użytkownika z numerem: ${phone}`);
            return false;
        }
    },
    
    getCount: function() {
        const count = this.users.length;
        console.log(`Liczba użytkowników w książce: ${count}`);
        return count;
    }
};

// Testowanie książki telefonicznej
phoneBook.addUser("Anna", 25, "123-456-789");
phoneBook.addUser("Piotr", 30, "987-654-321");
phoneBook.addUser("Katarzyna", 28, "555-123-456");
phoneBook.addUser("Jan", 35, "111-222-333");

phoneBook.showUsers();
phoneBook.getCount();
phoneBook.findByName("Anna");
phoneBook.findByName("Tomasz");
phoneBook.findByPhone("555-123-456");
phoneBook.findByPhone("000-000-000");

console.log("\n=== ZADANIE 6 ===");

const tableGenerator = {
    randomNumber: function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    
    generateIncTable: function(nr) {
        const table = [];
        for (let i = 0; i <= nr; i++) {
            table.push(i);
        }
        return table;
    },
    
    generateRandomTable: function(lng, min, max) {
        const table = [];
        for (let i = 0; i < lng; i++) {
            table.push(this.randomNumber(min, max));
        }
        return table;
    },
    
    generateTableFromText: function(str) {
        if (typeof str !== 'string') {
            return [];
        }
        return str.split(' ');
    },
    
    getMaxFromTable: function(arr) {
        if (arr.length === 0) return null;
        return Math.max(...arr);
    },
    
    getMinFromTable: function(arr) {
        if (arr.length === 0) return null;
        return Math.min(...arr);
    },
    
    delete: function(arr, index) {
        if (index >= 0 && index < arr.length) {
            arr.splice(index, 1);
        }
        return arr;
    }
};

// Testowanie tableGenerator
console.log("Losowa liczba (1-10):", tableGenerator.randomNumber(1, 10));

const incTable = tableGenerator.generateIncTable(5);
console.log("Tablica rosnąca (0-5):", incTable);

const randomTable = tableGenerator.generateRandomTable(8, 1, 100);
console.log("Tablica losowa (8 elementów, 1-100):", randomTable);

const textTable = tableGenerator.generateTableFromText("Ala ma kota a kot ma Alę");
console.log("Tablica ze słowami:", textTable);

console.log("Max z tablicy:", tableGenerator.getMaxFromTable(randomTable));
console.log("Min z tablicy:", tableGenerator.getMinFromTable(randomTable));

console.log("Tablica przed usunięciem:", incTable);
tableGenerator.delete(incTable, 2);
console.log("Tablica po usunięciu indeksu 2:", incTable);

console.log("\n=== ZADANIE 7 ===");

const text = {
    check: function(txt, word) {
        return txt.includes(word);
    },
    
    getCount: function(txt) {
        return txt.length;
    },
    
    getWordsCount: function(txt) {
        return txt.trim().split(/\s+/).length;
    },
    
    setCapitalize: function(txt) {
        return txt.split(' ').map(word => {
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        }).join(' ');
    },
    
    setMix: function(txt) {
        let result = '';
        for (let i = 0; i < txt.length; i++) {
            if (i % 2 === 0) {
                result += txt[i].toLowerCase();
            } else {
                result += txt[i].toUpperCase();
            }
        }
        return result;
    },
    
    generateRandom: function(lng) {
        const chars = 'abcdefghijklmnopqrstuvwxyz';
        let result = '';
        for (let i = 0; i < lng; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }
};

// Testowanie obiektu text
const testText = "ala ma kota";

console.log(`Czy "${testText}" zawiera "kota":`, text.check(testText, "kota"));
console.log(`Czy "${testText}" zawiera "psa":`, text.check(testText, "psa"));

console.log(`Liczba liter w "${testText}":`, text.getCount(testText));

console.log(`Liczba słów w "${testText}":`, text.getWordsCount(testText));

console.log(`Kapitalizacja "${testText}":`, text.setCapitalize(testText));

console.log(`Miksowanie "${testText}":`, text.setMix(testText));

console.log(`Losowy tekst (10 znaków):`, text.generateRandom(10));
console.log(`Losowy tekst (15 znaków):`, text.generateRandom(15));

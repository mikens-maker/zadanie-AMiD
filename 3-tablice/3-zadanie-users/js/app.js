// Zadanie 1: Wypisz imiona i nazwiska użytkowników oraz ich email
console.log("Zadanie 1:");
users.forEach(user => {
    console.log(`${user.name} -> ${user.email}`);
});

// Zadanie 2: Wypisz tablicę z wszystkimi użytkownikami pełnoletnimi
const adults = users.filter(user => user.age >= 18);
console.log("\nZadanie 2 - Pełnoletni użytkownicy:");
console.log(adults);

// Zadanie 3: Wypisz tablicę z wszystkimi kobietami
const women = users.filter(user => user.gender === "female");
console.log("\nZadanie 3 - Kobiety:");
console.log(women);

// Zadanie 4: Wypisz tablicę użytkowników którzy mają tag "dolor"
const withDolorTag = users.filter(user => user.tags.includes("dolor"));
console.log("\nZadanie 4 - Użytkownicy z tagiem 'dolor':");
console.log(withDolorTag);

// Zadanie 5: Wypisz true/false czy wszyscy użytkownicy są pełnoletni
const allAdults = users.every(user => user.age >= 18);
console.log("\nZadanie 5 - Czy wszyscy są pełnoletni?");
console.log(allAdults);

// Zadanie 6: Wypisz true/false czy chociaż jeden z użytkowników jest pełnoletni
const anyAdult = users.some(user => user.age >= 18);
console.log("\nZadanie 6 - Czy chociaż jeden jest pełnoletni?");
console.log(anyAdult);

// Zadanie 7: Wypisz nową tablicę zawierającą tylko imiona użytkowników pisane dużymi literami
const upperCaseNames = users.map(user => {
    // Pobierz tylko imię (pierwsze słowo z pola name)
    const firstName = user.name.split(' ')[0];
    return firstName.toUpperCase();
});
console.log("\nZadanie 7 - Imiona dużymi literami:");
console.log(upperCaseNames);

// Zadanie 8: Wypisz liczbę kobiet i mężczyzn oraz która grupa jest liczniejsza
const womenCount = users.filter(user => user.gender === "female").length;
const menCount = users.filter(user => user.gender === "male").length;

console.log("\nZadanie 8:");
console.log(`Liczba kobiet: ${womenCount}`);
console.log(`Liczba mężczyzn: ${menCount}`);

if (womenCount > menCount) {
    console.log("kobiety wygrywają");
} else if (menCount > womenCount) {
    console.log("mężczyźni wygrywają");
} else {
    console.log("remis");
}

// Dodatkowe: Statystyki dla ciekawskich
console.log("\n--- Podsumowanie ---");
console.log(`Wszystkich użytkowników: ${users.length}`);
console.log(`Pełnoletnich: ${adults.length}`);
console.log(`Niepełnoletnich: ${users.length - adults.length}`);
console.log(`Kobiet: ${womenCount}, Mężczyzn: ${menCount}`);
console.log(`Aktywnych użytkowników: ${users.filter(user => user.isActive).length}`);
console.log(`Najczęstszy owoc: ${mostCommonFruit()}`);

// Funkcja pomocnicza do znalezienia najczęstszego owocu
function mostCommonFruit() {
    const fruitCount = {};
    users.forEach(user => {
        fruitCount[user.favoriteFruit] = (fruitCount[user.favoriteFruit] || 0) + 1;
    });
    
    let mostCommon = '';
    let maxCount = 0;
    
    for (const fruit in fruitCount) {
        if (fruitCount[fruit] > maxCount) {
            maxCount = fruitCount[fruit];
            mostCommon = fruit;
        }
    }
    
    return mostCommon;
}
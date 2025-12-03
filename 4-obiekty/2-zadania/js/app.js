console.log("=== ZADANIE 1 ===");

// Tablica z danymi (oryginalna)
const users = [
    //id, name, surname, email, age, value
    [  1, "Shauna", "Bradnocke", "sbradnocke0@altervista.org", 20, 108.28] ,
    [  2, "Mela", "Redman", "mredman1@nps.gov", 24, 267.37] ,
    [  3, "Othelia", "Lemon", "olemon2@slashdot.org", 15, 748.06] ,
    [  4, "Meier", "Cockell", "mcockell3@icio.us", 32, 1951.64] ,
    [  5, "Shellysheldon", "Gronowe", "sgronowe4@cnbc.com", 16, 1040.54] ,
    [  6, "Francisca", "Tofanini", "ftofanini5@gnu.org", 21, 1544.08] ,
    [  7, "Cliff", "Underwood", "cunderwood6@addtoany.com", 10, 451.21] ,
    [  8, "Caron", "Falshaw", "cfalshaw7@hugedomains.com", 27, 1968.72] ,
    [  9, "Anitra", "Warters", "awarters8@intel.com", 12, 380.68] ,
    [ 10, "Caitrin", "Baudrey", "cbaudrey9@ihg.com", 13, 1385.44] ,
    [ 11, "Reginald", "Beavers", "rbeaversa@elegantthemes.com", 15, 1205.52] ,
    [ 12, "Marleen", "Aickin", "maickinb@purevolume.com", 20, 1434.10] ,
    [ 13, "Lisa", "MacSorley", "lmacsorleyc@ocn.ne.jp", 17, 1567.07] ,
    [ 14, "Kimberli", "Berkeley", "kberkeleyd@merriam-webster.com", 19, 1994.97] ,
    [ 15, "Tawnya", "Illingworth", "tillingworthe@quantcast.com", 23, 1742.64]
];

console.log("Dlaczego to zła forma danych?");
console.log("1. Brak nazw kluczy - musimy pamiętać kolejność danych");
console.log("2. Trudno odczytać, co reprezentuje każda wartość");
console.log("3. Podatne na błędy przy zmianie kolejności danych");
console.log("4. Niska czytelność kodu\n");

// Funkcja fixData() - naprawia dane użytkowników
function fixData(badDataArray) {
    return badDataArray.map(userArray => {
        // Destrukturyzacja tablicy
        const [id, name, surname, email, age, cash] = userArray;
        
        // Zwracanie obiektu z odpowiednimi kluczami
        return {
            id: id,
            name: name,
            surname: surname,
            email: email,
            age: age,
            cash: cash
        };
    });
}

// Wersja z krótszym zapisem (bardziej zwięzła)
function fixDataShort(badDataArray) {
    return badDataArray.map(([id, name, surname, email, age, cash]) => ({
        id, name, surname, email, age, cash
    }));
}

// Test funkcji fixData()
const fixedUsers = fixData(users);
console.log("Poprawione dane użytkowników:");
console.log(fixedUsers);
console.log("\nPierwszy użytkownik po naprawie:");
console.log(fixedUsers[0]);

// Dla porównania pokazujemy też wersję krótką
console.log("\nUżywając krótszej wersji funkcji:");
const fixedUsersShort = fixDataShort(users);
console.log("Liczba użytkowników:", fixedUsersShort.length);
console.log("Pierwszy użytkownik:", fixedUsersShort[0]);

console.log("\n=== ZADANIE 2 ===");

// Korzystamy z naprawionych danych
const goodUsers = fixedUsers;

// 1. Wylicz ile pieniędzy mają wszyscy użytkownicy razem
const totalCash = goodUsers.reduce((sum, user) => sum + user.cash, 0);
console.log(`1. Łączna ilość pieniędzy wszystkich użytkowników: ${totalCash.toFixed(2)} PLN`);

// 2. Wylicz średni wiek wszystkich użytkowników
const totalAge = goodUsers.reduce((sum, user) => sum + user.age, 0);
const averageAge = totalAge / goodUsers.length;
console.log(`2. Średni wiek wszystkich użytkowników: ${averageAge.toFixed(2)} lat`);

// 3. Stwórz nową tablicę tylko z mailami
const emailsArray = goodUsers.map(user => user.email);
console.log("3. Tablica z adresami email:");
console.log(emailsArray);

console.log("\n=== DODATKOWA ANALIZA ===");

// Dodatkowe statystyki
console.log("Dodatkowe statystyki:");

// Najmłodszy i najstarszy użytkownik
const youngestUser = goodUsers.reduce((min, user) => user.age < min.age ? user : min);
const oldestUser = goodUsers.reduce((max, user) => user.age > max.age ? user : max);
console.log(`Najmłodszy użytkownik: ${youngestUser.name} ${youngestUser.surname} (${youngestUser.age} lat)`);
console.log(`Najstarszy użytkownik: ${oldestUser.name} ${oldestUser.surname} (${oldestUser.age} lat)`);

// Najbogatszy i najbiedniejszy użytkownik
const richestUser = goodUsers.reduce((max, user) => user.cash > max.cash ? user : max);
const poorestUser = goodUsers.reduce((min, user) => user.cash < min.cash ? user : min);
console.log(`Najbogatszy użytkownik: ${richestUser.name} ${richestUser.surname} (${richestUser.cash.toFixed(2)} PLN)`);
console.log(`Najbiedniejszy użytkownik: ${poorestUser.name} ${poorestUser.surname} (${poorestUser.cash.toFixed(2)} PLN)`);

// Grupowanie użytkowników według wieku
console.log("\nPodział użytkowników według grupy wiekowej:");
const ageGroups = {
    "dzieci (0-12)": goodUsers.filter(user => user.age <= 12).length,
    "młodzież (13-17)": goodUsers.filter(user => user.age >= 13 && user.age <= 17).length,
    "dorośli (18-64)": goodUsers.filter(user => user.age >= 18 && user.age <= 64).length,
    "seniorzy (65+)": goodUsers.filter(user => user.age >= 65).length
};

for (const [group, count] of Object.entries(ageGroups)) {
    console.log(`${group}: ${count} użytkowników`);
}

// Przykład użycia destrukturyzacji przy wypisywaniu danych
console.log("\nPrzykład użycia destrukturyzacji:");
goodUsers.forEach(user => {
    const { id, name, surname, email, age, cash } = user;
    console.log(`Użytkownik ${id}: ${name} ${surname}, wiek: ${age}, gotówka: ${cash.toFixed(2)} PLN`);
});

console.log("\n=== PORÓWNANIE DANYCH PRZED I PO NAPRAWIE ===");
console.log("Przykład jednego użytkownika:");
console.log("PRZED (tablica):", users[0]);
console.log("PO (obiekt):", goodUsers[0]);
console.log("\nTeraz łatwiej odczytać dane!");
console.log("Zamiast users[0][2] (nazwisko) używamy goodUsers[0].surname");
console.log("Zamiast users[0][5] (gotówka) używamy goodUsers[0].cash");

// Dodatkowo: funkcja pomocnicza do formatowania kwot
console.log("\n=== FORMATOWANIE DANYCH ===");
function formatUserInfo(user) {
    const { name, surname, age, cash } = user;
    return `${name} ${surname} (${age} lat) - ${cash.toFixed(2)} PLN`;
}

console.log("Sformatowane informacje o użytkownikach:");
goodUsers.forEach(user => {
    console.log(formatUserInfo(user));
});
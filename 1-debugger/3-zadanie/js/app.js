// app.js - POPRAWIONY KOD
let sum = 0;

users.forEach(user => {
    sum += Number(user.payment); // KONWERSJA NA LICZBĘ
})

console.log(`Zarobki wszystkich użytkowników: ${sum}`);
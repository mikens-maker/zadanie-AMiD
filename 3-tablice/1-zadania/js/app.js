// Zadanie 1
const animals = ["kot", "pies", "chomik", "kanarek", "żółw", "królik"];

function showArray(arr) {
    let totalLetters = 0;
    
    console.log("Pętla for:");
    for (let i = 0; i < arr.length; i++) {
        const length = arr[i].length;
        console.log(`${arr[i]} - ${length} liter`);
        totalLetters += length;
    }
    
    console.log("\nPętla for of:");
    for (const animal of arr) {
        const length = animal.length;
        console.log(`${animal} - ${length} liter`);
    }
    
    console.log("\nMetoda forEach:");
    arr.forEach(animal => {
        const length = animal.length;
        console.log(`${animal} - ${length} liter`);
    });
    
    console.log(`\nSuma wszystkich liter: ${totalLetters}`);
}

showArray(animals);

// Zadanie 2
function checkPalindrom(txt) {
    const cleanText = txt.toLowerCase().replace(/\s/g, '');
    return cleanText === cleanText.split('').reverse().join('');
}

console.log("\nZadanie 2:");
console.log("kajak:", checkPalindrom("kajak"));
console.log("pies:", checkPalindrom("pies"));
console.log("Anna:", checkPalindrom("Anna"));

// Zadanie 3
const names = [
    "Marcin",
    "Ania",
    "Monika",
    "Piotr",
    "Beata",
    "ania",
    "marcin",
    "piotr",
    "PIOTR",
    "ANIA",
    "MONIKA"
];

function unifyNames(names) {
    return names.map(name => name.charAt(0).toUpperCase() + name.slice(1).toLowerCase());
}

function countDifferentNames(names) {
    const unified = unifyNames(names);
    const count = {};
    
    unified.forEach(name => {
        count[name] = (count[name] || 0) + 1;
    });
    
    return count;
}

console.log("\nZadanie 3:");
console.log("Zunifikowane imiona:", unifyNames(names));
console.log("Liczba wystąpień:", countDifferentNames(names));

// Zadanie 4
function random(max) {
    return Math.floor(Math.random() * (max + 1));
}

function generateAndProcessArray() {
    const arr = [];
    for (let i = 0; i < 20; i++) {
        arr.push(random(100));
    }
    
    arr.sort((a, b) => a - b);
    const sum = arr.reduce((acc, curr) => acc + curr, 0);
    const average = sum / arr.length;
    
    console.log("\nZadanie 4:");
    console.log("Tablica:", arr);
    console.log("Suma:", sum);
    console.log("Średnia:", average);
}

generateAndProcessArray();

// Zadanie 5
const tab = [
    "xloremipsumdolor",
    "kloremipsum",
    "aloremipsumdol",
    "blor",
    "cloremipsu",
    "gloremip",
];

tab.sort((a, b) => a.length - b.length);
const totalLetters = tab.reduce((sum, text) => sum + text.length, 0);

console.log("\nZadanie 5:");
console.log("Posortowana tablica:", tab);
console.log("Suma wszystkich liter:", totalLetters);

// Zadanie 6
const tabUsers = [
    {name: "Marcin", age: 14},
    {name: "Piotr", age: 18},
    {name: "Weronika", age: 20},
    {name: "Ania", age: 19},
    {name: "Agnieszka", age: 13},
    {name: "Magda", age: 30},
];

const adults = tabUsers.filter(user => user.age >= 18);

console.log("\nZadanie 6:");
if (adults.length === 0) {
    console.log("same małolaty");
} else {
    adults.sort((a, b) => a.name.localeCompare(b.name));
    console.log("Pełnoletni użytkownicy:", adults);
}

// Zadanie 7
function generateArray() {
    const arr = [];
    for (let i = 65; i <= 90; i++) {
        arr.push(String.fromCharCode(i));
    }
    return arr;
}

function splitArray(tab, nr) {
    const result = [];
    for (let i = 0; i < tab.length; i += nr) {
        result.push(tab.slice(i, i + nr));
    }
    return result;
}

const alphabet = generateArray();
const splitAlphabet = splitArray(alphabet, 6);

console.log("\nZadanie 7:");
console.log("Alfabet:", alphabet);
console.log("Podzielony alfabet:", splitAlphabet);

// Zadanie 8
const arr = [
    [66, 97, 114, 100, 4, 2, 110, 11, 1, 6, 20],
    [99, 3, 10, 122, 76, 101, 111, 3, 32, 100, 0],
    [6, 22, 1, 111, 32, 10, 110, 7, 97, 97, 67],
    [60, 97, 116, 32, 100, 23, 97, 114, 100, 32, 34],
    [2, 106, 15, 6, 111, 56, 80, 20, 10, 86, 10],
    [20, 110, 121, 32, 107, 55, 50, 99, 110, 105, 8],
    [12, 9, 22, 102, 66, 100, 12, 105, 50, 76, 110],
    [42, 81, 123, 92, 26, 98, 20, 1, 20, 11, 10]
];

const str = "rrrdddllddrrruuuurrddrruurddddlld";

function decodeMessage(grid, directions) {
    let x = 0, y = 0;
    let message = String.fromCharCode(grid[y][x]);
    
    for (const dir of directions) {
        switch (dir) {
            case 'r': x++; break;
            case 'l': x--; break;
            case 'd': y++; break;
            case 'u': y--; break;
        }
        message += String.fromCharCode(grid[y][x]);
    }
    
    return message;
}

console.log("\nZadanie 8:");
console.log("Zdekodowana wiadomość:", decodeMessage(arr, str));
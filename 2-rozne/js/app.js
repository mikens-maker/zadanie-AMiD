// Zadanie 1
function countWord(txt) {
    if (!txt || txt.trim() === '') {
        return 'nie mam co liczyć';
    }
    const words = txt.trim().split(/\s+/);
    return `Tekst "${txt}" składa się z ${words.length} wyrazów`;
}

const userText = prompt("Wpisz tekst:");
console.log(countWord(userText));

// Zadanie 2
function fixName(name) {
    if (!name) return 'nic nie wpisano';
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
}

const userName = prompt("Wpisz imię:");
const fixedName = fixName(userName);
if (fixedName !== 'nic nie wpisano') {
    console.log(`Imię ${fixedName} rozpoczyna się od litery ${fixedName.charAt(0)}`);
} else {
    console.log(fixedName);
}

// Zadanie 3
function fileInfo(file) {
    const parts = file.split('.');
    if (parts.length !== 2 || parts[0] === '' || parts[1] === '') {
        return false;
    }
    return {
        name: parts[0],
        extension: parts[1]
    };
}

console.log(fileInfo("document.pdf"));
console.log(fileInfo(".jpg"));

// Zadanie 4
function generateID() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 20; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

console.log(generateID());

// Zadanie 5
function printNumbers(nr) {
    let result = '';
    for (let i = 1; i <= nr; i++) {
        result += i;
    }
    return result;
}

console.log(printNumbers(12));

// Zadanie 6
function seasonalActivity(name, month) {
    const normalizedMonth = month.toLowerCase();
    
    if (['grudzien', 'styczen', 'luty'].includes(normalizedMonth)) {
        return `${name} jezdzi na sankach`;
    } else if (['marzec', 'kwiecien', 'maj'].includes(normalizedMonth)) {
        return `${name} chodzi po kaluzach`;
    } else if (['czerwiec', 'lipiec', 'sierpien'].includes(normalizedMonth)) {
        return `${name} sie opala`;
    } else if (['wrzesien', 'pazdziernik', 'listopad'].includes(normalizedMonth)) {
        return `${name} zbiera liscie`;
    } else {
        return `${name} uczy się JS`;
    }
}

console.log(seasonalActivity("Ala", "Styczen"));

// Zadanie 7
function generateRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

let countAbove10 = 0;
for (let i = 0; i < 10; i++) {
    const randomNum = generateRandom(1, 20);
    if (randomNum > 10) {
        countAbove10++;
    }
}

console.log(countAbove10 >= 5 ? 'udało się' : 'niestety nie');

// Zadanie 8
function generateRandomTable(min, max, count) {
    const result = [];
    for (let i = 0; i < count; i++) {
        result.push(generateRandom(min, max));
    }
    return result;
}

const randomTable = generateRandomTable(10, 100000, 10);
randomTable.forEach(num => {
    console.log(num.toString().padStart(10, ' '));
});

// Zadanie 9
function sortNames(text, separator) {
    const names = text.split(separator);
    names.sort();
    return names.join(separator);
}

const str = "Ania|Marcin|Bartek|Piotr|Kuba|Beata|Agnieszka";
console.log(sortNames(str, '|'));

// Zadanie 10
function printBorderText(txt, max = 20) {
    let displayText = txt;
    if (txt.length > max) {
        displayText = txt.slice(0, max - 3) + '...';
    }
    
    const borderLength = displayText.length + 4;
    const topBorder = '╔' + '═'.repeat(borderLength) + '╗';
    const middle = `║  ${displayText}  ║`;
    const bottomBorder = '╚' + '═'.repeat(borderLength) + '╝';
    
    console.log(topBorder);
    console.log(middle);
    console.log(bottomBorder);
}

printBorderText("To jest jakiś tekst");

// Zadanie 11
const min = 1;
const max = 1000;
const userNumber = Number(prompt(`Podaj liczbę od ${min} do ${max}:`));

if (isNaN(userNumber) || userNumber < min || userNumber > max) {
    console.log('podana wartość jest błędna');
} else {
    let attempts = 0;
    let randomNum;
    
    while (true) {
        attempts++;
        randomNum = generateRandom(min, max);
        if (randomNum === userNumber) {
            break;
        }
    }
    
    console.log(`Znaleziono liczbę po ${attempts} próbach`);
}

// Zadanie 12
function checkFemale(name) {
    return name.toLowerCase().endsWith('a');
}

function countWomanInTable(arr) {
    let count = 0;
    arr.forEach(user => {
        const firstName = user.split(' ')[0];
        if (checkFemale(firstName)) {
            count++;
        }
    });
    return count;
}

const users = [
    "Ania Nowak",
    "Piotr Kowalski",
    "Bartek Kosecki",
    "Natalia Nowak",
    "Weronika Piotrowska",
    "Agata Karolak",
    "Tomasz Nowak",
    "Mateusz Kowalski",
    "Marcin Kotecki",
    "Beata Lecka",
    "Katarzyna Małecka"
];

console.log(`Liczba kobiet: ${countWomanInTable(users)}`);

// Zadanie 13
function monthName(nr) {
    const months = [
        'styczeń', 'luty', 'marzec', 'kwiecień', 'maj', 'czerwiec',
        'lipiec', 'sierpień', 'wrzesień', 'październik', 'listopad', 'grudzień'
    ];
    
    if (typeof nr !== 'number' || nr < 1 || nr > 12) {
        return false;
    }
    
    return months[nr - 1];
}

console.log(monthName(10));

// Zadanie 14
function checkPalindrom(txt) {
    const cleanText = txt.toLowerCase().replace(/\s/g, '');
    return cleanText === cleanText.split('').reverse().join('');
}

console.log(checkPalindrom('kajak'));
console.log(checkPalindrom('pies'));

// Zadanie 15
function mix(txt) {
    let result = '';
    for (let i = 0; i < txt.length; i++) {
        if (i % 2 === 0) {
            result += txt[i].toUpperCase();
        } else {
            result += txt[i].toLowerCase();
        }
    }
    return result;
}

function smallNames(arr) {
    return arr.map(name => name.toLowerCase());
}

function bigNames(arr) {
    return arr.map(name => name.toUpperCase());
}

function mixNames(arr) {
    return arr.map(name => mix(name));
}

const namesArray = ["Ania", "Marcin", "Bartek", "Piotr"];
console.log(smallNames(namesArray));
console.log(bigNames(namesArray));
console.log(mixNames(namesArray));

// Zadanie 16
function arraySummary(arr) {
    const summary = { sum: 0 };
    
    arr.forEach(num => {
        summary.sum += num;
        summary[num] = (summary[num] || 0) + 1;
    });
    
    return summary;
}

const tab = [1,3,5,7,3,5,5,1,7,8,4,3,4,2,2,1];
console.log(arraySummary(tab));

// Zadanie 17
const log = (function() {
    let counter = 1;
    return function(txt) {
        console.log(`${counter}. ${txt}`);
        counter++;
    };
})();

log("To jest przykładowy tekst");
log("Kolejny tekst");
log("Trzeci tekst");
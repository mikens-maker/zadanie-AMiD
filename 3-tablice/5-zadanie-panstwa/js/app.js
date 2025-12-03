// Zadanie 1
console.log("Zadanie 1:");
const nazwyPanstw = countries.map(country => country.name);
console.log("Nazwy państw:", nazwyPanstw);

const sumaLudnosci = countries.reduce((sum, country) => sum + country.population, 0);
console.log("Suma ludności wszystkich państw:", sumaLudnosci.toLocaleString());

// Zadanie 2
console.log("\nZadanie 2:");
const sredniaLudnosc = sumaLudnosci / countries.length;
console.log("Średnia ludność w państwach:", Math.round(sredniaLudnosc).toLocaleString());

// Zadanie 3
console.log("\nZadanie 3:");
const dodatniWzrost = countries.filter(country => country.grow > 0).length;
console.log("Państwa z dodatnim wzrostem:", dodatniWzrost);

// Zadanie 4
console.log("\nZadanie 4:");
const ujemnyWzrost = countries.filter(country => country.grow < 0).length;
console.log("Państwa z ujemnym wzrostem:", ujemnyWzrost);

// Zadanie 5
console.log("\nZadanie 5:");
const sumaPowierzchni = countries.reduce((sum, country) => sum + country.world_area_in_percent, 0);
console.log("Procent powierzchni Ziemi zajmowany przez wszystkie państwa:", sumaPowierzchni.toFixed(2) + "%");

// Zadanie 6
console.log("\nZadanie 6:");
const krajeZFertility = countries.filter(country => country.fertility_rate !== null);
const sumaFertility = krajeZFertility.reduce((sum, country) => sum + country.fertility_rate, 0);
const sredniaFertility = sumaFertility / krajeZFertility.length;
console.log("Średnia dzietność na świecie:", sredniaFertility.toFixed(2));

// Zadanie 7
console.log("\nZadanie 7:");
const krajeZWiekiem = countries.filter(country => country.medium_age !== null);
const sumaWieku = krajeZWiekiem.reduce((sum, country) => sum + country.medium_age, 0);
const sredniWiek = sumaWieku / krajeZWiekiem.length;
console.log("Średni wiek na świecie:", sredniWiek.toFixed(1) + " lat");

// Zadanie 8
console.log("\nZadanie 8:");
const polska = countries.find(country => country.name === "Poland");
console.log("Dane Polski:", polska);

// Zadanie 9
console.log("\nZadanie 9:");
if (polska.medium_age !== null) {
    const wiekPolska = polska.medium_age;
    console.log("Średni wiek w Polsce:", wiekPolska + " lat");
    console.log("Średni wiek na świecie:", sredniWiek.toFixed(1) + " lat");
    console.log("Czy średni wiek w Polsce jest większy od średniej światowej?", wiekPolska > sredniWiek);
} else {
    console.log("Brak danych o średnim wieku dla Polski");
}

// Dodatkowe: wypisanie wyników w czytelnej formie
console.log("\n\nPODSUMOWANIE:");
console.log("1. Ilość państw:", countries.length);
console.log("2. Suma ludności:", sumaLudnosci.toLocaleString());
console.log("3. Średnia ludność:", Math.round(sredniaLudnosc).toLocaleString());
console.log("4. Państwa z dodatnim wzrostem:", dodatniWzrost);
console.log("5. Państwa z ujemnym wzrostem:", ujemnyWzrost);
console.log("6. Procent powierzchni Ziemi:", sumaPowierzchni.toFixed(2) + "%");
console.log("7. Średnia dzietność:", sredniaFertility.toFixed(2));
console.log("8. Średni wiek:", sredniWiek.toFixed(1) + " lat");